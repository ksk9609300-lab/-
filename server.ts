import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import mammoth from "mammoth";

dotenv.config();

const app = express();
const PORT = 3000;

// JSON parsing with a higher limit for large CVs/Job descriptions
app.use(express.json({ limit: "10mb" }));

// Helper to sanitize/mask credentials in text just in case (Security layer 1)
function maskTextLocal(text: string): string {
  if (!text) return "";
  let masked = text;
  // Mask phone numbers: e.g. 010-1234-5678 or 010 1234 5678 -> 010-****-5678
  masked = masked.replace(/01[016789][-.\s]?([0-9]{3,4})[-.\s]?([0-9]{4})/g, (match, p1, p2) => {
    return `010-****-${p2}`;
  });
  // Mask email addresses: e.g. ksk9609300@gmail.com -> ksk***@gmail.com
  masked = masked.replace(/([a-zA-Z0-9_\-\.\+]{3})([a-zA-Z0-9_\-\.\+]+)@([a-zA-Z0-9\-\.]+)/g, (match, p1, p2, p3) => {
    return `${p1}***@${p3}`;
  });
  // Mask resident registration numbers: e.g. 960930-1234567 -> 960930-*******
  masked = masked.replace(/[0-9]{2}[01][0-9][0-3][0-9]-[1-4][0-9]{6}/g, (match) => {
    return `${match.split('-')[0]}-*******`;
  });
  return masked;
}

// Helper to translate Gemini error messages to warm, highly readable Korean
function translateGeminiError(error: any): string {
  console.error("Original Gemini error details:", error);
  const errMsg = error?.message || String(error || "");
  
  // Check for invalid API key
  if (
    errMsg.includes("API_KEY_INVALID") || 
    errMsg.includes("not valid") || 
    errMsg.includes("invalid API key") ||
    errMsg.includes("API key") && (errMsg.includes("invalid") || errMsg.includes("expired") || errMsg.includes("wrong")) ||
    errMsg.includes("key") && errMsg.includes("invalid")
  ) {
    return "입력하신 Gemini API 승인키가 올바르지 않거나 승인 검증에 실패했습니다. [🏠 서비스 소개] 탭에서 구글 AI Studio에서 정식 발급받으신 유효한 API Key를 다시 한 번 정확하게 입력하고 활성화 처리를 완료해 주십시오.";
  }
  
  // Check for quota/rate limit error
  if (
    errMsg.includes("quota") || 
    errMsg.includes("RESOURCE_EXHAUSTED") || 
    errMsg.includes("429") || 
    errMsg.includes("Too Many Requests")
  ) {
    return "Gemini API 한도(Quota)가 제한되었거나 단시간에 너무 빈번하게 호출 단추를 클릭하셨습니다. (Error 429 Too Many Requests) 약 1분 정도 휴식을 취하신 후 다시 실행 단추를 눌러 주시기 바랍니다.";
  }
  
  // Check for 503 Service Unavailable / Model High Demand
  if (
    errMsg.includes("503") || 
    errMsg.includes("UNAVAILABLE") || 
    errMsg.includes("high demand") || 
    errMsg.includes("temporary") || 
    errMsg.includes("Spikes in demand")
  ) {
    return "현재 구글 실시간 Gemini AI 모델의 서버 트래픽이 크게 폭증해 일시적 점검 상태(503 Service Unavailable)에 들어갔습니다. 보통 수 초~수십 초 이내에 자동으로 해제되므로, [분석 시작하기] 단추를 다시 한 번 클릭하여 조언 생성을 재시도해 보시기 바랍니다.";
  }

  // Fallback with user-friendly text
  return `Gemini 엔진 분석 과정 중 다음 특이 사항이 확인되었습니다: ${errMsg}. 입력 주신 파일이나 서류 원문의 분량을 조금 고르신 후 다시 시도해 주시기 바랍니다.`;
}

// REST route to extract text from files (PDFs, Images, Word, TXT)
app.post("/api/extract", async (req, res) => {
  try {
    const apiKeyRaw = req.body.apiKey || req.headers["x-gemini-key"];
    const apiKey = typeof apiKeyRaw === "string" ? apiKeyRaw.trim() : "";
    
    if (!apiKey) {
      return res.status(400).json({ 
        error: "파일에서 텍스트를 추출하려면 유효한 Gemini API 키 정보가 필요합니다. 서비스 소개 화면에서 먼저 본인의 API 키를 등록해 주세요."
      });
    }

    const { fileData, mimeType, fileName } = req.body;
    if (!fileData) {
      return res.status(400).json({ error: "파일 데이터가 누락되었습니다." });
    }

    // 1. Text plain file
    if (mimeType === "text/plain" || fileName?.toLowerCase().endsWith(".txt")) {
      const text = Buffer.from(fileData, 'base64').toString('utf-8');
      return res.json({ text: maskTextLocal(text) });
    }

    // 2. Word (.docx) file
    if (mimeType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || 
        mimeType === "application/msword" || 
        fileName?.toLowerCase().endsWith(".docx")) {
      try {
        const buffer = Buffer.from(fileData, 'base64');
        const result = await mammoth.extractRawText({ buffer });
        return res.json({ text: maskTextLocal(result.value) });
      } catch (err: any) {
        console.error("Mammoth DOCX parsing failed, falling back to Gemini:", err);
      }
    }

    // 3. Fallback for PDF, Images, or DOCX fallback using Gemini
    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    let extractMimeType = mimeType || "application/pdf";
    if (fileName?.toLowerCase().endsWith(".pdf")) {
      extractMimeType = "application/pdf";
    } else if (fileName?.toLowerCase().endsWith(".png")) {
      extractMimeType = "image/png";
    } else if (fileName?.toLowerCase().endsWith(".jpg") || fileName?.toLowerCase().endsWith(".jpeg")) {
      extractMimeType = "image/jpeg";
    } else if (fileName?.toLowerCase().endsWith(".webp")) {
      extractMimeType = "image/webp";
    } else if (fileName?.toLowerCase().endsWith(".gif")) {
      extractMimeType = "image/gif";
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            data: fileData,
            mimeType: extractMimeType,
          }
        },
        "다음 문서나 이미지 파일에서 읽을 수 있는 모든 한국어/영어/기타 텍스트를 정밀하게 추출해주십시오. 누락되는 정보 없이 전체 내용을 줄글이나 원래 양식에 맞추어 완전하게 복구해 주셔야 하며, '요약'이나 '해설' 또는 부가적인 문구는 단 한 단어도 포함하지 마십시오. 오직 원문에 존재하는 본래의 텍스트만 그대로 반환하십시오."
      ]
    });

    const parsedText = response.text || "";
    if (!parsedText.trim()) {
      throw new Error("파일로부터 텍스트를 추출할 수 없거나 추출 결과가 비어 있습니다.");
    }

    return res.json({ text: maskTextLocal(parsedText) });

  } catch (error: any) {
    console.error("Text extraction failed:", error);
    return res.status(500).json({
      error: translateGeminiError(error)
    });
  }
});

// REST route to validate a custom Gemini API key
app.post("/api/validate-key", async (req, res) => {
  try {
    const { apiKey } = req.body;
    if (!apiKey || !apiKey.trim()) {
      return res.status(400).json({ valid: false, error: "API 키를 입력해 주세요." });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey.trim(),
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    // Try a simple, ultra-fast test prompt
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "API key verification check. Please respond with exactly the single word: VALID",
      config: {
        maxOutputTokens: 5,
      },
    });

    if (response && response.text) {
      return res.json({ valid: true, message: "인증 체크가 성공적으로 끝났습니다!" });
    } else {
      return res.status(400).json({ valid: false, error: "서버로부터 응답을 수신하지 못했습니다." });
    }
  } catch (error: any) {
    console.error("API Key verification failed:", error);
    return res.status(400).json({ valid: false, error: translateGeminiError(error) });
  }
});

app.post("/api/analyze", async (req, res) => {
  try {
    const apiKeyRaw = req.body.apiKey || req.headers["x-gemini-key"];
    const apiKey = typeof apiKeyRaw === "string" ? apiKeyRaw.trim() : "";
    
    if (!apiKey) {
      console.error("Missing Gemini API Key for requested call");
      return res.status(400).json({ 
        error: "사용할 수 있는 유효한 Gemini API 키 정보가 없습니다. 서비스 소개 화면에서 본인의 API 키를 등록하거나 환경을 점검해 주세요."
      });
    }

    const { jobPosting, cv, candidateCv, introduction, selfIntro } = req.body;
    const finalCv = cv || candidateCv || "";
    const finalIntro = introduction || selfIntro || "";

    // Mask private info first using maskTextLocal
    const sanitizedJobPosting = maskTextLocal(jobPosting || "");
    const sanitizedCv = maskTextLocal(finalCv);
    const sanitizedIntro = maskTextLocal(finalIntro);

    const systemInstruction = `당신은 대한민국 국민취업지원제도 소속 고용서비스 전문 상담사이자, 기업과 구직자를 긴밀하게 이어주는 테크니컬 유능한 커리어 컨설턴트입니다.
제공된 데이터만을 철저히 근거로 분석하며, 데이터에 절대 없는 내용은 임의로 상상하거나 꾸며서 추론하지 않습니다.

[보안 & 개인정보 최우선 처리 규칙]:
절대 다음 항목은 원문을 노출해서는 안 됩니다. 출력 시 반드시 안전하게 마스킹하거나 치환해 보고해 주십시오.
1. 주민등록번호, 외국인등록번호, 여권번호 등 정부 식별번호 -> "******"로 완벽 처리
2. 상세 주소 -> "서울시 강남구", "부산시 해운대구" 같이 시/구 단위까지만 남겨두고 나머지는 지우거나 마스킹
3. 전화번호 -> "010-****-xxxx"(마지막 4자리만 표시) 형태로 반드시 치환
4. 이메일주소 -> "abc***@domain.com" 형태로 앞 3자리 글자만 노출하고 마스킹 고정
5. 생년월일 -> 태어난 연도(예: 1996년생)만 남기고 세부 날짜 마스킹
6. 군대 병역 상세, 구체적 가족관계, 종교, 결혼 여부 등 민감 정보는 원문에 있어서 필요할 경우 대략적인 언급만 하거나 가리고, 마스킹하여 상담 대상자의 익명성을 절대 보전해야 합니다.
- 만약 해당 개인정보 정보가 원문에 아예 존재하지 않는 항목이면: 출력 결과에서 지어내지 않고 자연스럽게 생략하십시오.
- 만약 원문에 존재는 하지만 구체적 식별이 까다롭거나 애매한 정보라면 안전하게 마스킹 범위를 넓히십시오.

[수행 지침 프로세스]:

1단계: 구인공고 분석 (총 300자 이내)
  - 공고 핵심 내용에서 하드 스킬(기술 스택, 전문 도구 등) 최대 5개 추출
  - 핵심 소프트 스킬(커뮤니케이션 스타일, 협업 능력 등) 최대 5개 추출
  - 회사에서 선호하는 인재상 키워드(기업 문화, 지향하는 태도 인성 등) 최대 3개 추출
  - 공고 전체의 핵심 내용을 명료하게 한국어 요약(용어는 미취업 청년이나 초보 상담사도 이해하기 쉽게 풀어씀)

2단계: 구직자 분석 (총 300자 이내)
  - 구직자 서류의 강점 3개와 보완점 2개를 추출하십시오.
  - 강점과 보완점 모두 공장/공고의 핵심 키워드와 "1:1 대응하여 매칭되는 구체적인 원문 근거"를 포함해야 합니다.

3단계: 적합도 점수 평가 및 배점 조정 (총합 100점 만점)
  - 아래 5개 역량평가 영역으로 나누어 점수를 부여하십시오:
    1) 직무경험 (0 ~ 20점)
    2) 기술스킬 (0 ~ 20점)
    3) 조직적합성 (0 ~ 20점)
    4) 커뮤니케이션 (0 ~ 20점)
    5) 성장가능성 (0 ~ 20점)
  - 규칙 A: 각 점수마다 1줄의 구체적인 이유 서술이 '필수'입니다. 이 근거 문장은 반드시 [구직자 서류 원문]의 실제 문구·경력·사례·구절을 직접 인용하거나 비슷하게 패러프레이징한 내용이어야만 합니다.
  - 규칙 B: 추상적인 설명("경험이 풍부해서 높은 점수입니다", "그냥 잘 어울립니다")은 무효입니다. 만약 원문 근거가 결여되어 점수를 책정할 수 없다면, 근거 항목에 명확히 "[근거 불충분]"이라고 기록하고 점수를 낮추십시오.
  - 규칙 C (가중치 배점 조정): 만약 구인 공고의 중요 가치관이나 핵심 요건이 특정 영역(예: 실무 기술 스킬)에 뚜렷이 집중되어 있다면, 기본 5개 역량 축의 가중치를 조절(총합 100점은 그대로 고정)할 수 있습니다. 가중치를 조절했을 때는 '가중치를 변경한 합당한 이유'를 1줄 명시하십시오. 만약 조절의 뚜렷한 이유가 없다면 기본값(각 영역당 20점 고정)을 사용하십시오.

4단계: 1분 자기소개 피드백
  - 제출된 기존 1분 자기소개(또는 "없음")에 대해 조언해 주십시오.
  - 다음 세 가지 요소를 도출하십시오:
    - 첫마디에 핵심 결론을 내세웠는지 여부 (두괄식 여부:true/false)
    - 직무 연계성 수준 (상/중/하)
    - 개선 제안점 총평 및 친절하게 구어로 소리내어 말하기 편한 "개선용 스크립트 작성" (200자 이내, ~요, ~습니다 의 친체적인 입말 어조)

5단계: 면접 대비 질문 설계
  - 면접관의 의도를 고려하여 맞춤형 면접 예상 질문을 총 5개 설계하십시오.
    - 질문 1~3: 구직자 서류와 공고 간의 빈자리나 부족한 부분(경험/스킬 갭, Gap)에 대한 보완점 해명 질문 3가지
    - 질문 4: 본 채용 전형 및 직무에 지원하게 된 솔직하고 설득력 있는 '입사지원 동기' 질문 1가지
    - 질문 5: 입사 후 본인의 역량을 어떻게 기여하고 성장할 것인지에 대한 구체적인 '입사 후 포부 및 기여안' 질문 1가지
  - 각 예상 질문별로 어떤 유형/구체적 항목에 해당하는지 명확하고 구체적인 '분류 키워드(category)'를 출력 객체에 채워 주십시오.
    - **매우 중요 (질문 1~3 필수 규칙)**: 질문 1~3은 마스킹되거나 범용화된 설명만 쓰는 대신, 구체적으로 어떤 부족한 부분이나 역량을 보완/해명해야 하는 질문인지 상세 지적 대상 명칭(예: 'TypeScript 실무 공백 보완', 'Vite 빌드 성능 개선 이력 부재', '자동화 테스트 환경 경험 미흡', 'React 상태 관리 설계 역량 보완' 등 구직자 프로필에서 도출된 개별적 질문 성격)을 한글 15자 이내로 명확하게 작성하여 category에 기록하십시오. 단순히 '보완점/갭 해명'이라는 넓고 뻔한 단어를 질문 1~3에 절대 사용하지 마십시오. category를 보고 이 질문이 '무슨 기술공백/경험갭'에 관한 질문인지 구직자가 단번에 알아볼 수 있어야 합니다.
    - 질문 4의 category는 반드시 '입사지원 동기'로 지정하고, 질문 5의 category는 반드시 '입사 후 포부 및 기여안'으로 지정하십시오.
  - 각 질문에 대해, 상담사가 안내할 수 있도록 구체적인 'STAR 답변 공식 도움말'(S:상황, T:당면 과제, A:본인의 행동, R:성과 결과) 형태의 가이드라인을 2줄 이내로 매우 직관적으로 첨부하십시오.
  - 또한 각 질문에 매치되는 구직자의 맞춤형 '추천 모범 답변 예시 스크립트(sampleAnswer)'를 200~250자 내외의 자연스러운 경어 표식(~요, ~습니다) 구어체 문맥으로 직접 창작하여 기재하십시오. (서류에 기록된 실제 프로젝트나 장점이 반영되어야 합니다.)

모든 안내 용어를 취업 준비생이나 초보 구직자가 이해하기 쉬운 친화적이고 부드러운 단어로 풀어서 설명하십시오.`;

    const userPrompt = `
[구인공고 원문]:
${sanitizedJobPosting}

[구직자 서류 원문]:
${sanitizedCv}

[기존 1분 자기소개]:
${sanitizedIntro}
`;

    const ai = new GoogleGenAI({
      apiKey: apiKey.trim(),
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    // Call Gemini with Structured JSON Schema
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            jobPostingAnalysis: {
              type: Type.OBJECT,
              properties: {
                hardSkills: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "핵심 하드 스킬(전문 기술 역량) 최대 5개"
                },
                softSkills: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "핵심 소프트 스킬(소통 및 태도 역량) 최대 5개"
                },
                cultureKeywords: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "회사 인재상 키워드(기업 문화 어울림) 최대 3개"
                },
                summary: { 
                  type: Type.STRING, 
                  description: "공고 분석 핵심 요약 (300자 이내)" 
                }
              },
              required: ["hardSkills", "softSkills", "cultureKeywords", "summary"]
            },
            candidateAnalysis: {
              type: Type.OBJECT,
              properties: {
                strengths: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING, description: "강점 제목" },
                      description: { type: Type.STRING, description: "강점 상세 설명" },
                      mappingEvidence: { type: Type.STRING, description: "[구직자 서류 원문]에서 직접 1:1 대응하여 매칭되는 구체적인 원문 인용" }
                    },
                    required: ["title", "description", "mappingEvidence"]
                  },
                  description: "합격에 매우 유리한 구직자의 주요 강점 3가지"
                },
                gaps: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING, description: "보완이 필요한 부족 항목 제목" },
                      description: { type: Type.STRING, description: "공고 대비 부족한 갭 및 보완 상세 일체" },
                      mappingEvidence: { type: Type.STRING, description: "[구직자 서류 원문] 또는 직무/채용 전략 관점에서의 대응 근거 및 조언" }
                    },
                    required: ["title", "description", "mappingEvidence"]
                  },
                  description: "인터뷰 전에 면밀히 보완할 공백 2가지"
                },
                summary: {
                  type: Type.STRING,
                  description: "상담사 총평 피드백(300자 이내)"
                }
              },
              required: ["strengths", "gaps", "summary"]
            },
            scoring: {
              type: Type.OBJECT,
              properties: {
                isWeightAdjusted: { 
                  type: Type.BOOLEAN, 
                  description: "공고 중요도에 따라 5대 축 점수 가중치 배점을 조정했는지 여부" 
                },
                weightAdjustReason: { 
                  type: Type.STRING, 
                  description: "가중치를 변경한 구체적인 1줄 사유 (조정하지 않은 경우 빈 문자열)" 
                },
                weights: {
                  type: Type.OBJECT,
                  properties: {
                    experience: { type: Type.INTEGER, description: "직무경험 가중치 (합계 100 고정)" },
                    techSkill: { type: Type.INTEGER, description: "기술스킬 가중치 (합계 100 고정)" },
                    orgFit: { type: Type.INTEGER, description: "조직적합성 가중치 (합계 100 고정)" },
                    communication: { type: Type.INTEGER, description: "커뮤니케이션 가중치 (합계 100 고정)" },
                    growth: { type: Type.INTEGER, description: "성장가능성 가중치 (합계 100 고정)" }
                  },
                  required: ["experience", "techSkill", "orgFit", "communication", "growth"]
                },
                scores: {
                  type: Type.OBJECT,
                  properties: {
                    experience: { type: Type.INTEGER, description: "직무경험 획득 점수 (가중치 만점 기준 중 취득 점수)" },
                    techSkill: { type: Type.INTEGER, description: "기술스킬 획득 점수" },
                    orgFit: { type: Type.INTEGER, description: "조직적합성 획득 점수" },
                    communication: { type: Type.INTEGER, description: "커뮤니케이션 획득 점수" },
                    growth: { type: Type.INTEGER, description: "성장가능성 획득 점수" }
                  },
                  required: ["experience", "techSkill", "orgFit", "communication", "growth"]
                },
                evidence: {
                  type: Type.OBJECT,
                  properties: {
                    experience: { type: Type.STRING, description: "직무경험 점수의 실제 서류 근거 인용 1줄" },
                    techSkill: { type: Type.STRING, description: "기술스킬 점수의 실제 서류 근거 인용 1줄" },
                    orgFit: { type: Type.STRING, description: "조직적합성 점수의 실제 서류 근거 인용 1줄" },
                    communication: { type: Type.STRING, description: "커뮤니케이션 점수의 실제 서류 근거 인용 1줄" },
                    growth: { type: Type.STRING, description: "성장가능성 점수의 실제 서류 근거 인용 1줄" }
                  },
                  required: ["experience", "techSkill", "orgFit", "communication", "growth"]
                },
                totalScore: { 
                  type: Type.INTEGER, 
                  description: "가중치가 반영된 최종 종합 적합도 맞춤 점수 (최대 100점)" 
                }
              },
              required: ["isWeightAdjusted", "weightAdjustReason", "weights", "scores", "evidence", "totalScore"]
            },
            selfIntroFeedback: {
              type: Type.OBJECT,
              properties: {
                hasLeadStatement: { 
                  type: Type.BOOLEAN, 
                  description: "결론을 맨 앞에 배치해 첫인상을 잡았는가? (두괄식 여부)" 
                },
                relevance: { 
                  type: Type.STRING, 
                  description: "직무 공고내용과의 접점 강도 (상, 중, 하 중 1개 선택)" 
                },
                critique: { 
                  type: Type.STRING, 
                  description: "자기소개 장단점 및 고칠 점 요약" 
                },
                improvedScript: { 
                  type: Type.STRING, 
                  description: "면접용 1분 입말체 말하기 제안 대본 스크립트 (200자 이내, 구어체)" 
                }
              },
              required: ["hasLeadStatement", "relevance", "critique", "improvedScript"]
            },
            interviewQuestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING, description: "맞춤형 면접 예상 질문" },
                  category: { type: Type.STRING, description: "질문 분류 항목 (구직자 갭 관련 구체적 15자 이내 명칭 또는 '입사지원 동기', '입사 후 포부 및 기여안' 등)" },
                  starGuide: { type: Type.STRING, description: "STAR 단계별 구조화된 요령식 가이드 (2줄 이내)" },
                  sampleAnswer: { type: Type.STRING, description: "해당 질문에 실전 대비용으로 대답할 수 있는 고품격 모범 답변 스크립트 샘플 (200~250자 이내, ~습니다 스타일의 구어체)" }
                },
                required: ["question", "category", "starGuide", "sampleAnswer"]
              },
              description: "갭 기반 기회 및 동기/포부 맞춤 면접 예상 질문 5가지와 STAR 답변 안내 가이드 및 모범 답변 스크립트"
            }
          },
          required: ["jobPostingAnalysis", "candidateAnalysis", "scoring", "selfIntroFeedback", "interviewQuestions"]
        }
      }
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error("Gemini API가 빈 분석값을 반환했습니다.");
    }

    // Parse the structured response safely removing any potential markdown code blocks
    let jsonText = outputText.trim();
    if (jsonText.startsWith("```")) {
      jsonText = jsonText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
    }
    const parsedData = JSON.parse(jsonText.trim());
    return res.json(parsedData);

  } catch (error: any) {
    console.error("Analysis API failed:", error);
    return res.status(500).json({ 
      error: translateGeminiError(error)
    });
  }
});

// Configure Vite middleware in development
if (process.env.NODE_ENV !== "production") {
  createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  }).then((vite) => {
    app.use(vite.middlewares);
    console.log("Vite development middleware activated.");
  });
} else {
  // Static build server for Cloud Run production
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Start actual listener
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening at http://0.0.0.0:${PORT} under environment: ${process.env.NODE_ENV || 'development'}`);
});

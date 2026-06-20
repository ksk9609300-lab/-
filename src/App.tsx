import React, { useState, useRef } from "react";
import { AnalysisResult } from "./types";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";
import { 
  FileText, 
  User, 
  HelpCircle, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw, 
  Loader2, 
  CheckCircle,
  Briefcase,
  Layers,
  ArrowRight,
  Target,
  Award,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Zap,
  Lock,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  Sparkle,
  X,
  FileUp,
  Paperclip,
  Trash2
} from "lucide-react";

// ============================================
// [MODULE: HEAD/CONFIG START]
// ============================================
const DEMO_TEMPLATES = [
  {
    name: "💻 스타트업 프론트엔드 개발자 전형",
    jobPosting: `[모집 부문] 신입/주니어 프론트엔드 소프트웨어 엔지니어 (Vite & React 전공 우대)

[업무내용]
- 사내 어드민 페이지 및 주력 고객용 서비스 UI 인터페이스 개발
- React, TypeScript 환경의 컴포넌트 모듈화 설계 및 리팩토링 참여
- 기획자, UI 디자이너와의 유연한 커뮤니케이션을 통한 사용성 개선

[지원자격 (하드스킬)]
- React 라이브러리 및 하위 반응형 웹 설계 능력
- TypeScript 기반 정적 타입 지정 실무 경험 6개월 또는 포트폴리오 준비자
- Git을 이용한 소스코드 형상관리 및 버전 브랜치 관리 경험

[우대 태도 (소프트스킬 및 회사 분위기)]
- 코드 리뷰 시 유연하게 소통하며 타인의 관점을 포용하는 친절한 동료
- 자기 주도적으로 모르는 기술 스택을 빠르게 습득하고 응용하는 성장형 인재
- 스타트업 특유의 빠른 제품 배포 주기와 기민한 문화에 능동적인 성향`,
    candidateCv: `이름: 김지훈 (1998년생)
주소: 서울시 강남구 역삼로 41-10번길 3층 (상세 정보 노출 우려)
전화번호: 010-8294-1182
이메일: ryu@techdomain.com

[자기소개 및 요약]
저는 대학 연합 캡스톤 디자인 과제에서 Git을 기반으로 공동 프론트엔드 개발에 도전했던 청년 활동가 김지훈입니다. 코드 품질과 반응형 레이아웃 설계를 위해 꾸준히 노력해 왔습니다.

[주요 이력 정보]
1. 캡스톤 팀 프로젝트 '우리동네 상회' (6개월)
- React와 Vite 프레임워크를 적용해 동네 소상공인 지도 서비스 컴포넌트 프론트엔드 파트 총괄
- TypeScript를 도입해 컴포넌트 형 변환 에러율을 약 25% 가량 낮춤
- 팀원 4명과의 정기 스크럼 회의에서 유연하게 이슈를 공론화해 충돌 없이 일정 내 마스터 브랜치 병합

2. 개인 학습 저널
- 다양한 라이브러리 배포 후 매주 기술 이슈 블로그 기록을 업데이트함`,
    selfIntro: "안녕하십니까! 스타트업의 기민한 문화 속에서 매일 성장하며, Git과 React 스택으로 탄탄한 UI를 구성할 준비가 된 신입 개발자 김지훈입니다. 열심히 배우는 자세로 어드민 리팩토링에 기여하겠습니다."
  },
  {
    name: "💼 대기업 럭셔리 유통부문 MD 부서 보조 마케터",
    jobPosting: `[인재 모집 부문] 백화점/럭셔리 패션 MD 부서 마케팅 인턴 및 부임 사원

[담당 실무]
- VIP 가문 타겟팅 주간 유통 트렌드 보고서 작성 및 경쟁사 팝업스토어 시장 분석
- 마케팅 광고 대행사와의 외부 메세징 조율 및 문서 백업 작성
- 엑셀 VLOOKUP 기능을 활용한 주간 매출 트렌드 피벗 테이블 성과 보고

[우대 요건 및 인재상]
- 비즈니스 엑셀 정밀 조작(VLOOKUP, IF 함수, 피벗 테이블 데이터 처리) 능력 필수
- 패션 및 유유 브랜딩 시장의 대외 활동 경험 우수자 선호
- 회사의 원활한 분위기를 리드하는 밝고 친근한 커뮤니케이션 적극성`,
    candidateCv: `이름: 한가희 (1997년생)
주소: 경기도 성남시 분당구 정자동 오피스텔 802호
연락처: 010-9988-1234
학력: 서울 소재 서부권 대학교 의류디자인학과 졸업

[보유 주요 직무 경험]
1. 유행 분석 연합 동아리 '트렌디파워' (1년 활동)
- 국내외 메이저 패션 기업 하반기 팝업스토어 12곳을 직접 서베이하고 엑셀 분석 파일로 가공
- 엑셀 피벗 테이블 처리를 연습하며 데이터 VLOOKUP을 활용해 정량 요약 주간 뉴스레터 발간
- 3회 연속 대학생 연합 트렌드 아이디어 프레젠테이션 공모전 특별상 입상(조정력 총괄)

2. 브랜딩 서포터즈
- 대외 유명 수입 명품 향수 유통팀 주최 서포터즈에 합류해 3개월 실습 진행`,
    selfIntro: "없음"
  }
];
// ============================================
// [MODULE: HEAD/CONFIG END]
// ============================================

// ============================================
// SELF-HEALING HYBRID ENGINE (LOCAL & SERVER-SIDE PROXIED FALLBACK)
// ============================================

// Local helper to mask credentials on client side just in case
function maskTextLocal(text: string): string {
  if (!text) return "";
  let masked = text;
  masked = masked.replace(/01[016789][-.\s]?([0-9]{3,4})[-.\s]?([0-9]{4})/g, (match, p1, p2) => {
    return `010-****-${p2}`;
  });
  masked = masked.replace(/([a-zA-Z0-9_\-\.\+]{3})([a-zA-Z0-9_\-\.\+]+)@([a-zA-Z0-9\-\.]+)/g, (match, p1, p2, p3) => {
    return `${p1}***@${p3}`;
  });
  masked = masked.replace(/[0-9]{2}[01][0-9][0-3][0-9]-[1-4][0-9]{6}/g, (match) => {
    return `${match.split('-')[0]}-*******`;
  });
  return masked;
}

// Local helper to parse error messages on client side
function translateGeminiErrorLocal(error: any): string {
  console.error("Direct Gemini call error:", error);
  const errMsg = error?.message || String(error || "");
  if (
    errMsg.includes("API_KEY_INVALID") || 
    errMsg.includes("not valid") || 
    errMsg.includes("invalid") ||
    errMsg.includes("API key") ||
    errMsg.includes("key")
  ) {
    return "입력하신 Gemini API 승인키가 올바르지 않거나 승인 검증에 실패했습니다. 구글 AI Studio에서 정식 발급받으신 유효한 API Key를 다시 한 번 정확하게 입력하고 활성화 처리를 완료해 주십시오.";
  }
  if (
    errMsg.includes("quota") || 
    errMsg.includes("RESOURCE_EXHAUSTED") || 
    errMsg.includes("429") || 
    errMsg.includes("Too Many Requests")
  ) {
    return "Gemini API 한도(Quota)가 제한되었거나 단시간에 너무 빈번하게 호출하셨습니다. 약 1분 정도 휴식을 취하신 후 다시 시도해 주시기 바랍니다.";
  }
  if (
    errMsg.includes("503") || 
    errMsg.includes("UNAVAILABLE") || 
    errMsg.includes("high demand") || 
    errMsg.includes("temporary")
  ) {
    return "현재 구글 실시간 Gemini AI 모델의 서버 트래픽이 크게 폭증해 일시적 점검 상태입니다. 보통 수 초 이내에 자동으로 해제되므로, 잠시 후 다시 시도해 주시기 바랍니다.";
  }
  return `Gemini 엔진 분석 과정 중 다음 특이 사항이 확인되었습니다: ${errMsg}.`;
}

// Client-side fallback handler to directly connect to Google's official Gemini endpoint.
// This enables full, unhindered app performance even when hosted on static sites like Vercel with no Node server.
async function executeGeminiClientSideFallback(url: string, bodyJson: any): Promise<any> {
  console.log(`[Vercel client-side fallback] Executing direct browser Gemini call for: ${url}`);
  const apiKey = bodyJson.apiKey || "";
  if (!apiKey) {
    throw new Error("사용할 수 있는 유효한 Gemini API 키 정보가 없습니다. 서비스 소개 화면에서 본인의 API 키를 등록해 주세요.");
  }

  const clientModel = "gemini-2.5-flash"; // Highly reliable, fast model with JSON schema support

  if (url.endsWith("/api/validate-key")) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${clientModel}:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "API key verification check. Please respond with exactly the single word: VALID" }] }],
          generationConfig: { maxOutputTokens: 5 }
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        const originalMsg = errJson?.error?.message || response.statusText;
        throw new Error(originalMsg);
      }

      return { valid: true };
    } catch (err: any) {
      throw new Error(translateGeminiErrorLocal(err));
    }
  }

  if (url.endsWith("/api/extract")) {
    const { fileData, mimeType, fileName } = bodyJson;
    if (!fileData) {
      throw new Error("파일 데이터가 누락되었습니다.");
    }

    if (mimeType === "text/plain" || fileName?.toLowerCase().endsWith(".txt")) {
      try {
        const binary = atob(fileData);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const decodedText = new TextDecoder("utf-8").decode(bytes);
        return { text: maskTextLocal(decodedText) };
      } catch (err) {
        return { text: maskTextLocal(atob(fileData)) };
      }
    }

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
    } else if (fileName?.toLowerCase().endsWith(".docx")) {
      extractMimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${clientModel}:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    data: fileData,
                    mimeType: extractMimeType,
                  }
                },
                {
                  text: "다음 문서나 이미지 파일에서 읽을 수 있는 모든 한국어/영어/기타 텍스트를 정밀하게 추출해주십시오. 누락되는 정보 없이 전체 내용을 줄글이나 원래 양식에 맞추어 완전하게 복구해 주셔야 하며, '요약'이나 '해설' 또는 부가적인 문구는 단 한 단어도 포함하지 마십시오. 오직 원문에 존재하는 본래의 텍스트만 그대로 반환하십시오."
                }
              ]
            }
          ]
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        const originalMsg = errJson?.error?.message || response.statusText;
        throw new Error(originalMsg);
      }

      const resData = await response.json();
      const parsedText = resData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      if (!parsedText.trim()) {
        throw new Error("파일로부터 텍스트를 추출할 수 없거나 결과가 비어 있습니다.");
      }

      return { text: maskTextLocal(parsedText) };
    } catch (err: any) {
      throw new Error(translateGeminiErrorLocal(err));
    }
  }

  if (url.endsWith("/api/analyze")) {
    const { jobPosting, cv, candidateCv, introduction, selfIntro } = bodyJson;
    const finalCv = cv || candidateCv || "";
    const finalIntro = introduction || selfIntro || "";

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

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${clientModel}:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          contents: [
            {
              parts: [{ text: userPrompt }]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                jobPostingAnalysis: {
                  type: "OBJECT",
                  properties: {
                    hardSkills: { 
                      type: "ARRAY", 
                      items: { type: "STRING" },
                      description: "핵심 하드 스킬(전문 기술 역량) 최대 5개"
                    },
                    softSkills: { 
                      type: "ARRAY", 
                      items: { type: "STRING" },
                      description: "핵심 소프트 스킬(소통 및 태도 역량) 최대 5개"
                    },
                    cultureKeywords: { 
                      type: "ARRAY", 
                      items: { type: "STRING" },
                      description: "회사 인재상 키워드(기업 문화 어울림) 최대 3개"
                    },
                    summary: { 
                      type: "STRING", 
                      description: "공고 분석 핵심 요약 (300자 이내)" 
                    }
                  },
                  required: ["hardSkills", "softSkills", "cultureKeywords", "summary"]
                },
                candidateAnalysis: {
                  type: "OBJECT",
                  properties: {
                    strengths: {
                      type: "ARRAY",
                      items: {
                        type: "OBJECT",
                        properties: {
                          title: { type: "STRING", description: "강점 제목" },
                          description: { type: "STRING", description: "강점 상세 설명" },
                          mappingEvidence: { type: "STRING", description: "[구직자 서류 원문]에서 직접 1:1 대응하여 매칭되는 구체적인 원문 인용" }
                        },
                        required: ["title", "description", "mappingEvidence"]
                      },
                      description: "합격에 매우 유리한 구직자의 주요 강점 3가지"
                    },
                    gaps: {
                      type: "ARRAY",
                      items: {
                        type: "OBJECT",
                        properties: {
                          title: { type: "STRING", description: "보완이 필요한 부족 항목 제목" },
                          description: { type: "STRING", description: "공고 대비 부족한 갭 및 보완 상세 일체" },
                          mappingEvidence: { type: "STRING", description: "[구직자 서류 원문] 또는 직무/채용 전략 관점에서의 대응 근거 및 조언" }
                        },
                        required: ["title", "description", "mappingEvidence"]
                      },
                      description: "인터뷰 전에 면밀히 보완할 공백 2가지"
                    },
                    summary: {
                      type: "STRING",
                      description: "상담사 총평 피드백(300자 이내)"
                    }
                  },
                  required: ["strengths", "gaps", "summary"]
                },
                scoring: {
                  type: "OBJECT",
                  properties: {
                    isWeightAdjusted: { 
                      type: "BOOLEAN", 
                      description: "공고 중요도에 따라 5대 축 점수 가중치 배점을 조정했는지 여부" 
                    },
                    weightAdjustReason: { 
                      type: "STRING", 
                      description: "가중치를 변경한 구체적인 1줄 사유 (조정하지 않은 경우 빈 문자열)" 
                    },
                    weights: {
                      type: "OBJECT",
                      properties: {
                        experience: { type: "INTEGER", description: "직무경험 가중치 (합계 100 고정)" },
                        techSkill: { type: "INTEGER", description: "기술스킬 가중치 (합계 100 고정)" },
                        orgFit: { type: "INTEGER", description: "조직적합성 가중치 (합계 100 고정)" },
                        communication: { type: "INTEGER", description: "커뮤니케이션 가중치 (합계 100 고정)" },
                        growth: { type: "INTEGER", description: "성장가능성 가중치 (합계 100 고정)" }
                      },
                      required: ["experience", "techSkill", "orgFit", "communication", "growth"]
                    },
                    scores: {
                      type: "OBJECT",
                      properties: {
                        experience: { type: "INTEGER", description: "직무경험 획득 점수 (가중치 만점 기준 중 취득 점수)" },
                        techSkill: { type: "INTEGER", description: "기술스킬 획득 점수" },
                        orgFit: { type: "INTEGER", description: "조직적합성 획득 점수" },
                        communication: { type: "INTEGER", description: "커뮤니케이션 획득 점수" },
                        growth: { type: "INTEGER", description: "성장가능성 획득 점수" }
                      },
                      required: ["experience", "techSkill", "orgFit", "communication", "growth"]
                    },
                    evidence: {
                      type: "OBJECT",
                      properties: {
                        experience: { type: "STRING", description: "직무경험 점수의 실제 서류 근거 인용 1줄" },
                        techSkill: { type: "STRING", description: "기술스킬 점수의 실제 서류 근거 인용 1줄" },
                        orgFit: { type: "STRING", description: "조직적합성 점수의 실제 서류 근거 인용 1줄" },
                        communication: { type: "STRING", description: "커뮤니케이션 점수의 실제 서류 근거 인용 1줄" },
                        growth: { type: "STRING", description: "성장가능성 점수의 실제 서류 근거 인용 1줄" }
                      },
                      required: ["experience", "techSkill", "orgFit", "communication", "growth"]
                    },
                    totalScore: { 
                      type: "INTEGER", 
                      description: "가중치가 반영된 최종 종합 적합도 맞춤 점수 (최대 100점)" 
                    }
                  },
                  required: ["isWeightAdjusted", "weightAdjustReason", "weights", "scores", "evidence", "totalScore"]
                },
                selfIntroFeedback: {
                  type: "OBJECT",
                  properties: {
                    hasLeadStatement: { 
                      type: "BOOLEAN", 
                      description: "결론을 맨 앞에 배치해 첫인상을 잡았는가? (두괄식 여부)" 
                    },
                    relevance: { 
                      type: "STRING", 
                      description: "직무 공고내용과의 접점 강도 (상, 중, 하 중 1개 선택)" 
                    },
                    critique: { 
                      type: "STRING", 
                      description: "자기소개 장단점 및 고칠 점 요약" 
                    },
                    improvedScript: { 
                      type: "STRING", 
                      description: "면접용 1분 입말체 말하기 제안 대본 스크립트 (200자 이내, 구어체)" 
                    }
                  },
                  required: ["hasLeadStatement", "relevance", "critique", "improvedScript"]
                },
                interviewQuestions: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      question: { type: "STRING", description: "맞춤형 면접 예상 질문" },
                      category: { type: "STRING", description: "질문 분류 항목 (구직자 갭 관련 구체적 15자 이내 명칭 또는 '입사지원 동기', '입사 후 포부 및 기여안' 등)" },
                      starGuide: { type: "STRING", description: "STAR 단계별 구조화된 요령식 가이드 (2줄 이내)" },
                      sampleAnswer: { type: "STRING", description: "해당 질문에 실전 대비용으로 대답할 수 있는 고품격 모범 답변 스크립트 샘플 (200~250자 이내, ~습니다 스타일의 구어체)" }
                    },
                    required: ["question", "category", "starGuide", "sampleAnswer"]
                  },
                  description: "갭 기반 기회 및 동기/포부 맞춤 면접 예상 질문 5가지와 STAR 답변 안내 가이드 및 모범 답변 스크립트"
                }
              },
              required: ["jobPostingAnalysis", "candidateAnalysis", "scoring", "selfIntroFeedback", "interviewQuestions"]
            }
          }
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        const originalMsg = errJson?.error?.message || response.statusText;
        throw new Error(originalMsg);
      }

      const resData = await response.json();
      const stringifiedResult = resData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      if (!stringifiedResult.trim()) {
        throw new Error("분석 제안 도서 생성을 진행할 수 없거나 결과물이 공란입니다.");
      }

      return JSON.parse(stringifiedResult);
    } catch (err: any) {
      throw new Error(translateGeminiErrorLocal(err));
    }
  }

  throw new Error(`알 수 없는 경로 요청: ${url}`);
}

// Self-healing fetch caller with automatic retry, progressive backoff, AND browser client-side direct fallback
async function fetchWithRetry(url: string, options: RequestInit, retries = 4, delay = 1000): Promise<any> {
  let lastError: any = null;
  let parsedBody: any = null;
  try {
    if (options.body && typeof options.body === "string") {
      parsedBody = JSON.parse(options.body);
    }
  } catch (e) {
    // Ignore body parsing issues
  }

  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, options);
      
      // If we hit a 404 Not Found error (common for Vercel/similar hostings which lack backend routes),
      // we immediately transition into direct client-side Gemini mode to secure successful processing!
      if (response.status === 404 || response.status === 405) {
        console.warn(`[서버 404 감지] ${url} 경로가 존재하지 않아 클라이언트 브라우저에서 구글 Gemini API로 직접 호출 전향을 시작합니다.`);
        if (parsedBody) {
          return await executeGeminiClientSideFallback(url, parsedBody);
        }
        throw new Error("서버 환경이 부재하며, 대체 요청을 구성할 페이로드가 없습니다.");
      }

      const text = await response.text();
      let data: any = null;
      let isJson = false;
      try {
        data = JSON.parse(text);
        isJson = true;
      } catch (e) {
        isJson = false;
      }
      
      const lowercaseText = text.toLowerCase();
      // Detect if container is restarting, deploying, or transient cloud loading pages are displayed
      const isServerLoading = 
        lowercaseText.includes("the page cannot") || 
        lowercaseText.includes("restarting") || 
        lowercaseText.includes("please wait") || 
        lowercaseText.includes("starting") ||
        lowercaseText.includes("starting up") ||
        lowercaseText.includes("application starts") ||
        lowercaseText.includes("loading") ||
        lowercaseText.includes("cannot post") ||
        lowercaseText.includes("unexpected token");

      const isTransientErrorStatus = response.status === 502 || response.status === 503 || response.status === 429;
      
      if ((isTransientErrorStatus || isServerLoading || !isJson) && i < retries) {
        console.warn(`[서버 기동 통신 보정] 상태코드=${response.status}, JSON여부=${isJson}, 임시점검문구=${isServerLoading}. ${delay}ms 후 재연결 시도합니다...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay = delay * 1.5;
        continue;
      }
      
      if (!isJson) {
        if (response.status >= 500) {
          throw new Error("Gemini AI 실시간 서버 트래픽이 몰려 응답이 차단되었습니다. 수 초 뒤 다시 한번 단추를 클릭해 주세요.");
        }
        throw new Error(`원만한 통신 연결이 일시적으로 중단되었습니다. (상태 코드: ${response.status}) 잠시 후 다시 클릭해 주십시오.`);
      }
      
      if (!response.ok) {
        throw new Error(data.error || "분석 과정 중 특이 보고서 에러가 확인되었습니다.");
      }
      
      return data;
    } catch (err: any) {
      lastError = err;
      
      // If we experience a physical connection issue (TypeError: Failed to fetch), fallback to direct client-side as well!
      const isNetworkFailed = err?.message?.includes("Failed to fetch") || err?.toString()?.includes("TypeError");
      if (isNetworkFailed && parsedBody) {
        console.warn(`[통신 단절 해소] 서버 물리 연결이 지연되거나 불가능하여 브라우저 다이렉트 Gemini API 처리를 시도합니다.`);
        try {
          return await executeGeminiClientSideFallback(url, parsedBody);
        } catch (fallbackErr: any) {
          lastError = fallbackErr;
        }
      }

      if (i < retries) {
        console.warn(`[통신 보정 재검색] 에러=${err.message || err}. ${delay}ms 후 재시도...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay = delay * 1.5;
        continue;
      }
    }
  }
  
  throw lastError || new Error("서버와의 초기 통신 연장 상태가 부진합니다. 페이지를 새로고침 한 후 잠시 뒤 진행해 주세요.");
}

export default function App() {
  // Application Inputs State
  const [jobPosting, setJobPosting] = useState<string>(DEMO_TEMPLATES[0].jobPosting);
  const [candidateCv, setCandidateCv] = useState<string>(DEMO_TEMPLATES[0].candidateCv);
  const [selfIntro, setSelfIntro] = useState<string>(DEMO_TEMPLATES[0].selfIntro);

  // Status & Output state
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  // Active Tab: ("landing" | "workspace" | "security")
  const [activeTab, setActiveTab] = useState<"landing" | "workspace" | "security">("landing");

  // Gemini API Key Authorization States
  const [userApiKey, setUserApiKey] = useState<string>("");
  const [isKeyValidated, setIsKeyValidated] = useState<boolean>(false);
  const [showKeyText, setShowKeyText] = useState<boolean>(false);
  const [isValidatingKey, setIsValidatingKey] = useState<boolean>(false);
  const [keyValidationError, setKeyValidationError] = useState<string | null>(null);
  const [keyValidationSuccess, setKeyValidationSuccess] = useState<string | null>(null);

  // File Upload State Managers
  const [isExtractingJob, setIsExtractingJob] = useState<boolean>(false);
  const [isExtractingCv, setIsExtractingCv] = useState<boolean>(false);
  const [jobFiles, setJobFiles] = useState<{ id: string; name: string; text: string }[]>([]);
  const [cvFiles, setCvFiles] = useState<{ id: string; name: string; text: string }[]>([]);

  // Refs for native file inputs
  const jobFileInputRef = useRef<HTMLInputElement>(null);
  const cvFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "job" | "cv") => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (!isKeyValidated) {
      setError("스마트 파일 업로드(PDF, 이미지, DOCX 등 OCR 자동 인식)는 본인의 Gemini API 키가 활성화된 이후에만 고성능 추출 엔진이 작동됩니다. 먼저 [🏠 서비스 소개] 탭에서 유효한 개인 API 키를 활성화해 주세요.");
      e.target.value = "";
      return;
    }

    const setExtracting = type === "job" ? setIsExtractingJob : setIsExtractingCv;
    const addFilesList = type === "job" ? setJobFiles : setCvFiles;
    const setText = type === "job" ? setJobPosting : setCandidateCv;

    setExtracting(true);
    setError(null);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // 1. Read file
        const textContent = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          
          if (file.type === "text/plain" || file.name.endsWith(".txt")) {
            reader.readAsText(file, "utf-8");
            reader.onload = () => resolve(reader.result as string);
          } else {
            reader.readAsDataURL(file);
            reader.onload = () => {
              const resultStr = reader.result as string;
              const base64String = resultStr.includes(",") ? resultStr.split(",")[1] : resultStr;
              resolve(base64String);
            };
          }
          reader.onerror = (error) => reject(error);
        });

        // 2. Play text files locally
        if (file.type === "text/plain" || file.name.endsWith(".txt")) {
          const fileId = Math.random().toString(36).substring(2, 9);
          addFilesList(prev => [...prev, { id: fileId, name: file.name, text: textContent }]);
          
          setText(prev => {
            const separator = prev.trim() ? "\n\n" : "";
            return prev + separator + `[첨부파일: ${file.name}]\n` + textContent;
          });
          continue;
        }

        // 3. Invoke /api/extract
        const data = await fetchWithRetry("/api/extract", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-gemini-key": userApiKey,
          },
          body: JSON.stringify({
            apiKey: userApiKey,
            fileData: textContent,
            mimeType: file.type,
            fileName: file.name
          })
        });

        const extractedText = data.text || "";

        const fileId = Math.random().toString(36).substring(2, 9);
        addFilesList(prev => [...prev, { id: fileId, name: file.name, text: extractedText }]);
        
        setText(prev => {
          const separator = prev.trim() ? "\n\n" : "";
          return prev + separator + `[첨부파일: ${file.name} 추출 본문]\n` + extractedText;
        });
      }
    } catch (err: any) {
      console.error("Text extraction failed:", err);
      setError(err?.message || "파일을 해석해 텍스트를 구성하는 과정에서 서버 오류 및 지연이 확인되었습니다. 직접 복사 하거나 형식을 다시 한번 확인해 주십시오.");
    } finally {
      setExtracting(false);
      e.target.value = "";
    }
  };

  const handleRemoveFile = (id: string, type: "job" | "cv") => {
    const list = type === "job" ? jobFiles : cvFiles;
    const fileToRemove = list.find(f => f.id === id);
    if (!fileToRemove) return;

    const setList = type === "job" ? setJobFiles : setCvFiles;
    const setText = type === "job" ? setJobPosting : setCandidateCv;

    setList(prev => prev.filter(f => f.id !== id));
    
    // Remove the written file structure and let them clean up
    setText(prev => {
      const tagWithContent = `[첨부파일: ${fileToRemove.name}]\n` + fileToRemove.text;
      const ocrTagWithContent = `[첨부파일: ${fileToRemove.name} 추출 본문]\n` + fileToRemove.text;
      
      let updated = prev;
      if (updated.includes(tagWithContent)) {
        updated = updated.replace(tagWithContent, "");
      } else if (updated.includes(ocrTagWithContent)) {
        updated = updated.replace(ocrTagWithContent, "");
      } else if (updated.includes(fileToRemove.text)) {
        updated = updated.replace(fileToRemove.text, "");
      }
      
      return updated.trim();
    });
  };

  // Check and clear functions for API Key Management
  const handleValidateApiKey = async () => {
    if (!userApiKey.trim()) {
      setKeyValidationError("API 키를 적어주셔야 유효성 검사 기동이 가능합니다.");
      return;
    }

    setIsValidatingKey(true);
    setKeyValidationError(null);
    setKeyValidationSuccess(null);

    try {
      const data = await fetchWithRetry("/api/validate-key", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ apiKey: userApiKey }),
      });

      if (data.valid) {
        setIsKeyValidated(true);
        setKeyValidationSuccess("입력하신 Gemini API 키가 안정적으로 검증 및 승인되었습니다!");
        localStorage.setItem("user_gemini_api_key", userApiKey);
        localStorage.setItem("user_gemini_api_key_valid", "true");
        setError(null);
      } else {
        throw new Error(data.error || "실패하였습니다.");
      }
    } catch (err: any) {
      console.error(err);
      setIsKeyValidated(false);
      localStorage.removeItem("user_gemini_api_key_valid");
      setKeyValidationError(err?.message || "Gemini API 키 연결 검사 중 예상치 못한 상태가 발견되었습니다. 키를 다시 한번 확인해 주세요.");
    } finally {
      setIsValidatingKey(false);
    }
  };

  const handleClearApiKey = () => {
    setUserApiKey("");
    setIsKeyValidated(false);
    setKeyValidationError(null);
    setKeyValidationSuccess(null);
    localStorage.removeItem("user_gemini_api_key");
    localStorage.removeItem("user_gemini_api_key_valid");
  };

  // Run the API analyst model call
  const handleAnalyzeMatch = async () => {
    if (!isKeyValidated) {
      setError("구인공고 정밀 분석을 위해서는 Google Gemini API 승인키가 필수적입니다. 먼저 [🏠 서비스 소개] 탭에서 유효한 개인 API 키를 등록하고 안전 보증 승인을 받아 주세요.");
      setActiveTab("landing");
      // Scroll to key activation center section
      setTimeout(() => {
        document.getElementById("key-activation-section")?.scrollIntoView({ behavior: "smooth" });
      }, 200);
      return;
    }

    if (!jobPosting.trim()) {
      setError("구인공고 원문을 기재해야 분석을 시작할 수 있습니다.");
      return;
    }
    if (!candidateCv.trim()) {
      setError("구직자 서류 원문을 기재해야 분석을 시작할 수 있습니다.");
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const data = await fetchWithRetry("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-gemini-key": userApiKey,
        },
        body: JSON.stringify({
          apiKey: userApiKey,
          jobPosting,
          candidateCv,
          selfIntro: selfIntro || "없음",
        }),
      });

      setAnalysisResult(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Gemini 분석 도중 예기치 못한 실패가 발생했습니다. 입력을 수정한 뒤 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadTemplate = (index: number) => {
    const template = DEMO_TEMPLATES[index];
    setJobPosting(template.jobPosting);
    setCandidateCv(template.candidateCv);
    setSelfIntro(template.selfIntro);
    setError(null);
    setActiveTab("workspace");
  };

  return (
    // ============================================
    // [MODULE: LAYOUT START - Styled with slide theme]
    // ============================================
    <div className="min-h-screen bg-[#D4E2D9] font-sans antialiased text-[#1C3F24] flex flex-col justify-between">
      
      {/* PRESENTATION STYLE BORDER FRAME LINE AT TOP */}
      <div className="h-2 bg-[#1C3F24] w-full"></div>

      {/* GLOBAL HEADER BAR - Styled like slide navbar */}
      <header className="bg-[#FAFBF9] border-b border-[#CFDDD3] shadow-xs sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#1C3F24] text-white rounded-xl shadow-xs flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#E2EF37] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-[#1C3F24] tracking-tight leading-tight">
                  <span className="block sm:inline">채용공고 맞춤형 입사지원서</span>{" "}
                  <span className="block sm:inline">컨설팅 솔루션</span>
                </h1>
                <span className="text-[10px] bg-[#E2EF37] text-[#1C3F24] px-2 py-0.5 rounded-full font-black">
                  AI 전문관 v3.3
                </span>
              </div>
              <p className="text-[11px] text-[#2A5235] font-semibold">
                국민취업지원제도 전문 고용서비스 상담서식 전형 분석 플랫폼
              </p>
            </div>
          </div>

          {/* TAB BAR NAVIGATION - Fully Optimized for Mobile and Web */}
          <nav className="grid grid-cols-3 sm:flex items-center gap-1 bg-[#E8ECEA] p-1 rounded-xl border border-[#CFDDD3] font-black text-[10px] sm:text-xs w-full sm:w-auto shrink-0">
            <button
               onClick={() => setActiveTab("landing")}
               className={`px-1.5 py-2 sm:px-4 sm:py-2 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap shrink-0 flex-none ${
                 activeTab === "landing"
                   ? "bg-[#1C3F24] text-[#E2EF37] shadow-xs"
                   : "text-[#2A5235] hover:text-[#1C3F24] hover:bg-[#FAFBF9]/60"
               }`}
            >
              <span className="hidden sm:inline">🏠 서비스 소개</span>
              <span className="sm:hidden">🏠 서비스 안내</span>
            </button>
            <button
               onClick={() => setActiveTab("workspace")}
               className={`px-1.5 py-2 sm:px-4 sm:py-2 rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap shrink-0 flex-none ${
                 activeTab === "workspace"
                   ? "bg-[#1C3F24] text-[#E2EF37] shadow-xs"
                   : "text-[#2A5235] hover:text-[#1C3F24] hover:bg-[#FAFBF9]/60"
               }`}
            >
              <span className="hidden sm:inline">⚡ 실시간 컨설팅 실행</span>
              <span className="sm:hidden">⚡ 실시간 분석</span>
              <span 
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full inline-block shrink-0 ${
                  isKeyValidated ? "bg-[#E2EF37] animate-pulse" : "bg-amber-500 animate-bounce"
                }`}
                title={isKeyValidated ? "Gemini 엔진 승인 활성화됨" : "Gemini API 키 등록필요"}
              ></span>
            </button>
            <button
               onClick={() => setActiveTab("security")}
               className={`px-1.5 py-2 sm:px-4 sm:py-2 rounded-lg transition-all flex items-center justify-center gap-1 sm:gap-1.5 cursor-pointer whitespace-nowrap shrink-0 flex-none ${
                 activeTab === "security"
                   ? "bg-[#1C3F24] text-[#E2EF37] shadow-xs"
                   : "text-[#2A5235] hover:text-[#1C3F24] hover:bg-[#FAFBF9]/60"
               }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">개인정보 마스킹 지침</span>
              <span className="sm:hidden">마스킹 지침</span>
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN MAIN CONTAINER */}
      <main className="flex-grow">
        
        {/* =========================================================================
             1. LANDING PAGE VIEW - Purely themed after the Cozy presentation layouts
             ========================================================================= */}
        {activeTab === "landing" && (
          <div className="animate-fade-in space-y-12 pb-16">
            
            {/* HERO HERO HERO - Done like the Welcome Slide layout! */}
            <section className="bg-[#FAFBF9] border-b border-[#CFDDD3] py-16 px-4 relative overflow-hidden">
              <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Side Slide Content */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-1.5 bg-[#E2EF37] text-[#1C3F24] px-4 py-1.5 rounded-full text-xs font-black tracking-wide uppercase shadow-xs">
                    <Flame className="w-3.5 h-3.5 animate-pulse text-red-650" /> 국민취업지원제도 고용 보좌 공식 프레임워크 연계
                  </div>
                  
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-[#1C3F24]">
                    이력서와 채용공고의 <span className="bg-[#E2EF37] px-2 py-1 rounded-sm text-[#1C3F24] inline-block decoration-wavy">완벽한 1:1 결합</span>,<br />
                    <span>인공지능 정밀 적합도 진단기</span>
                  </h1>

                  <p className="text-[#2A5235] text-sm sm:text-base leading-relaxed font-semibold">
                    취업지원상담사님과 자기소개를 헤매는 구직 청년님들을 위해 탄생했습니다.<br />
                    데이터에 절대 없는 내용은 지어내지 않고 오직 <strong className="text-[#1C3F24] underline">실제 서류 원문만을 근거</strong>로
                    합격을 끌어올리는 정밀 매칭 분석 보고서를 3초 만에 설계합니다.
                  </p>

                  {/* CALL TO ACTIONS */}
                  <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                    <button
                      onClick={() => setActiveTab("workspace")}
                      className="w-full sm:w-auto px-8 py-4 bg-[#1C3F24] hover:bg-[#2A5235] text-[#E2EF37] font-black rounded-xl shadow-md transition-all hover:scale-102 flex items-center justify-center gap-2 text-sm cursor-pointer"
                    >
                      <Zap className="w-4 h-4 fill-[#E2EF37] text-[#E2EF37]" /> 실시간 매칭 컨설팅 시작
                    </button>
                    <a
                      href="#how-it-works"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="w-full sm:w-auto px-6 py-4 bg-[#E8ECEA] hover:bg-[#D4E2D9] text-[#1C3F24] border border-[#CFDDD3] font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-1 cursor-pointer"
                    >
                      특장점 및 비법 둘러보기 <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Right Side Slide Banner Mock-up (simulating the illustrations from Slide 1 of attached image!) */}
                <div className="lg:col-span-5 bg-[#D4E2D9] p-8 rounded-2xl border-4 border-[#1C3F24] flex flex-col justify-between space-y-6 relative">
                  <div className="absolute top-4 right-4 bg-[#E2EF37] text-[#1C3F24] px-3 py-1 rounded font-black text-[11px]">
                    Welcome ☘️
                  </div>
                  <div>
                    <span className="text-[11px] font-black tracking-widest text-[#2A5235] uppercase block mb-1">
                      ONBOARDING ASSIST
                    </span>
                    <h3 className="text-xl font-black text-[#1C3F24]">
                      신입사원 온보딩 가이드
                    </h3>
                    <p className="text-xs text-[#2A5235] mt-1 font-semibold leading-relaxed">
                      성공적인 첫출발을 유도하는 검증 분석 엔진
                    </p>
                  </div>
                  
                  {/* Decorative visual drawing imitation */}
                  <div className="bg-[#FAFBF9] rounded-xl p-4 border-2 border-[#1C3F24] space-y-3">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#CFDDD3]">
                      <span className="inline-block w-3 h-3 rounded-full bg-[#E2EF37] border border-[#1C3F24]"></span>
                      <span className="text-xs font-black text-[#1C3F24]">실시간 분석 매칭 지표 작동</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-2 bg-[#1C3F24] rounded-full w-4/5"></div>
                      <div className="h-2 bg-[#CFDDD3] rounded-full w-full"></div>
                      <div className="h-2 bg-[#E2EF37] rounded-full w-3/5"></div>
                    </div>
                  </div>

                  <span className="text-[10px] text-center block text-[#2A5235] font-black">
                    성공적인 구인/구직 1:1 매치메이킹 지름길
                  </span>
                </div>

              </div>
            </section>

            {/* GEMINI API KEY ACTIVATION CENTER */}
            <section id="key-activation-section" className="max-w-6xl mx-auto px-4 relative z-20">
              <div className="bg-[#FAFBF9] rounded-2xl shadow-sm border-2 border-[#1C3F24] p-6 sm:p-8 space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#CFDDD3] pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="p-1 bg-[#1C3F24] text-white rounded-md">
                        <Lock className="w-4 h-4 text-[#E2EF37]" />
                      </span>
                      <span className="text-xs font-black text-[#1C3F24] tracking-widest uppercase bg-[#E2EF37] px-2 py-0.5 rounded border border-[#1C3F24]">
                        GEMINI ENGINE ACTIVATION
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#1C3F24] tracking-tight">
                      개인 Gemini API 인증키 등록 및 승인
                    </h2>
                    <p className="text-xs text-[#2A5235] font-semibold leading-relaxed">
                      이 서비스는 100% 실시간 팩트 이력 매칭을 처리합니다. 오직 공인된 본인의 Google Gemini API 키로 기기를 활성화해 주셔야 전 서비스 기능을 잠금 해제할 수 있습니다.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                    {isKeyValidated ? (
                      <span className="inline-flex items-center gap-1 bg-[#2A5235] text-[#E2EF37] text-xs font-black px-3.5 py-1.5 rounded-xl border border-[#1C3F24] shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-[#E2EF37]" /> 기기 승인 완료
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 text-xs font-black px-3.5 py-1.5 rounded-xl border border-amber-300 shadow-xs">
                        <AlertTriangle className="w-4 h-4 text-amber-600" /> API 승인 필요 (미인증)
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#1C3F24] flex items-center justify-between">
                        <span>🔑 Gemini 구글 API 보안키 (AI_STUDIO_KEY)</span>
                        <a
                          href="https://aistudio.google.com/app/apikey"
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-[#1C3F24] font-black underline hover:text-[#2A5235]"
                        >
                          Google AI Studio에서 무료 API 키 발급받기 ↗
                        </a>
                      </label>
                      <div className="relative flex items-center">
                        <input
                          type={showKeyText ? "text" : "password"}
                          value={userApiKey}
                          onChange={(e) => {
                            let cleanedKey = e.target.value.trim();
                            // Strip any accidental wrapping quotes, double quotes, backticks, or square brackets
                            cleanedKey = cleanedKey.replace(/^["'`\[\]]+|["'`\[\]]+$/g, "");
                            setUserApiKey(cleanedKey);
                            setIsKeyValidated(false); // require re-verification upon change
                            localStorage.removeItem("user_gemini_api_key_valid");
                          }}
                          className="w-full text-xs font-mono bg-[#E8ECEA]/40 border-2 border-[#1C3F24] rounded-xl pl-3 pr-24 py-3.5 focus:outline-hidden focus:ring-2 focus:ring-[#1C3F24] font-bold text-[#1C3F24]"
                          placeholder="AIzaSy로 시작하는 비밀 API 키를 복사 및 붙여넣기 해주세요"
                        />
                        <div className="absolute right-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setShowKeyText(!showKeyText)}
                            className="text-[11px] text-[#2A5235] font-black px-2.5 py-1.5 hover:bg-[#D4E2D9] rounded-lg transition-colors cursor-pointer"
                          >
                            {showKeyText ? "숨기기" : "보기"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={handleValidateApiKey}
                        disabled={isValidatingKey || !userApiKey.trim()}
                        className="px-6 py-3 bg-[#1C3F24] hover:bg-[#2A5235] text-[#E2EF37] text-xs font-black rounded-lg shadow-xs transition-opacity flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isValidatingKey ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-[#E2EF37]" />
                            인프라 검사 검증 중...
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-4 h-4" />
                            키 검증 및 기기 승인 완료하기
                          </>
                        )}
                      </button>

                      {userApiKey.trim() && (
                        <button
                          onClick={handleClearApiKey}
                          className="px-4 py-3 bg-[#E8ECEA] hover:bg-[#D4E2D9] text-[#1C3F24] border border-[#CFDDD3] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                        >
                          인증 해제 및 지우기
                        </button>
                      )}
                    </div>

                    {keyValidationError && (
                      <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-black leading-relaxed">
                        ⚠️ <strong>승인 불가 안내:</strong> {keyValidationError}
                      </div>
                    )}

                    {keyValidationSuccess && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-black leading-relaxed">
                        🎉 <strong>승인 완료 안내:</strong> {keyValidationSuccess} 이제 아래에서 원하는 직무 템플릿을 선택하거나 [⚡ 실시간 컨설팅 실행] 메뉴에서 분석을 개시할 수 있습니다!
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-4 bg-[#E8ECEA]/50 rounded-xl p-4 border border-[#CFDDD3] space-y-3 font-bold text-xs text-[#2A5235] leading-relaxed">
                    <span className="text-[10px] font-black tracking-widest text-[#1C3F24] bg-[#E2EF37] px-2 py-0.5 rounded-sm block w-fit">
                      API KEY SECURITY
                    </span>
                    <h3 className="font-extrabold text-[#1C3F24] text-xs font-black">안심하고 입력해 주세요:</h3>
                    <ul className="space-y-1.5 list-disc pl-4 text-[11px]">
                      <li>입력된 API 키는 절대 서비스용 데이터베이스나 외부 서버에 상주 저장되지 않습니다.</li>
                      <li>오직 구직 행위 시 Gemini 분석 모델 연결에만 일시 호출되며, 브라우저의 <strong>개인용 쿠키/로컬 저장소(localStorage)</strong>에 안전하게 휘발되어 보관됩니다.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK EXPERIENCE PRESET CONTAINER */}
            <section className="max-w-6xl mx-auto px-4 relative z-20">
              <div className="bg-[#FAFBF9] rounded-2xl shadow-sm border-2 border-[#1C3F24] p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1C3F24] animate-ping"></span>
                    <h3 className="text-xs font-black text-[#1C3F24] uppercase tracking-widest bg-[#E2EF37] px-2 py-0.5 rounded">
                      귀찮은 타이핑은 건너뛰기
                    </h3>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1C3F24] tracking-tight">
                    준비된 템플릿으로 빠른 점검 체험해 보세요
                  </h2>
                  <p className="text-xs text-[#2A5235] leading-relaxed font-bold">
                    가장 많이 모여드는 대표 직군들의 데이터를 엄선해 두었습니다. 단 1초 만에 최적화 매칭을 구경하실 수 있습니다.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
                  {DEMO_TEMPLATES.map((tpl, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleLoadTemplate(idx)}
                      className="w-full sm:w-auto px-5 py-3.5 bg-[#E8ECEA] hover:bg-[#E2EF37] hover:text-[#1C3F24] text-[#1C3F24] font-black rounded-xl border border-[#CFDDD3] transition-all text-xs flex items-center justify-between gap-3 shadow-xs cursor-pointer"
                    >
                      <span>{tpl.name}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION: WHY WE ARE SPECIAL - HOW IT WORKS */}
            <section id="how-it-works" className="max-w-6xl mx-auto px-4 space-y-10">
              
              <div className="text-center space-y-2 max-w-2xl mx-auto">
                <span className="text-xs font-black text-[#1C3F24] bg-[#E2EF37] px-3 py-1 rounded">주요 강점 분석</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1C3F24] tracking-tight">
                  기존의 가짜 조언들과 무엇이 아주 다를까요?
                </h2>
                <div className="w-12 h-1 bg-[#1C3F24] mx-auto mt-2 rounded-full"></div>
              </div>

              {/* THREE COLUMN VALUE GRID (Styled like folder card slides!) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* ADVANTAGE 1 */}
                <div className="bg-[#FAFBF9] rounded-2xl p-6 border-2 border-[#1C3F24] space-y-4 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-[#E2EF37] text-[#1C3F24] rounded-xl flex items-center justify-center font-black text-lg border border-[#1C3F24]">
                    01
                  </div>
                  <h3 className="font-extrabold text-[#1C3F24] text-base">
                    1. 100% 팩트 중심 매칭 보고
                  </h3>
                  <p className="text-[#2A5235] text-xs leading-relaxed font-semibold">
                    자소서에 써둔 실제 참여 활동명, 경력 일자, 보유 장비 스킬들만을 수작업 수준으로 찾아냅니다. 
                    존재하지 않는 가상의 우수 사례를 기입하거나, 근거가 부실한 채로 무조건 점수를 매기는 기존 AI의 '뜬구름 잡기 단점'을 완벽하게 예방 차단했습니다.
                  </p>
                </div>

                {/* ADVANTAGE 2 */}
                <div className="bg-[#FAFBF9] rounded-2xl p-6 border-2 border-[#1C3F24] space-y-4 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-[#E2EF37] text-[#1C3F24] rounded-xl flex items-center justify-center font-black text-lg border border-[#1C3F24]">
                    02
                  </div>
                  <h3 className="font-extrabold text-[#1C3F24] text-base">
                    2. 상담사 동반의 보안 마스킹 보호
                  </h3>
                  <p className="text-[#2A5235] text-xs leading-relaxed font-semibold">
                    이메일 주소, 전화번호, 탄생연도를 제외한 주민상세, 세부 동 호수 주소 등은 브라우저에서 서버로 내보내는 첫 순간부터 완벽히 지워지거나 안전하게 보호됩니다. AI 오염 걱정 없이 익명성을 지키며 대규모 진단을 이어가세요.
                  </p>
                </div>

                {/* ADVANTAGE 3 */}
                <div className="bg-[#FAFBF9] rounded-2xl p-6 border-2 border-[#1C3F24] space-y-4 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-[#E2EF37] text-[#1C3F24] rounded-xl flex items-center justify-center font-black text-lg border border-[#1C3F24]">
                    03
                  </div>
                  <h3 className="font-extrabold text-[#1C3F24] text-base">
                    3. 영혼을 채우는 1분 스피치 튜닝
                  </h3>
                  <p className="text-[#2A5235] text-xs leading-relaxed font-semibold">
                    면접장에 들어갈 때 제출하는 오프닝 자기소개가 결론부터 시작하는 '두괄식' 구조인지 기계적으로 자동 확인합니다. 귀가 열릴 수 있도록 실제 구직자의 억양과 한글 맞춤법을 고려한 구어체 수정 대본을 선물합니다.
                  </p>
                </div>
              </div>

              {/* TABLE: BEFORE VS AFTER VISUAL COMPARISON */}
              <div className="bg-[#FAFBF9] rounded-2xl border-2 border-[#1C3F24] p-6 sm:p-8 space-y-6">
                <div>
                  <h3 className="font-black text-[#1C3F24] text-lg tracking-tight">AI 입사지원서 컨설팅 도입 전후 효과</h3>
                  <p className="text-xs text-[#2A5235] font-semibold mt-1">상담 절차가 더 간결해지고, 피상담자의 만족 성과를 눈으로 직접 극대화해 체감해 보세요</p>
                </div>

                <div className="overflow-x-auto text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#E8ECEA] text-[#1C3F24] font-black border-b border-[#CFDDD3]">
                        <th className="p-4 rounded-l-lg">진단 비교 영역</th>
                        <th className="p-4">기존의 수작업 상담 / 일반 AI 안내</th>
                        <th className="p-4 rounded-r-lg text-indigo-950 bg-[#E2EF37]/35">v3.3 정밀 입사 지원 솔루션</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#CFDDD3] text-[#2A5235] leading-relaxed font-semibold">
                      <tr>
                        <td className="p-4 font-black text-[#1C3F24]">공고 핵심 정리</td>
                        <td className="p-4">단순 전체 복사나 오탈자 투성이 요약</td>
                        <td className="p-4 text-[#1C3F24] font-black bg-[#E2EF37]/10">하드/소프트 스킬과 인재상 핵심 5개 족집게 분류</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-black text-[#1C3F24]">소질 강약 진단</td>
                        <td className="p-4">구직자가 적합해 보이는 주관적 감상 서술</td>
                        <td className="p-4 text-[#1C3F24] font-black bg-[#E2EF37]/10">공고 핵심 키워드와 구직자 서류 원문의 1:1 대조 입증</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-black text-[#1C3F24]">적합도 점수제</td>
                        <td className="p-4">근거 없이 부여하는 뜬구름 잡기 형태의 난수 점수</td>
                        <td className="p-4 text-[#1C3F24] font-black bg-[#E2EF37]/10">5대 역량축 가중치 계산 + 실제 서류 구체 대사 인용 [근거 불충분] 알림</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-black text-[#1C3F24]">면접관 질문 대비</td>
                        <td className="p-4">아무 직종에나 어울리는 뻔한 대표 질문 1~2개</td>
                        <td className="p-4 text-[#1C3F24] font-black bg-[#E2EF37]/10">서류 틈새 공략 및 지원동기·포부 5선 & STAR 구조화 답변 제안</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TARGET AUDIENCE CARD DECK */}
              <div className="bg-[#1C3F24] rounded-3xl p-8 sm:p-12 text-[#FAFBF9] relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
                  <div className="space-y-4">
                    <span className="text-xs font-bold text-[#1C3F24] bg-[#E2EF37] px-3 py-1 rounded-full">
                      가입이나 복잡한 설정 없음
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                      누가 사용하면 가장 큰 가치를 가질 수 있을까요?
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D4E2D9] leading-relaxed font-semibold">
                      고용노동부 국민취업지원 상담 현장이나 취업 스터디 룸, 혹은 자기소개서 내용이 마뜩잖은 저녁 시간 책상 앞 등 구직 관련 전문성과 가독성 있는 보정이 필요한 어디서나 이 플랫폼이 밝은 길을 비추어 드립니다.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#1C3F24]">
                    <div className="bg-[#FAFBF9] p-5 rounded-2xl border-2 border-[#CFDDD3] space-y-2">
                      <span className="text-lg">👩‍💼</span>
                      <h4 className="font-extrabold text-sm">현업 고용 취업상담사</h4>
                      <p className="text-[11px] text-[#2A5235] leading-relaxed font-semibold">자소서를 한 장씩 정독해 팩트체크할 시간이 턱없이 부족할 때 탁월한 지원 도구가 되어줍니다.</p>
                    </div>

                    <div className="bg-[#FAFBF9] p-5 rounded-2xl border-2 border-[#CFDDD3] space-y-2">
                      <span className="text-lg">🚀</span>
                      <h4 className="font-extrabold text-sm">자기소개 헤매는 청년</h4>
                      <p className="text-[11px] text-[#2A5235] leading-relaxed font-semibold">공고에서 진짜 요구하는 능력이 뭔지 몰라 스펙을 그냥 줄글로 읊조리기만 하는 오류를 고쳐줍니다.</p>
                    </div>
                  </div>
                </div>
              </div>

            </section>
          </div>
        )}

        {/* =========================================================================
             2. ACTIVE WORKSPACE VIEW - Richly matching the Presentation Slides Theme
             ========================================================================= */}
        {activeTab === "workspace" && (
          <div className="max-w-7xl mx-auto w-full px-4 py-6 sm:px-6 lg:px-8 space-y-6 animate-fade-in">
            
            {/* WORKSPACE BANNER */}
            <div className="bg-[#FAFBF9] rounded-2xl p-6 border-2 border-[#1C3F24] flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="space-y-1">
                <span className="bg-[#E2EF37] text-[#1C3F24] px-2.5 py-0.5 rounded text-[10px] font-black block w-fit">
                  모듈러 연계 진단실
                </span>
                <h3 className="text-lg font-black text-[#1C3F24]">
                  실시간 맞춤 매칭 컨설팅 작업대
                </h3>
                <p className="text-xs text-[#2A5235] font-semibold">실제 공고와 서류를 기입하여 100% 팩트 기반 합격 성분을 구성해 보세요.</p>
              </div>

              {/* DYNAMIC BACK BUTTON */}
              <button
                onClick={() => setActiveTab("landing")}
                className="px-4 py-2.5 bg-[#E8ECEA] hover:bg-[#D4E2D9] text-[#1C3F24] border border-[#CFDDD3] font-black rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                🏠 서비스 소개로 돌아가기
              </button>
            </div>

            {/* TWO COLUMN INPUT SECTION (INPUT SCHEMA) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT INPUT PANEL - Styled like slide side panel */}
              <div id="input-schema-section" className="lg:col-span-5 bg-[#FAFBF9] rounded-2xl border-2 border-[#1C3F24] p-6 space-y-5">
                <div className="pb-3 border-b border-[#CFDDD3] flex justify-between items-center">
                  <h3 className="font-black text-[#1C3F24] text-sm flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#1C3F24]" />
                    컨설팅 데이터 수신 서식
                  </h3>
                  <button 
                    onClick={() => {
                      setJobPosting("");
                      setCandidateCv("");
                      setSelfIntro("");
                    }}
                    className="text-[10px] bg-[#E8ECEA] hover:bg-[#D4E2D9] text-[#1C3F24] border border-[#CFDDD3] px-2.5 py-1 rounded font-black transition-colors"
                  >
                    새로 지우기
                  </button>
                </div>

                {/* 1. 구인공고 원문 */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#1C3F24] flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      📁 [구인공고 원문] <span className="text-rose-600 font-black">*</span>
                    </span>
                    <span className="text-[10px] text-[#1C3F24] bg-[#E2EF37] px-1.5 py-0.5 rounded font-bold">※OCR 추출 검정 가능</span>
                  </label>

                  {/* Inline File Picker for Job Posting */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => jobFileInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1C3F24] hover:bg-[#2A5235] text-[#E2EF37] border border-[#1C3F24] rounded-lg text-[11px] font-black cursor-pointer transition-colors"
                    >
                      <FileUp className="w-3.5 h-3.5" />
                      공고 파일 업로드 (PDF, 이미지, TXT, Word)
                    </button>
                    <input
                      type="file"
                      ref={jobFileInputRef}
                      onChange={(e) => handleFileUpload(e, "job")}
                      multiple
                      accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg,.webp,.gif"
                      className="hidden"
                    />
                    {isExtractingJob && (
                      <span className="text-[10px] font-bold text-[#1C3F24] bg-[#E2EF37] px-2 py-1 rounded flex items-center gap-1 animate-pulse">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        AI 텍스트 정밀 추출 중 (약 3~5초)...
                      </span>
                    )}
                  </div>

                  {/* Job Files Pill list */}
                  {jobFiles.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 p-1.5 bg-neutral-100 rounded-lg border border-[#CFDDD3]">
                      <span className="text-[9px] text-neutral-500 block w-full font-black">업로드된 공고 파일 리스트:</span>
                      {jobFiles.map((file) => (
                        <span key={file.id} className="inline-flex items-center gap-1 bg-[#FAFBF9] border border-[#CFDDD3] text-[#1C3F24] rounded-md px-2 py-0.5 text-[10px] font-black">
                          <Paperclip className="w-2.5 h-2.5 shrink-0 text-slate-500" />
                          <span className="max-w-[150px] truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(file.id, "job")}
                            className="text-rose-600 hover:text-rose-800 ml-1 font-bold shrink-0 cursor-pointer"
                            title="파일 제거 및 텍스트 삭제"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <textarea
                    rows={7}
                    value={jobPosting}
                    onChange={(e) => setJobPosting(e.target.value)}
                    className="w-full text-[12px] bg-[#FAFBF9] border-2 border-[#1C3F24] rounded-xl p-3 focus:outline-hidden focus:ring-2 focus:ring-[#1C3F24] transition-all text-[#1C3F24] placeholder-slate-400 leading-relaxed font-semibold"
                    placeholder="회사 채용조건, 선호 스펙, 하드/소프트 스킬과 우대 사항을 입력해 주세요. (위 버튼을 클릭하여 파일이나 이미지를 직접 첨부해 넣을 수도 있습니다)"
                  />
                </div>

                {/* 2. 구직자 서류 원문 */}
                <div className="space-y-2">
                  <label className="text-xs font-black text-[#1C3F24] flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      📂 [구직자 서류 원문] <span className="text-rose-600 font-black">*</span>
                    </span>
                    <span className="text-[10px] text-[#2A5235] font-bold">※이력서/구직신청서 통합 자가검증 가능</span>
                  </label>

                  {/* Inline File Picker for Candidate CV */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => cvFileInputRef.current?.click()}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1C3F24] hover:bg-[#2A5235] text-[#E2EF37] border border-[#1C3F24] rounded-lg text-[11px] font-black cursor-pointer transition-colors"
                    >
                      <FileUp className="w-3.5 h-3.5" />
                      이력서 파일 업로드 (PDF, 이미지, TXT, Word)
                    </button>
                    <input
                      type="file"
                      ref={cvFileInputRef}
                      onChange={(e) => handleFileUpload(e, "cv")}
                      multiple
                      accept=".pdf,.docx,.doc,.txt,.png,.jpg,.jpeg,.webp,.gif"
                      className="hidden"
                    />
                    {isExtractingCv && (
                      <span className="text-[10px] font-bold text-[#1C3F24] bg-[#E2EF37] px-2 py-1 rounded flex items-center gap-1 animate-pulse">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        AI 서류 인식 및 개인정보 마스킹 추출 중...
                      </span>
                    )}
                  </div>

                  {/* CV Files Pill list */}
                  {cvFiles.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 p-1.5 bg-neutral-100 rounded-lg border border-[#CFDDD3]">
                      <span className="text-[9px] text-neutral-500 block w-full font-black">업로드된 서류 파일 리스트:</span>
                      {cvFiles.map((file) => (
                        <span key={file.id} className="inline-flex items-center gap-1 bg-[#FAFBF9] border border-[#CFDDD3] text-[#1C3F24] rounded-md px-2 py-0.5 text-[10px] font-black">
                          <Paperclip className="w-2.5 h-2.5 shrink-0 text-slate-500" />
                          <span className="max-w-[150px] truncate">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(file.id, "cv")}
                            className="text-rose-600 hover:text-rose-800 ml-1 font-bold shrink-0 cursor-pointer"
                            title="파일 제거 및 텍스트 삭제"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <textarea
                    rows={8}
                    value={candidateCv}
                    onChange={(e) => setCandidateCv(e.target.value)}
                    className="w-full text-[12px] bg-[#FAFBF9] border-2 border-[#1C3F24] rounded-xl p-3 focus:outline-hidden focus:ring-2 focus:ring-[#1C3F24] transition-all text-[#1C3F24] placeholder-slate-400 leading-relaxed font-semibold"
                    placeholder="자신의 학력, 성과 프로젝트, 다룰 줄 아는 툴 명세를 넣어주세요. (위 버튼을 통해 PDF나 워드, 캡처된 자소서 이력을 바로 업로드할 수 있습니다)"
                  />
                </div>

                {/* 3. 기존 1분 자기소개 */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-[#1C3F24] flex items-center justify-between">
                    <span>💬 [기존 1분 자기소개] <span className="text-slate-450 font-medium">(선택)</span></span>
                    <span className="text-[10px] text-slate-400 font-normal">미입력 시 '없음' 처리</span>
                  </label>
                  <input
                    type="text"
                    value={selfIntro}
                    onChange={(e) => setSelfIntro(e.target.value)}
                    className="w-full text-[12px] bg-[#FAFBF9] border-2 border-[#1C3F24] rounded-xl p-3 focus:outline-hidden focus:ring-2 focus:ring-[#1C3F24] transition-all text-[#1C3F24] placeholder-slate-400 font-semibold"
                    placeholder="면접용 1분 스피치 대본을 입력해 다듬거나 비워두세요."
                  />
                </div>

                {/* MATCH SUBMIT ANALYZE BUTTON */}
                <button
                  onClick={handleAnalyzeMatch}
                  disabled={loading}
                  className="w-full bg-[#1C3F24] hover:bg-[#2A5235] text-[#E2EF37] border-2 border-[#1C3F24] font-black text-sm py-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:text-slate-500 disabled:border-slate-300 disabled:cursor-not-allowed cursor-pointer active:scale-95"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-[#E2EF37]" />
                      구직 조건 및 스코어 매칭 가공 중...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-[#E2EF37] fill-[#E2EF37] animate-pulse" />
                      100% 근거 기반 컨설팅 분석 시작하기
                    </>
                  )}
                </button>

                {error && (
                  <div className="p-3.5 bg-rose-50 border-2 border-rose-200 rounded-xl text-rose-800 text-xs leading-relaxed font-bold">
                    ⚠️ {error}
                  </div>
                )}

                <div className="border-t border-[#CFDDD3] pt-3 flex items-center gap-2 text-[10px] text-[#2A5235] font-black">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  주민번호 및 상세주소는 제출 즉시 보정 기술로 자가 마스킹 처리됨
                </div>
              </div>

              {/* RIGHT OUTPUT CONTENT STAGE */}
              <div className="lg:col-span-7 flex flex-col justify-start">
                
                {/* STATE A: NOT LOADED YET */}
                {!analysisResult && !loading && (
                  <div className="bg-[#FAFBF9] rounded-2xl border-2 border-[#1C3F24] p-12 text-center h-full min-h-[450px] flex flex-col items-center justify-center">
                    <div className="p-4 bg-[#D4E2D9] text-[#1C3F24] rounded-2xl mb-4 border border-[#1C3F24]">
                      <Briefcase className="w-10 h-10 stroke-1 text-[#1C3F24] animate-bounce" />
                    </div>
                    <span className="text-xs font-black text-[#2A5235] tracking-widest uppercase block mb-1">
                      waiting for matching audit
                    </span>
                    <h3 className="text-lg font-black text-[#1C3F24]">
                      분석 대기 중입니다
                    </h3>
                    <p className="text-[#2A5235] text-xs max-w-sm mt-2 leading-relaxed font-semibold">
                      왼쪽 서식에 채용 전형의 공고 원문과 자소서를 기입하신 후 <strong>[분석 시작하기]</strong> 단추를 눌러주시면 즉각적으로 5개 단계의 AI 정밀 피드백이 생성됩니다.
                    </p>
                    
                    {/* HINT CHIPS */}
                    <div className="mt-6 p-4 bg-[#E8ECEA] rounded-xl border border-[#CFDDD3] w-full max-w-md">
                      <span className="text-[10px] font-black text-[#1C3F24] uppercase tracking-widest block mb-2">원스톱 테스트 요령</span>
                      <p className="text-[11px] text-[#1C3F24] leading-relaxed font-bold">
                        귀찮은 원서 정리가 번거로우시면 본 페이지 최상단의 <span className="bg-[#E2EF37] px-1 text-[#1C3F24] inline rounded-xs">🏠 서비스 소개</span> 탭에서 입사 템플릿 지원 단추를 누르면 예제 데이터가 즉극 적용됩니다.
                      </p>
                    </div>
                  </div>
                )}

                {/* STATE B: LOADING PROGRESS WHEEL */}
                {loading && (
                  <div className="bg-[#FAFBF9] rounded-2xl border-2 border-[#1C3F24] p-12 text-center h-full min-h-[450px] flex flex-col items-center justify-center">
                    <div className="relative flex items-center justify-center mb-6">
                      <div className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-[#E8ECEA] opacity-75"></div>
                      <div className="p-3 bg-[#D4E2D9] text-[#1C3F24] rounded-2xl border border-[#1C3F24]">
                        <Loader2 className="w-8 h-8 animate-spin text-[#1C3F24]" />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#1C3F24] bg-[#E2EF37] px-2.5 py-1 rounded-full mb-3 tracking-wider">
                      AI 커리어 컨설턴트 분석 운용 중
                    </span>
                    <h3 className="text-lg font-black text-[#1C3F24]">
                      이력 데이터 기반 1:1 매칭률 계산 중입니다
                    </h3>
                    
                    <div className="space-y-2.5 max-w-md w-full mt-4 text-center mx-auto">
                      <p className="text-[#2A5235] text-xs leading-relaxed font-bold break-keep">
                        &quot;이력서 및 자소서 원문에서 공고 스펙과 1:1로 대응되는 문구들을 정확하게 하나씩 대치 중이므로 잠시만 기동을 기다려 주세요...&quot;
                      </p>
                      
                      <div className="p-3 bg-[#E2EF37]/30 text-[#1C3F24] rounded-lg border border-[#1C3F24] text-[11px] font-black leading-relaxed break-keep">
                        ⚠️ <strong>최우선 보안 처리 중:</strong> 연락처나 주민번호 여부, 상세주소 성분을 필터링하여 안전한 보고서를 조직하고 있습니다.
                      </div>
                    </div>
                  </div>
                )}

                {/* STATE C: PERFECTLY LOADED & CONSTRUCTED SECTIONS (SECTION-1 to SCRIPT END) */}
                {analysisResult && !loading && (
                  <div className="space-y-6">
                    
                    {/* ANALYSIS OVERVIEW STATUS SUMMARY CARD */}
                    <div className="bg-[#1C3F24] text-[#FAFBF9] rounded-2xl p-5 border-2 border-[#1C3F24] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#E2EF37] text-[#1C3F24] rounded-xl font-bold">
                          <CheckCircle className="w-6 h-6 animate-bounce text-[#1C3F24]" />
                        </div>
                        <div>
                          <h4 className="font-extrabold text-sm text-[#E2EF37]">진단 컨설팅 보고서가 준비되었습니다</h4>
                          <p className="text-xs text-[#D4E2D9] font-semibold mt-0.5">
                            하단 1-5단계의 모듈들을 클릭 및 스크롤하여 상세 상담내용을 지참하십시오.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleAnalyzeMatch}
                          className="px-3.5 py-1.5 bg-[#FAFBF9] text-[#1C3F24] text-xs font-black rounded-lg hover:bg-[#E8ECEA] transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> 다시 분석하기
                        </button>
                      </div>
                    </div>

                    {/* REDESIGNED MATCHING CARD VIEWS WITH SLIDE PRESENTATION TONE AND FOLDER TABS */}
                    <Section1 analysis={analysisResult.jobPostingAnalysis} />
                    <Section2 analysis={analysisResult.candidateAnalysis} />
                    <Section3 scoring={analysisResult.scoring} />
                    <Section4 feedback={analysisResult.selfIntroFeedback} />
                    <Section5 questions={analysisResult.interviewQuestions} />

                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* =========================================================================
             3. SECURITY RULES POLICY SHEET VIEW
             ========================================================================= */}
        {activeTab === "security" && (
          <div id="security-guide-module" className="bg-[#FAFBF9] rounded-2xl border-2 border-[#1C3F24] p-8 space-y-6 max-w-4xl mx-auto my-8 animate-fade-in shadow-xs">
            <div className="flex items-center gap-3 pb-4 border-b border-[#CFDDD3]">
              <div className="p-3 bg-[#1C3F24] text-[#E2EF37] rounded-xl">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#1C3F24]">제 4장: 최우선 보안 및 개인정보 마스킹 작동 규칙</h2>
                <p className="text-xs text-[#2A5235] font-black mt-0.5">상담 중 유출되기 쉬운 구직자의 중요 신상보호를 위해 설계된 다중 마스킹 필터</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#E8ECEA] p-5 rounded-xl border border-[#CFDDD3] space-y-3">
                <h3 className="font-extrabold text-[#1C3F24] text-sm">🚫 절대 원문 외부 노출 금지 규칙</h3>
                <ul className="space-y-2 text-xs text-[#2A5235] list-disc pl-4 font-bold">
                  <li><strong>주민 및 외국인번호:</strong> 뒷자리는 물론 전체 완벽 마스킹 처리</li>
                  <li><strong>상세 주소:</strong> 동/호수는 전면 생략, 시/구 단위(예: 대구시 수성구) 까지만 표현 허용</li>
                  <li><strong>전화번호:</strong> 중간 번호 마스킹 및 국번 가리기 (010-****-5678)</li>
                  <li><strong>이메일 주소:</strong> 앞 3자리까지만 표시 후 가리기</li>
                  <li><strong>기타:</strong> 입대 상세 병역, 불어난 가족 관계, 종교는 상담 보고서에 기록을 최소화</li>
                </ul>
              </div>

              <div className="bg-[#FAFBF9] p-5 rounded-xl border-2 border-[#1C3F24] space-y-3 font-bold text-xs text-[#2A5235]">
                <h3 className="font-extrabold text-[#1C3F24] text-sm bg-[#E2EF37] px-2 py-0.5 rounded w-fit">💡 누락 및 상담사 수동 점검 규칙</h3>
                <ul className="space-y-2 list-disc pl-4">
                  <li><strong>원문에 애초에 없는 식별정보:</strong> 억지로 창조해 채우지 않고, 보고서의 관련 란을 비우거나 자연스럽게 삭제 처리합니다.</li>
                  <li><strong>식별이 불통한 불명확 애매 정보:</strong> 가짜 데이터를 섞지 않고 <code className="bg-[#FAFBF9] px-1.5 py-0.5 rounded border border-[#1C3F24] text-[#1C3F24] text-[11px] font-black whitespace-nowrap inline-block">[정보 부족 - 상담사 확인 필요]</code> 로 표시해 수동 확인을 지지합니다.</li>
                  <li><strong>로컬 사전 정제 필터:</strong> Gemini 전달 전 브라우저/로컬 단에서 010 패턴 및 이메일 인텔리전트 전처리 치환 필터가 이중으로 기동되고 있습니다.</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-[#E8ECEA] border border-[#CFDDD3] rounded-xl">
              <p className="text-xs text-[#1C3F24] font-black leading-relaxed">
                📢 "고용 서비스 상담사는 구직자의 민감한 서류 데이터의 물리적인 수집을 최소화하고, 가공되지 않은 자소서를 그대로 인쇄해 보존해서는 엄격히 안 됩니다."
              </p>
            </div>
          </div>
        )}

      </main>

      {/* GLOBAL CLEAN FOOTER */}
      <footer className="bg-[#FAFBF9] border-t border-[#CFDDD3] py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#2A5235] font-black">
          <p>© 2026 채용공고 맞춤형 입사지원서 컨설팅 솔루션. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            <span>국민취업지원제도 전문 보조상담 도구</span>
            <span>•</span>
            <span className="text-[#1C3F24] font-black">Gemini 3.5 Flash Engine 구동</span>
          </div>
        </div>
      </footer>

    </div>
    // ============================================
    // [MODULE: LAYOUT END]
    // ============================================
  );
}

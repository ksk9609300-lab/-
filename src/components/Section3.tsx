import React, { useState } from "react";
import { Scoring } from "../types";
import { Award, Sliders, ChevronDown, ChevronRight, HelpCircle, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

interface Section3Props {
  scoring: Scoring;
}

export default function Section3({ scoring }: Section3Props) {
  const [expandedAxis, setExpandedAxis] = useState<string | null>(null);

  // Human-friendly labels and descriptions for easy understanding - styled perfectly
  const axesMeta: Record<string, { label: string; easyDesc: string; color: string; bg: string }> = {
    experience: {
      label: "직무 관련 경험",
      easyDesc: "지원하는 일과 똑같거나 유사한 회사·단체 활동에서 실무를 해본 적이 있는지 평가합니다.",
      color: "bg-[#1C3F24]",
      bg: "bg-[#E8ECEA]",
    },
    techSkill: {
      label: "전문 기술 역량",
      easyDesc: "자격증이나 다룰 줄 아는 사무 정밀 기기, 컴퓨터 소프트웨어 등 업무 해결 도구 조작력을 평가합니다.",
      color: "bg-[#1C3F24]",
      bg: "bg-[#E8ECEA]",
    },
    orgFit: {
      label: "회사 궁합과 조직 적합",
      easyDesc: "팀원들과 사이 좋게 소통하고 사내 규칙과 회사가 일하는 가치관에 조화롭게 녹아드는지 평가합니다.",
      color: "bg-[#1C3F24]",
      bg: "bg-[#E8ECEA]",
    },
    communication: {
      label: "의사소통 및 조율력",
      easyDesc: "남의 말을 명확히 경청하고 내 의견을 조리 있고 순등하게 보고·협력하여 오해를 줄이는 힘입니다.",
      color: "bg-[#1C3F24]",
      bg: "bg-[#E8ECEA]",
    },
    growth: {
      label: "앞으로의 성장 열정",
      easyDesc: "배우는 의지가 있고, 한 걸음 더 전진해 앞으로 꾸준히 성장하며 적극적으로 기여할 수 있는가입니다.",
      color: "bg-[#1C3F24]",
      bg: "bg-[#E8ECEA]",
    },
  };

  const calculatePercent = (axis: keyof typeof scoring.scores) => {
    const rawScore = scoring.scores[axis]; // typically 0-20
    const weight = scoring.weights[axis] || 20;
    return Math.round((rawScore / 20) * 100);
  };

  const getEvidenceText = (axis: keyof typeof scoring.evidence) => {
    const text = scoring.evidence[axis];
    if (!text || text.includes("[근거 불충분]") || text.trim() === "") {
      return (
        <span className="text-rose-600 font-extrabold bg-rose-50 border border-rose-200 px-2.5 py-1 rounded inline-flex items-center gap-1.5 text-[10px] w-fit">
          <AlertCircle className="w-3.5 h-3.5 inline" /> [근거 불충분 - 조금 더 구체적인 이력이 자소서에 기재되면 좋습니다]
        </span>
      );
    }
    return <span className="text-[#2A5235] italic font-bold">&quot;{text}&quot;</span>;
  };

  return (
    <div id="section-3" className="relative mt-8 bg-[#FAFBF9] rounded-2xl border-2 border-[#1C3F24] p-6 shadow-xs transition-all hover:shadow-sm">
      
      {/* DECORATIVE PRESENATION FOLDER TAB HEADER */}
      <div className="absolute -top-6 left-5 bg-[#E8ECEA] px-4 py-1.5 rounded-t-xl border-2 border-[#1C3F24] border-b-0 flex items-center gap-2 select-none">
        <span className="bg-[#E2EF37] text-[#1C3F24] text-[10px] font-black px-2 py-0.5 rounded border border-[#1C3F24]">
          STEP 03
        </span>
        <span className="text-xs font-black text-[#1C3F24]">종합 직무 적합도 진단</span>
      </div>

      {/* SECTION HEADER CONTENT */}
      <div className="flex items-center gap-3 mb-6 border-b-2 border-dashed border-[#CFDDD3] pb-4 pt-1">
        <div className="p-2 bg-[#1C3F24] text-[#E2EF37] rounded-xl">
          <Award className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-black text-[#1C3F24] flex items-center gap-2">
            3단계: 종합 직무 적합도 진단
          </h2>
          <p className="text-[11px] text-[#2A5235] font-semibold">공고 요구조합 대비 매칭 점수를 5대 가치 기준으로 가시화합니다</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COMP: SCORE VISUALIZER (4 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#E8ECEA]/30 rounded-2xl border-2 border-[#1C3F24]">
          <span className="text-[10px] font-black text-[#1C3F24] tracking-wider bg-[#E2EF37] border border-[#1C3F24] px-3 py-1 rounded-full mb-4">
            종합 맞춤 지수
          </span>

          {/* DYNAMIC SEMI-ARIAL SCALING OR GAUGE SPINNER */}
          <div className="relative flex items-center justify-center h-48 w-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="74"
                className="stroke-[#E8ECEA] fill-none"
                strokeWidth="12"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="74"
                className="stroke-[#1C3F24] fill-none"
                strokeWidth="14"
                strokeDasharray="465"
                initial={{ strokeDashoffset: 465 }}
                animate={{ strokeDashoffset: 465 - (465 * scoring.totalScore) / 100 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="text-4xl font-extrabold text-[#1C3F24] block"
              >
                {scoring.totalScore}
                <span className="text-sm font-black text-[#2A5235]">점</span>
              </motion.span>
              <span className="text-[10px] font-black text-[#1C3F24] bg-[#E2EF37] px-2 py-0.5 rounded-sm block mt-1 border border-[#1C3F24]">
                {scoring.totalScore >= 80 ? "🎯 강력 추천 매칭" : scoring.totalScore >= 60 ? "👍 든든한 합격권" : "💼 맞춤 면접대비 추천"}
              </span>
            </div>
          </div>

          {/* WEIGHT ADJUSTMENT ALERTER */}
          <div className="mt-4 w-full text-center">
            {scoring.isWeightAdjusted ? (
              <div className="p-3 bg-[#FAFBF9] border-2 border-[#1C3F24] rounded-xl text-left">
                <p className="text-[10px] font-black text-[#1C3F24] flex items-center gap-1.5 mb-1 bg-[#E2EF37] px-2 py-0.5 rounded border border-[#1C3F24] w-fit">
                  <Sliders className="w-3.5 h-3.5" /> 공고에 따른 맞춤형 가중치 비율 작동 중
                </p>
                <p className="text-[11px] text-[#2A5235] leading-relaxed font-bold">
                  &quot;{scoring.weightAdjustReason}&quot;
                </p>
              </div>
            ) : (
              <div className="p-2.5 bg-[#E8ECEA] border border-[#CFDDD3] rounded-xl">
                <p className="text-[10px] text-[#2A5235] font-bold">
                  💡 5가지 역량을 고르게 평가하는 기본 20점 배점이 안전하게 적용되었습니다.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COMP: 5 AXIS BAR METRICS (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-xs font-black text-[#1C3F24] mb-2 uppercase tracking-wide">
            영역별 정밀 진단 결과와 이력서 근거
          </h3>

          <div className="space-y-4">
            {(Object.keys(axesMeta) as Array<keyof typeof axesMeta>).map((axis) => {
              const meta = axesMeta[axis];
              const score = scoring.scores[axis as keyof typeof scoring.scores]; // up to 20
              const weight = scoring.weights[axis as keyof typeof scoring.weights] || 20;
              const percent = calculatePercent(axis as keyof typeof scoring.scores);
              const isExpanded = expandedAxis === axis;

              return (
                <div key={axis} className="bg-[#FAFBF9] rounded-xl p-3.5 border-2 border-[#1C3F24]/30 hover:border-[#1C3F24] transition-all">
                  {/* BAR HEADER */}
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1C3F24] border border-[#E2EF37]"></span>
                      <span className="text-xs font-black text-[#1C3F24]">{meta.label}</span>
                      <button
                        onClick={() => setExpandedAxis(isExpanded ? null : axis)}
                        className="text-[#2A5235] hover:text-[#1C3F24] transition-colors cursor-pointer"
                        title="쉬운 가이드 정보 보기"
                        aria-label="쉬운 가이드 설명 보기"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-right flex items-center gap-1 text-[11px] font-black text-[#1C3F24]">
                      <span>{score}점</span>
                      <span className="text-[#2A5235]">/ {weight}점 만점</span>
                    </div>
                  </div>

                  {/* MINI INFO GAUGE EXPLAINER */}
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-[#E8ECEA] text-[#1C3F24] p-2.5 rounded-lg text-xs leading-relaxed mb-2 border border-[#CFDDD3] font-bold break-keep"
                    >
                      🗣️ <span className="font-semibold">쉬운 용어 설명:</span> {meta.easyDesc}
                    </motion.div>
                  )}

                  {/* BAR PROGRESS GAUGE */}
                  <div className="w-full bg-[#E8ECEA] h-3.5 flex rounded-full overflow-hidden border border-[#CFDDD3]">
                    <motion.div
                      className="h-full bg-[#1C3F24]"
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 1.0, ease: "easeOut" }}
                    />
                  </div>

                  {/* CITATION DETAILS / LOWER FIELD FOR ORIGINAL PROMPT RULE */}
                  <div className="mt-2 pl-3 border-l-2 border-[#1C3F24] text-xs">
                    <span className="text-[9px] text-[#2A5235] block font-black mb-0.5">서류 기반 1줄 근거 매칭:</span>
                    <p className="text-[#2A5235] leading-snug font-semibold text-[11px] break-keep">
                      {getEvidenceText(axis as keyof typeof scoring.evidence)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { InterviewQuestion } from "../types";
import { HelpCircle, ChevronDown, ChevronUp, Star, HelpCircleIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Section5Props {
  questions: InterviewQuestion[];
}

export default function Section5({ questions }: Section5Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div id="section-5" className="relative mt-8 bg-[#FAFBF9] rounded-2xl border-2 border-[#1C3F24] p-6 shadow-xs transition-all hover:shadow-sm">
      
      {/* DECORATIVE PRESENATION FOLDER TAB HEADER */}
      <div className="absolute -top-6 left-5 bg-[#E8ECEA] px-4 py-1.5 rounded-t-xl border-2 border-[#1C3F24] border-b-0 flex items-center gap-2 select-none">
        <span className="bg-[#E2EF37] text-[#1C3F24] text-[10px] font-black px-2 py-0.5 rounded border border-[#1C3F24]">
          STEP 05
        </span>
        <span className="text-xs font-black text-[#1C3F24]">서류 맞춤형 면접 예상 질문</span>
      </div>

      {/* SECTION HEADER CONTENT */}
      <div className="flex items-center gap-3 mb-5 border-b-2 border-dashed border-[#CFDDD3] pb-4 pt-1">
        <div className="p-2 bg-[#1C3F24] text-[#E2EF37] rounded-xl">
          <HelpCircleIcon className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-black text-[#1C3F24] flex items-center gap-2">
            5단계: 서류 맞춤형 면접 예상 질문
          </h2>
          <p className="text-[11px] text-[#2A5235] font-semibold">본인 이력서의 누락된 부분(갭)을 대비하기 위한 상담사용 비밀 대처 가이드입니다</p>
        </div>
      </div>

      {/* DISCUSS */}
      <div className="space-y-3.5">
        {questions.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-xl border-2 transition-all ${
                isOpen ? "border-[#1C3F24] bg-[#E8ECEA]/20" : "border-[#1C3F24]/20 bg-[#FAFBF9] hover:bg-[#E8ECEA]/10"
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full text-left p-4 flex justify-between items-center gap-3 cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black border ${
                      isOpen ? "bg-[#1C3F24] text-[#E2EF37] border-[#1C3F24]" : "bg-[#E8ECEA] text-[#1C3F24] border-[#CFDDD3]"
                    }`}>
                      질문 0{idx + 1}
                    </span>
                    {item.category && (
                      <span className="bg-[#E2EF37] text-[#1C3F24] border border-[#1C3F24] px-1.5 py-0.5 rounded text-[10px] font-black tracking-tight shrink-0">
                        🔑 {item.category}
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-black text-[#1C3F24] leading-snug">
                    {item.question}
                  </span>
                </div>
                <div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#1C3F24] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#2A5235] shrink-0" />
                  )}
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1.5 border-t-2 border-dashed border-[#CFDDD3] space-y-3">
                      {/* STAR Guide Block */}
                      <div className="bg-[#FAFBF9] p-3.5 rounded-lg border border-[#CFDDD3] shadow-xs flex gap-2.5">
                        <div className="p-1.5 bg-[#E2EF37] text-[#1C3F24] rounded-md shrink-0 h-fit border border-[#1C3F24]">
                          <Star className="w-4 h-4 fill-[#1C3F24] text-[#1C3F24]" />
                        </div>
                        <div>
                          <span className="text-[9px] font-black text-[#1C3F24] block tracking-wider uppercase mb-1">
                            ⭐️ STAR 작성 프레임워크 핵심 요령
                          </span>
                          <p className="text-[#2A5235] text-xs leading-relaxed font-bold break-keep">
                            {item.starGuide}
                          </p>
                        </div>
                      </div>

                      {/* Sample Answer Block */}
                      <div className="bg-[#1C3F24]/5 p-3.5 rounded-lg border border-[#1C3F24]/20 shadow-xs flex gap-2.5">
                        <div className="p-1.5 bg-[#1C3F24] text-[#E2EF37] rounded-md shrink-0 h-fit border border-[#1C3F24]">
                          <span className="text-[10px] font-black font-mono leading-none flex items-center justify-center w-4 h-4">A</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-black text-[#1C3F24] block tracking-wider uppercase mb-1">
                            📢 추천 모범 실전 답변 스크립트 예시 (입말체)
                          </span>
                          <p className="text-[#1C3F24] text-xs leading-relaxed font-semibold whitespace-pre-wrap break-keep">
                            {item.sampleAnswer || `${item.category} 관점의 경력을 살려 모범 답변 리포트를 자동 준비 중입니다.`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {questions.length === 0 && (
          <p className="text-xs text-[#2A5235] italic text-center py-4 font-semibold">구인공고와 이력서의 맞물림이 매우 우수하여 추가 예상 질문이 필요치 않습니다.</p>
        )}
      </div>
    </div>
  );
}

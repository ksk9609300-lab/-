import React from "react";
import { SelfIntroFeedback } from "../types";
import { MessageSquareCode, BadgeCheck, XCircle, FileText, ArrowRight } from "lucide-react";

interface Section4Props {
  feedback: SelfIntroFeedback;
}

export default function Section4({ feedback }: Section4Props) {
  const getRelevanceBadge = (relevance: string) => {
    switch (relevance) {
      case "상":
        return <span className="bg-[#E2EF37] text-[#1C3F24] border-2 border-[#1C3F24] text-[10px] px-2.5 py-1 rounded-full font-black whitespace-nowrap inline-flex items-center shrink-0">🎯 상 (매우 우수)</span>;
      case "중":
        return <span className="bg-[#FAFBF9] text-[#1C3F24] border border-[#1C3F24] text-[10px] px-2.5 py-1 rounded-full font-black whitespace-nowrap inline-flex items-center shrink-0">👍 중 (양호함)</span>;
      default:
        return <span className="bg-[#E8ECEA] text-[#1C3F24] border border-[#CFDDD3] text-[10px] px-2.5 py-1 rounded-full font-black whitespace-nowrap inline-flex items-center shrink-0">⚠️ 하 (보강 시급)</span>;
    }
  };

  return (
    <div id="section-4" className="relative mt-8 bg-[#FAFBF9] rounded-2xl border-2 border-[#1C3F24] p-6 shadow-xs transition-all hover:shadow-sm">
      
      {/* DECORATIVE PRESENATION FOLDER TAB HEADER */}
      <div className="absolute -top-6 left-5 bg-[#E8ECEA] px-4 py-1.5 rounded-t-xl border-2 border-[#1C3F24] border-b-0 flex items-center gap-2 select-none">
        <span className="bg-[#E2EF37] text-[#1C3F24] text-[10px] font-black px-2 py-0.5 rounded border border-[#1C3F24]">
          STEP 04
        </span>
        <span className="text-xs font-black text-[#1C3F24]">1분 자기소개 클리닉 피드백</span>
      </div>

      {/* SECTION HEADER CONTENT */}
      <div className="flex items-center gap-3 mb-5 border-b-2 border-dashed border-[#CFDDD3] pb-4 pt-1">
        <div className="p-2 bg-[#1C3F24] text-[#E2EF37] rounded-xl">
          <MessageSquareCode className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-black text-[#1C3F24] flex items-center gap-2">
            4단계: 1분 자기소개 클리닉 피드백
          </h2>
          <p className="text-[11px] text-[#2A5235] font-semibold">면접 대기실이나 오프닝에서 나를 설명하는 강력한 비법 스크립트입니다</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEADING AND RELEVANCE RATINGS */}
        <div className="space-y-4">
          <div className="bg-[#E8ECEA]/50 rounded-xl p-4 border-2 border-[#1C3F24]/20 space-y-3.5">
            <h3 className="text-[10px] font-black text-[#1C3F24] uppercase tracking-wider">자가 진단 검증 항목</h3>
            
            {/* 1. 두괄식 여부 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#FAFBF9] rounded-lg border-2 border-[#1C3F24]/20 gap-3">
              <div className="break-keep">
                <span className="font-extrabold text-[#1C3F24] text-xs block">첫 소절 두괄식 구성</span>
                <span className="text-[10px] text-[#2A5235] block font-semibold mt-0.5">말머리에 결론이나 필살 무기를 먼저 선포하였는지 유무</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold shrink-0">
                {feedback.hasLeadStatement ? (
                  <span className="text-[#1C3F24] font-black flex items-center gap-1 bg-[#E2EF37] border border-[#1C3F24] px-3 py-1 rounded-full text-[10px] whitespace-nowrap shrink-0">
                    <BadgeCheck className="w-3.5 h-3.5" /> 성공 (Y)
                  </span>
                ) : (
                  <span className="text-rose-750 font-black flex items-center gap-1 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full text-[10px] whitespace-nowrap shrink-0">
                    <XCircle className="w-3.5 h-3.5" /> 보강 요망 (N)
                  </span>
                )}
              </div>
            </div>

            {/* 2. 직무연계성 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#FAFBF9] rounded-lg border-2 border-[#1C3F24]/20 gap-3">
              <div className="break-keep">
                <span className="font-extrabold text-[#1C3F24] text-xs block">직무 일거리와의 공통점</span>
                <span className="text-[10px] text-[#2A5235] block font-semibold mt-0.5">공고에 나오는 실무 쓰임새와 본인 경험의 어밀도</span>
              </div>
              <div className="shrink-0 flex items-center">
                {getRelevanceBadge(feedback.relevance)}
              </div>
            </div>
          </div>

          {/* CRITIQUE */}
          <div className="bg-[#E8ECEA]/30 rounded-xl p-4 border-2 border-[#1C3F24]/20">
            <h3 className="text-[10px] font-black text-[#1C3F24] uppercase tracking-wider mb-2">상담사 총평 및 자가진단 조언</h3>
            <p className="text-[#1C3F24] text-xs leading-relaxed font-bold break-keep">{feedback.critique}</p>
          </div>
        </div>

        {/* IMPROVED SCRIPT */}
        <div className="bg-[#1C3F24] text-white rounded-xl p-5 border-2 border-[#1C3F24] flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-dashed border-[#CFDDD3]/30 mb-4">
              <h3 className="text-xs font-black text-[#E2EF37] flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#E2EF37]" />
                추천 수정 대본 (실전 입말 구어체)
              </h3>
              <span className="text-[9px] bg-[#FAFBF9]/20 text-[#FAFBF9] border border-[#FAFBF9]/30 px-2 py-0.5 rounded font-mono font-black">
                자수 200자 준수
              </span>
            </div>
            
            <p className="text-[#FAFBF9] text-xs leading-relaxed italic bg-[#FAFBF9]/5 p-4 rounded-lg border border-[#FAFBF9]/10 font-bold break-keep">
              &quot;{feedback.improvedScript}&quot;
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-dashed border-[#FAFBF9]/10 text-[10px] text-[#D4E2D9] flex items-center gap-1 font-semibold">
            <span className="inline-block p-1 bg-[#E2EF37] rounded-full w-2 h-2 mr-1"></span>
            개인 면접 시 가벼운 제스처와 밝은 목소리로 읽으시면 더욱 돋보입니다.
          </div>
        </div>
      </div>
    </div>
  );
}

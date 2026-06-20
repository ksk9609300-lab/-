import React from "react";
import { CandidateAnalysis } from "../types";
import { UserCheck, ShieldAlert, BadgeCheck, Compass, Info } from "lucide-react";

interface Section2Props {
  analysis: CandidateAnalysis;
}

export default function Section2({ analysis }: Section2Props) {
  return (
    <div id="section-2" className="relative mt-8 bg-[#FAFBF9] rounded-2xl border-2 border-[#1C3F24] p-6 shadow-xs transition-all hover:shadow-sm">
      
      {/* DECORATIVE PRESENATION FOLDER TAB HEADER */}
      <div className="absolute -top-6 left-5 bg-[#E8ECEA] px-4 py-1.5 rounded-t-xl border-2 border-[#1C3F24] border-b-0 flex items-center gap-2 select-none">
        <span className="bg-[#E2EF37] text-[#1C3F24] text-[10px] font-black px-2 py-0.5 rounded border border-[#1C3F24]">
          STEP 02
        </span>
        <span className="text-xs font-black text-[#1C3F24]">구직자 역량 매칭 분석</span>
      </div>

      {/* SECTION HEADER CONTENT */}
      <div className="flex items-center gap-3 mb-5 border-b-2 border-dashed border-[#CFDDD3] pb-4 pt-1">
        <div className="p-2 bg-[#1C3F24] text-[#E2EF37] rounded-xl animate-pulse">
          <UserCheck className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-black text-[#1C3F24] flex items-center gap-2">
            2단계: 구직자 역량 매칭 분석
          </h2>
          <p className="text-[11px] text-[#2A5235] font-semibold">제출하신 이력을 바탕으로 대표 강점과 보완 가능한 틈새를 정밀하게 찾아내 드립니다</p>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-[#E8ECEA] rounded-xl p-4 mb-6 border border-[#CFDDD3]">
        <h3 className="text-xs font-black text-[#1C3F24] mb-1.5 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-[#1C3F24]" />
          상담사 총평 피드백
        </h3>
        <p className="text-[#1C3F24] text-xs leading-relaxed font-bold">{analysis.summary}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* STRENGTHS */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-[#1C3F24] flex items-center gap-1.5 pb-2 border-b border-[#CFDDD3] uppercase tracking-wider">
            <span className="p-1 bg-[#E2EF37] text-[#1C3F24] rounded-md border border-[#1C3F24]">
              <BadgeCheck className="w-4 h-4" />
            </span>
            합격에 매우 유리한 강점 (3선)
          </h3>
          <div className="space-y-3.5">
            {analysis.strengths.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#FAFBF9] hover:bg-[#E8ECEA]/20 rounded-xl border-2 border-[#1C3F24] transition-all flex flex-col gap-2"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-black text-[#1C3F24] bg-[#E2EF37] px-2 py-0.5 rounded border border-[#1C3F24] inline-block">
                    강점 0{idx + 1}
                  </span>
                  <span className="text-[9px] text-[#1C3F24] font-black bg-[#E8ECEA] px-2 py-0.5 rounded border border-[#CFDDD3]">
                    공고 조건 100% 매칭
                  </span>
                </div>
                <h4 className="font-extrabold text-[#1C3F24] text-xs leading-snug break-keep">{item.title}</h4>
                <p className="text-[#2A5235] text-[11px] leading-relaxed font-semibold break-keep">{item.description}</p>
                
                {/* 1:1 Matched Evidence block */}
                <div className="mt-1 p-2.5 bg-[#FAFBF9] rounded-lg border border-[#1C3F24]/20">
                  <span className="text-[9px] font-black text-[#1C3F24] block mb-1">
                    🔍 구직자 서류 원문 기반 매칭 근거:
                  </span>
                  <p className="text-[#2A5235] text-[11px] italic leading-relaxed font-bold break-keep">
                    &quot;{item.mappingEvidence}&quot;
                  </p>
                </div>
              </div>
            ))}
            {analysis.strengths.length === 0 && (
              <p className="text-xs text-slate-400 italic">추출된 강점이 없습니다.</p>
            )}
          </div>
        </div>

        {/* GAPS (보완할 점) */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-[#1C3F24] flex items-center gap-1.5 pb-2 border-b border-[#CFDDD3] uppercase tracking-wider">
            <span className="p-1 bg-[#E8ECEA] text-[#1C3F24] rounded-md border border-[#1C3F24]">
              <ShieldAlert className="w-4 h-4" />
            </span>
            인터뷰 전 면밀히 보완할 공백 (2선)
          </h3>
          <div className="space-y-3.5">
            {analysis.gaps.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#FAFBF9] hover:bg-[#E8ECEA]/20 rounded-xl border-2 border-[#1C3F24] transition-all flex flex-col gap-2"
              >
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-black text-[#1C3F24] bg-[#E8ECEA] px-2 py-0.5 rounded border border-[#CFDDD3] inline-block">
                    보완 0{idx + 1}
                  </span>
                  <span className="text-[9px] text-red-750 font-black bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    면접 질문 1지망 대비
                  </span>
                </div>
                <h4 className="font-extrabold text-[#1C3F24] text-xs leading-snug break-keep">{item.title}</h4>
                <p className="text-[#2A5235] text-[11px] leading-relaxed font-semibold break-keep">{item.description}</p>

                {/* Match block */}
                <div className="mt-1 p-2.5 bg-[#FAFBF9] rounded-lg border border-[#1C3F24]/20">
                  <span className="text-[9px] font-black text-rose-800 block mb-1">
                    ⚠️ 보완 대비 전략 근거:
                  </span>
                  <p className="text-[#2A5235] text-[11px] italic leading-relaxed font-bold break-keep">
                    &quot;{item.mappingEvidence}&quot;
                  </p>
                </div>
              </div>
            ))}
            {analysis.gaps.length === 0 && (
              <p className="text-xs text-slate-400 italic">추출된 보완점이 없으며, 완벽한 매칭을 자랑합니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

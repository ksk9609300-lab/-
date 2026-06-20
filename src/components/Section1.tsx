import React from "react";
import { JobPostingAnalysis } from "../types";
import { Briefcase, Key, Compass, Info } from "lucide-react";

interface Section1Props {
  analysis: JobPostingAnalysis;
}

export default function Section1({ analysis }: Section1Props) {
  return (
    <div id="section-1" className="relative mt-8 bg-[#FAFBF9] rounded-2xl border-2 border-[#1C3F24] p-6 shadow-xs transition-all hover:shadow-sm">
      
      {/* DECORATIVE PRESENATION FOLDER TAB HEADER */}
      <div className="absolute -top-6 left-5 bg-[#E8ECEA] px-4 py-1.5 rounded-t-xl border-2 border-[#1C3F24] border-b-0 flex items-center gap-2 select-none">
        <span className="bg-[#E2EF37] text-[#1C3F24] text-[10px] font-black px-2 py-0.5 rounded border border-[#1C3F24]">
          STEP 01
        </span>
        <span className="text-xs font-black text-[#1C3F24]">구인공고 심층 분석</span>
      </div>

      {/* SECTION HEADER CONTENT */}
      <div className="flex items-center gap-3 mb-5 border-b-2 border-dashed border-[#CFDDD3] pb-4 pt-1">
        <div className="p-2 bg-[#1C3F24] text-[#E2EF37] rounded-xl">
          <Briefcase className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-black text-[#1C3F24] flex items-center gap-2">
            1단계: 공고 심층 분석
          </h2>
          <p className="text-[11px] text-[#2A5235] font-semibold">회사측 구인공고에서 무엇을 핵심적으로 요구하고 있는지 알아냅니다</p>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="bg-[#E8ECEA] rounded-xl p-4 mb-6 border border-[#CFDDD3]">
        <h3 className="text-xs font-black text-[#1C3F24] mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
          <Info className="w-4 h-4 text-[#1C3F24]" />
          공고 한 줄 요약
        </h3>
        <p className="text-[#1C3F24] text-xs leading-relaxed font-bold">{analysis.summary}</p>
      </div>

      {/* KEYWORDS SPLIT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* HARD SKILLS */}
        <div className="bg-[#FAFBF9] rounded-xl p-4 border-2 border-[#1C3F24]/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2.5 text-[#1C3F24] font-black text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1C3F24] border border-[#FAFBF9]"></span>
              전문 직무 역량 <span className="text-[10px] font-bold text-[#2A5235] bg-[#E8ECEA] px-1.5 py-0.5 rounded">(하드 스킬)</span>
            </div>
            <p className="text-[11px] text-[#2A5235] mb-3 leading-tight font-semibold break-keep">
              실무를 직접 하는 데 쓰이는 실질적 도구 사용법, 지식, 자격 및 컴퓨터 능력입니다.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {analysis.hardSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1.5 bg-[#E8ECEA] border border-[#CFDDD3] text-[#1C3F24] rounded-lg text-[11px] font-extrabold hover:bg-[#E2EF37] hover:border-[#1C3F24] transition-all"
                >
                  {skill}
                </span>
              ))}
              {analysis.hardSkills.length === 0 && (
                <span className="text-xs text-[#2A5235] italic font-semibold">공고 등에서 추출된 내용이 없습니다.</span>
              )}
            </div>
          </div>
        </div>

        {/* SOFT SKILLS */}
        <div className="bg-[#FAFBF9] rounded-xl p-4 border-2 border-[#1C3F24]/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2.5 text-[#1C3F24] font-black text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E2EF37] border border-[#1C3F24]"></span>
              근무 행동 역량 <span className="text-[10px] font-bold text-[#2A5235] bg-[#E8ECEA] px-1.5 py-0.5 rounded">(소프트 스킬)</span>
            </div>
            <p className="text-[11px] text-[#2A5235] mb-3 leading-tight font-semibold break-keep">
              팀원과의 부드러운 소통, 공동 작업, 문제 해결, 끈기 등 사람 대 사람으로서의 태도 역량입니다.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {analysis.softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1.5 bg-[#FAFBF9] border-2 border-[#1C3F24]/30 text-[#1C3F24] rounded-lg text-[11px] font-black hover:bg-[#E2EF37] hover:border-[#1C3F24] transition-all"
                >
                  {skill}
                </span>
              ))}
              {analysis.softSkills.length === 0 && (
                <span className="text-xs text-[#2A5235] italic font-semibold">공고 등에서 추출된 내용이 없습니다.</span>
              )}
            </div>
          </div>
        </div>

        {/* CULTURE / VALUES */}
        <div className="bg-[#FAFBF9] rounded-xl p-4 border-2 border-[#1C3F24]/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-2.5 text-[#1C3F24] font-black text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1C3F24] animate-pulse"></span>
              회사 분위기 궁합 <span className="text-[10px] font-bold text-[#2A5235] bg-[#E8ECEA] px-1.5 py-0.5 rounded">(인재상 키워드)</span>
            </div>
            <p className="text-[11px] text-[#2A5235] mb-3 leading-tight font-semibold break-keep">
              이 기업이 가장 아끼고 자랑하며 일하는 방식과 중요하게 여기는 핵심 가치관입니다.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {analysis.cultureKeywords.map((tag, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1.5 bg-[#E2EF37]/30 border border-[#1C3F24] text-[#1C3F24] rounded-lg text-[11px] font-black hover:bg-[#E2EF37] transition-all"
                >
                  🌟 {tag}
                </span>
              ))}
              {analysis.cultureKeywords.length === 0 && (
                <span className="text-xs text-[#2A5235] italic font-semibold">공고 등에서 추출된 키워드가 없습니다.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

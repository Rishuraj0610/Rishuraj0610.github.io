import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  Code,
  Server,
  Cpu,
  GraduationCap,
  CheckCircle2,
  Calendar,
} from 'lucide-react';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-24 relative border-t-2 border-[#111111] bg-[#ebebea] text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="editorial-pill">
              <b>04</b> ENGINEERING TIMELINE
            </span>
            <span className="stamp-badge bg-white text-[11px]">
              BATCH 2023–2027 @
            </span>
            <span className="stamp-badge bg-[#5fb57a] text-[10px]">
              FINAL YEAR: 2027 @
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl text-[#111111] uppercase tracking-tight leading-[1.05]">
            LEARNING &amp; DEVELOPMENT JOURNEY*
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#444444] font-medium">
            A transparent progression from foundational computer science theory to production-grade backend engineering and generative AI.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-[#111111] ml-4 sm:ml-8 space-y-12">
          {PORTFOLIO_DATA.journey.map((item, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-10 group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#5fb57a] border-2 border-[#111111] flex items-center justify-center font-display text-xs text-[#111111] shadow-[2px_2px_0px_#111111]">
                {idx + 1}
              </div>

              {/* Card Container */}
              <div className="neo-box rounded-xl bg-white p-6 sm:p-8">
                {/* Header Info */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b-[1.5px] border-[#111111]">
                  <div className="flex items-center gap-2">
                    <span className="editorial-pill">
                      <b>PHASE</b> {item.badge}
                    </span>
                  </div>
                  <span className="text-xs font-mono-code font-bold text-[#111111] flex items-center gap-1.5 bg-[#f5f5f4] px-2.5 py-1 rounded border border-[#111111]">
                    <Calendar className="w-3.5 h-3.5 text-[#5fb57a]" />
                    {item.period}
                  </span>
                </div>

                <h3 className="font-display text-xl sm:text-2xl uppercase text-[#111111] tracking-tight mb-1">
                  {item.title}
                </h3>

                <p className="text-xs font-mono-code font-bold text-[#5fb57a] bg-[#111111] px-2.5 py-1 rounded w-fit mb-3">
                  Focus: {item.focus}
                </p>

                <p className="text-sm text-[#333333] font-medium leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 pt-3 border-t-[1.5px] border-[#111111]">
                  <span className="text-[11px] font-mono-code uppercase text-[#111111] font-extrabold tracking-wider block mb-1.5">
                    Milestones &amp; Outcomes:
                  </span>
                  {item.highlights.map((hl, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2 text-xs text-[#222222] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#5fb57a] shrink-0 mt-0.5 stroke-[2.5]" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

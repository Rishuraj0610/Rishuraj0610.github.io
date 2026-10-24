import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, Code2 } from 'lucide-react';

export const Experience: React.FC = () => {
  const { internship } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-24 relative border-t-2 border-[#111111] bg-[#ebebea] text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="editorial-pill">
              <b>EXPERIENCE</b> INDUSTRY INTERNSHIP
            </span>
            <span className="stamp-badge bg-white text-[11px]">
              PYTHON DEVELOPER @
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl text-[#111111] uppercase tracking-tight leading-[1.05]">
            WORK &amp; INTERNSHIP EXPERIENCE*
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#444444] font-medium">
            Practical software engineering experience delivering modular machine learning applications in an Agile team.
          </p>
        </div>

        {/* CodSoft Internship Experience Card */}
        <div className="neo-box rounded-2xl bg-white p-6 sm:p-10 shadow-[6px_6px_0px_#111111]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-[1.5px] border-[#111111]">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#5fb57a] border-2 border-[#111111] flex items-center justify-center text-[#111111] shrink-0 shadow-[2.5px_2.5px_0px_#111111]">
                <Briefcase className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="editorial-pill">
                    <b>{internship.company}</b>
                  </span>
                  <span className="stamp-badge bg-[#fafaf8] text-[10px]">
                    {internship.type} @
                  </span>
                </div>
                <h3 className="font-display text-2xl uppercase text-[#111111] tracking-tight">
                  {internship.role}
                </h3>
                <p className="text-xs sm:text-sm text-[#444444] font-semibold mt-1">
                  Remote Agile Engineering Environment
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5 font-mono-code text-xs text-[#111111] shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#fafaf8] border-[1.5px] border-[#111111] font-bold shadow-[1.5px_1.5px_0px_#111111]">
                <Calendar className="w-3.5 h-3.5 text-[#5fb57a]" />
                <span>{internship.period}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#555555] font-bold mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#111111]" />
                <span>{internship.location}</span>
              </div>
            </div>
          </div>

          {/* Highlights & Metrics */}
          <div className="pt-6 space-y-3">
            <span className="text-xs font-mono-code uppercase text-[#111111] font-extrabold tracking-wider block mb-2">
              Key Contributions &amp; Business Impact:
            </span>
            <div className="space-y-2.5">
              {internship.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-[#fafaf8] border-[1.5px] border-[#111111] text-xs sm:text-sm text-[#222222] font-semibold shadow-[1.5px_1.5px_0px_#111111]">
                  <CheckCircle2 className="w-4 h-4 text-[#5fb57a] shrink-0 mt-0.5 stroke-[2.5]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack pills */}
          <div className="pt-6 mt-6 border-t-[1.5px] border-[#111111] flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono-code font-extrabold text-[#555555] mr-2">
              APPLIED TECHNOLOGIES:
            </span>
            {internship.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded text-[11px] font-mono-code font-bold bg-[#f5f5f4] text-[#111111] border border-[#111111]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap, MapPin, Calendar, BookOpen, Award } from 'lucide-react';

export const Education: React.FC = () => {
  const { education } = PORTFOLIO_DATA;

  return (
    <section id="education" className="py-24 relative border-t-2 border-[#111111] bg-[#ebebea] text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="editorial-pill">
              <b>05</b> ACADEMIC CREDENTIALS
            </span>
            <span className="stamp-badge bg-white text-[11px]">
              BATCH 2023–2027 &bull; CGPA: {education.cgpa} @
            </span>
            <span className="stamp-badge bg-[#5fb57a] text-[10px]">
              AKTU &bull; DR. APJ ABDUL KALAM TECH UNIV @
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl text-[#111111] uppercase tracking-tight leading-[1.05]">
            FORMAL EDUCATION*
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#444444] font-medium">
            B.Tech in Computer Science and Engineering (Batch 2023–2027, graduating in 2027) with core foundations in operating systems, DBMS, computer networks, algorithms, and software engineering.
          </p>
        </div>

        {/* Education Card */}
        <div className="max-w-4xl neo-box rounded-2xl bg-white p-6 sm:p-10 shadow-[6px_6px_0px_#111111]">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b-[1.5px] border-[#111111]">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#5fb57a] border-2 border-[#111111] flex items-center justify-center text-[#111111] shrink-0 shadow-[2.5px_2.5px_0px_#111111]">
                <GraduationCap className="w-7 h-7 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[#111111] bg-[#fafaf8] px-2 py-0.5 rounded border border-[#111111]">
                    Undergraduate &bull; Batch 2023–2027
                  </span>
                  <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[#111111] bg-[#5fb57a] px-2 py-0.5 rounded border border-[#111111]">
                    CGPA: {education.cgpa}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl uppercase text-[#111111] tracking-tight mt-1.5">
                  {education.degree} in {education.major}
                </h3>
                <p className="text-base font-bold text-[#111111] mt-1">
                  {education.institution}
                </p>
                <p className="text-xs text-[#555555] font-semibold">
                  Affiliated with {education.affiliation} &bull; Final Year: 2027
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5 font-mono-code text-xs text-[#111111] shrink-0">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#fafaf8] border-[1.5px] border-[#111111] font-bold shadow-[1.5px_1.5px_0px_#111111]">
                <Calendar className="w-3.5 h-3.5 text-[#5fb57a]" />
                <span>{education.duration}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#555555] font-bold mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#111111]" />
                <span>{education.location}</span>
              </div>
            </div>
          </div>

          {/* Key Coursework Grid */}
          <div className="pt-6">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-wider text-[#111111] font-extrabold mb-3">
              <BookOpen className="w-4 h-4 text-[#5fb57a]" />
              <span>Core Computer Science Disciplines</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {education.keyCourses.map((course, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-[#fafaf8] border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] text-xs text-[#111111] font-bold"
                >
                  {course}
                </div>
              ))}
            </div>
          </div>

          {/* Academic Highlights */}
          <div className="pt-6 mt-6 border-t-[1.5px] border-[#111111] space-y-2">
            <div className="text-xs font-mono-code uppercase tracking-wider text-[#111111] font-extrabold mb-1 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#5fb57a]" />
              <span>Academic Experience Highlights</span>
            </div>
            {education.highlights.map((hl, idx) => (
              <p key={idx} className="text-xs text-[#333333] font-semibold leading-relaxed flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#5fb57a] border border-[#111111] shrink-0" />
                <span>{hl}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

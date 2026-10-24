import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  Server,
  Cpu,
  Database,
  Code2,
  GraduationCap,
  MapPin,
  ShieldCheck,
  Terminal,
} from 'lucide-react';

export const About: React.FC = () => {
  const { personal, about } = PORTFOLIO_DATA;

  const focusIcons = [
    <Server className="w-5 h-5 text-[#111111]" />,
    <Cpu className="w-5 h-5 text-[#111111]" />,
    <Database className="w-5 h-5 text-[#111111]" />,
    <Code2 className="w-5 h-5 text-[#111111]" />,
  ];

  return (
    <section id="about" className="py-24 relative border-t-2 border-[#111111] bg-[#ebebea] text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl mb-14">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="editorial-pill">
              <b>01</b> ABOUT CANDIDATE
            </span>
            <span className="stamp-badge bg-white text-[11px]">
              BATCH 2023–2027 &bull; CGPA 8.21/10 @
            </span>
            <span className="stamp-badge bg-[#5fb57a] text-[10px]">
              CODSOFT PYTHON INTERN @
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl text-[#111111] uppercase tracking-tight leading-[1.05]">
            ENGINEERING PRINCIPLES &amp; TECHNICAL DISCIPLINE*
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#444444] font-medium leading-relaxed">
            Computer Science and Engineering undergraduate (2027 batch) with hands-on experience building Generative AI, multi-agent autonomous systems, RAG pipelines, and scalable backend REST APIs.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Bio narrative */}
          <div className="lg:col-span-7 space-y-5 text-[#222222] leading-relaxed text-sm sm:text-base">
            <div className="neo-box p-6 sm:p-8 rounded-xl bg-white space-y-4">
              {about.paragraphs.map((p, idx) => (
                <p key={idx} className="text-[#333333] font-medium leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Credential summary card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono-code text-xs">
              <div className="p-4 rounded-xl bg-white border-[1.5px] border-[#111111] shadow-[3px_3px_0px_#111111] flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-[#5fb57a] mt-0.5 shrink-0 stroke-[2.5]" />
                <div>
                  <span className="text-[#666666] block text-[10px] uppercase font-bold">Degree &amp; CGPA</span>
                  <span className="text-[#111111] font-bold text-xs">{personal.degree}</span>
                  <span className="text-[#444444] block text-[11px] font-semibold">{personal.batch} &bull; CGPA: {personal.cgpa}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border-[1.5px] border-[#111111] shadow-[3px_3px_0px_#111111] flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#5fb57a] mt-0.5 shrink-0 stroke-[2.5]" />
                <div>
                  <span className="text-[#666666] block text-[10px] uppercase font-bold">Institution &amp; Region</span>
                  <span className="text-[#111111] font-bold text-xs">{personal.college}</span>
                  <span className="text-[#444444] block text-[11px] font-semibold">{personal.location}</span>
                </div>
              </div>
            </div>

            {/* Candidate Integrity Notice */}
            <div className="p-4 rounded-xl bg-[#fafaf8] border-[1.5px] border-[#111111] flex items-center gap-3 text-xs text-[#222222] font-medium shadow-[2px_2px_0px_#111111]">
              <ShieldCheck className="w-5 h-5 text-[#5fb57a] shrink-0 stroke-[2.5]" />
              <span>
                All projects represent authentic, verifiable code authored by me with public Git commit histories ready for code review.
              </span>
            </div>
          </div>

          {/* Right: Core Focus Pillars */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#111111] font-extrabold mb-1 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#5fb57a]" />
              <span>Core Areas of Specialization</span>
            </h3>

            {about.focusAreas.map((area, idx) => (
              <div
                key={idx}
                className="neo-box p-4 rounded-xl bg-white hover:bg-[#fafaf8] transition-all group"
              >
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[#5fb57a] border-[1.5px] border-[#111111] flex items-center justify-center shrink-0 shadow-[1.5px_1.5px_0px_#111111]">
                    {focusIcons[idx % focusIcons.length]}
                  </div>
                  <h4 className="font-display text-sm uppercase text-[#111111] tracking-tight">
                    {area.title}
                  </h4>
                </div>
                <p className="text-xs text-[#444444] font-medium leading-relaxed pl-11">
                  {area.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

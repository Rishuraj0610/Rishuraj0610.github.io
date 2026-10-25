import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  Github,
  Linkedin,
  Code2,
  Terminal,
  ArrowRight,
} from 'lucide-react';

export const CodingProfiles: React.FC = () => {
  const getIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5 text-[#111111]" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5 text-[#111111]" />;
      case 'leetcode':
        return <Code2 className="w-5 h-5 text-[#111111]" />;
      default:
        return <Terminal className="w-5 h-5 text-[#111111]" />;
    }
  };

  return (
    <section id="profiles" className="py-24 relative text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="editorial-pill">
              <b>07</b> ONLINE PROFILES
            </span>
            <span className="stamp-badge bg-white text-[11px]">
              GITHUB &bull; LEETCODE &bull; GFG @
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl text-[#111111] uppercase tracking-tight leading-[1.05]">
            CODING PROFILES &amp; PRESENCE*
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#444444] font-medium">
            Inspect source repositories, algorithmic problem-solving practice, and professional networks directly.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTFOLIO_DATA.codingProfiles.map((profile) => (
            <div
              key={profile.platform}
              className="neo-box tech-bracket p-6 rounded-xl bg-white flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b-[1.5px] border-[#111111]">
                  <div className="w-10 h-10 rounded-lg bg-[#5fb57a] border-[1.5px] border-[#111111] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#111111]">
                    {getIcon(profile.platform)}
                  </div>
                  <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded bg-[#f5f5f4] text-[#111111] border border-[#111111]">
                    {profile.handle}
                  </span>
                </div>

                <h3 className="font-display text-xl uppercase text-[#111111] tracking-tight mb-1">
                  {profile.platform}
                </h3>

                <p className="text-xs font-mono-code font-bold text-[#5fb57a] bg-[#111111] px-2 py-0.5 rounded w-fit mb-3">
                  {profile.stats}
                </p>

                <p className="text-xs text-[#444444] font-medium leading-relaxed mb-6">
                  {profile.description}
                </p>
              </div>

              <div className="pt-3 border-t-[1.5px] border-[#111111]">
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#f5f5f4] hover:bg-[#5fb57a] text-[#111111] text-xs font-bold uppercase transition-colors"
                >
                  <span>Visit {profile.platform}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

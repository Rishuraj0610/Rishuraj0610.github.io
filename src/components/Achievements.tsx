import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  Award,
  Cloud,
  Code,
  ExternalLink,
  Trophy,
  CheckCircle2,
  FileBadge,
} from 'lucide-react';

export const Achievements: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'certifications' | 'achievements'>('all');

  const { certifications, achievements } = PORTFOLIO_DATA;

  return (
    <section id="achievements" className="py-24 relative text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="editorial-pill">
              <b>06</b> CREDENTIALS &amp; HONORS
            </span>
            <span className="stamp-badge bg-white text-[11px]">
              SERVICENOW &bull; GCP &bull; UDACITY @
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl text-[#111111] uppercase tracking-tight leading-[1.05]">
            CERTIFICATIONS &amp; ACHIEVEMENTS*
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#444444] font-medium">
            Verified credentials from ServiceNow, Google Cloud, Udacity, and Deloitte alongside algorithmic problem-solving milestones.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b-[1.5px] border-[#111111]">
          <button
            onClick={() => setActiveTab('all')}
            className={`neo-btn px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
              activeTab === 'all'
                ? 'bg-[#5fb57a] text-[#111111]'
                : 'bg-white text-[#111111] hover:bg-[#f5f5f4]'
            }`}
          >
            All Credentials ({certifications.length + achievements.length})
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`neo-btn px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
              activeTab === 'certifications'
                ? 'bg-[#5fb57a] text-[#111111]'
                : 'bg-white text-[#111111] hover:bg-[#f5f5f4]'
            }`}
          >
            Certifications ({certifications.length})
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`neo-btn px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
              activeTab === 'achievements'
                ? 'bg-[#5fb57a] text-[#111111]'
                : 'bg-white text-[#111111] hover:bg-[#f5f5f4]'
            }`}
          >
            Achievements ({achievements.length})
          </button>
        </div>

        {/* 1. Official Certifications */}
        {(activeTab === 'all' || activeTab === 'certifications') && (
          <div className="mb-14">
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#111111] font-extrabold mb-4 flex items-center gap-2">
              <FileBadge className="w-4 h-4 text-[#5fb57a]" />
              <span>Official Professional Certifications &amp; Virtual Internships</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="neo-box tech-bracket p-6 rounded-xl bg-white flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b-[1.5px] border-[#111111]">
                      <span className="editorial-pill">
                        <b>{cert.year}</b> {cert.credentialType}
                      </span>
                      <span className="stamp-badge bg-[#5fb57a] text-[10px]">
                        VERIFIED @
                      </span>
                    </div>

                    <h4 className="font-display text-lg uppercase text-[#111111] tracking-tight mb-1">
                      {cert.title}
                    </h4>

                    <p className="text-xs font-mono-code font-bold text-[#555555] mb-3">
                      Issuer: {cert.issuer}
                    </p>

                    <p className="text-xs sm:text-sm text-[#333333] font-medium leading-relaxed mb-4">
                      {cert.details}
                    </p>
                  </div>

                  <div className="pt-3 border-t-[1.5px] border-[#111111] flex items-center justify-between text-xs font-mono-code font-bold text-[#555555]">
                    <span>STATUS: Completed</span>
                    <span className="text-[#111111] bg-[#f5f5f4] px-2.5 py-0.5 rounded border border-[#111111]">&check; Certificate on File</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Key Achievements & Milestones */}
        {(activeTab === 'all' || activeTab === 'achievements') && (
          <div>
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#111111] font-extrabold mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#5fb57a]" />
              <span>Technical Milestones &amp; Impact</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((item) => (
                <div
                  key={item.id}
                  className="neo-box tech-bracket p-6 rounded-xl bg-white flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b-[1.5px] border-[#111111]">
                      <span className="text-[10px] font-mono-code font-bold uppercase px-2 py-0.5 rounded bg-[#f5f5f4] border border-[#111111] text-[#111111]">
                        {item.category}
                      </span>
                      <span className="stamp-badge bg-[#fafaf8] text-[9px]">
                        {item.date} @
                      </span>
                    </div>

                    <h4 className="font-display text-base uppercase text-[#111111] tracking-tight mb-2">
                      {item.title}
                    </h4>

                    <p className="text-xs text-[#444444] font-medium leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t-[1.5px] border-[#111111] flex items-center justify-between text-xs font-mono-code font-bold text-[#555555]">
                    <span>{item.issuer}</span>
                    {item.credentialUrl && (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#111111] hover:text-[#5fb57a] underline"
                      >
                        <span>Profile</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

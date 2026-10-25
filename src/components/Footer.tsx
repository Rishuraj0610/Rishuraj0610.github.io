import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Terminal, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="text-[#111111] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b-[1.5px] border-[#111111]">
          {/* Brand Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#5fb57a] border-[1.5px] border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111]">
                <Terminal className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-display text-xl uppercase tracking-tight text-[#111111]">
                {PORTFOLIO_DATA.personal.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#444444] font-medium max-w-sm">
              Software Engineer &bull; Backend &amp; Generative AI Developer
            </p>
            <p className="text-[11px] font-mono-code font-bold text-[#555555]">
              B.Tech CSE (Batch 2023–2027) &bull; {PORTFOLIO_DATA.personal.college} (AKTU)
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs font-bold uppercase tracking-wider text-[#111111]">
            <a href="#about" className="hover:text-[#5fb57a] hover:underline transition-colors">
              About
            </a>
            <a href="#skills" className="hover:text-[#5fb57a] hover:underline transition-colors">
              Skills
            </a>
            <a href="#projects" className="hover:text-[#5fb57a] hover:underline transition-colors">
              Projects
            </a>
            <a href="#journey" className="hover:text-[#5fb57a] hover:underline transition-colors">
              Journey
            </a>
            <a href="#education" className="hover:text-[#5fb57a] hover:underline transition-colors">
              Education
            </a>
            <a href="#blog" className="hover:text-[#5fb57a] hover:underline transition-colors">
              Blog
            </a>
            <a href="#contact" className="hover:text-[#5fb57a] hover:underline transition-colors">
              Contact
            </a>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#111111] hover:bg-[#5fb57a] transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 stroke-[2.5]" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#111111] hover:bg-[#5fb57a] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 stroke-[2.5]" />
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="neo-btn w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#111111] hover:bg-[#5fb57a] transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 stroke-[2.5]" />
            </a>
            <button
              onClick={scrollToTop}
              className="neo-btn p-2 rounded-lg bg-[#5fb57a] text-[#111111] font-bold"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Bottom copyright & integrity line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-code font-bold text-[#555555]">
          <div>
            &copy; {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5fb57a] border border-[#111111]" />
            <span className="text-[#111111]">
              Engineered with React, TypeScript &amp; Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

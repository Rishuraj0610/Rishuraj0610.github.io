import React from 'react';
import MascotPortfolioHero from '@/components/ui/mascot-portfolio-hero';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  FileText,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Award,
  Github,
  Linkedin,
} from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
  mascotMode?: boolean;
  onToggleMascotMode?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {

  const heroProps = {
    height: '100svh',
    minHeight: '520px',
    index: '2023–27',
    discipline: 'Computer Science & Engineering',
    tagline: 'Autonomous AI Copilots & Enterprise Backends',
    collection: ['CGPA: 8.21', 'Class of 2027'] as [string, string],
    reel: ['Rishu Raj • Software Engineer', 'NIET (AKTU), Greater Noida'] as [string, string],
    year: 'RISHU',
    initials: 'RAJ',
    badge: 'B.TECH CSE',
    line2: 'SOFTWARE',
    line3: 'ENGINEER',
    word: 'BACKEND',
    verticalTag: 'SYSTEMS',
    bracketed: 'AI',
    seekingLabel: 'ROLE FOCUS*',
    seeking: 'Software & AI Engineering Roles',
    href: '#projects',
    services: [
      'GrowthPilot AI (LangGraph)',
      'DocuMind Hybrid RAG',
      'StutterCare AI (Groq)',
      'CodSoft Python ML Suite',
      'CodeGuard AST Scanner',
      'SmartCampus NIET Hub',
    ],
    greetings: [
      "Hello! I'm Rishu Raj.",
      "Software Engineer specializing in Agentic AI & Systems.",
      "B.Tech CSE student (2023–2027) with an 8.21 CGPA at NIET.",
      "Actively exploring Software Engineering & AI Developer roles.",
    ],
    paper: '#ebebea',
    ink: '#111111',
    accent: '#5fb57a',
    skin: '#f7cfb0',
    beanie: '#1d1d1f',
    shirt: '#18181a',
    tag: '#b98158',
  };

  return (
    <section id="hero" className="relative w-full overflow-hidden">
      {/* 1. THE EXACT 21ST.DEV MASCOT PORTFOLIO HERO COMPONENT (RISHU RAJ 2027 PAPER STYLE) */}
      <div className="relative w-full min-h-[100svh]">
        <MascotPortfolioHero {...heroProps} />

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none hidden md:flex flex-col items-center gap-1 text-[11px] font-mono-code text-[#111111]">
          <span className="bg-white/90 px-3 py-1 rounded-full border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] font-bold uppercase">
            Scroll down for Verified Resume &amp; Projects &darr;
          </span>
        </div>
      </div>

      {/* 2. RECRUITER SPOTLIGHT & INTERACTIVE ARCHITECTURE CONSOLE (21ST.DEV POSTER STYLE) */}
      <div className="relative text-[#111111] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Engineering Technical Status Strip */}
          <div className="mb-6 p-2.5 rounded-lg bg-white border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono-code font-bold">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5fb57a] border border-[#111111] animate-pulse" />
              <span className="uppercase text-[#111111]">SYS_STATUS: ACTIVE</span>
              <span className="text-[#888888]">/</span>
              <span className="text-[#444444]">B.TECH CSE 2023–2027</span>
              <span className="text-[#888888]">/</span>
              <span className="text-[#444444]">NIET (AKTU)</span>
            </div>
            <div className="flex items-center gap-3 text-[#555555]">
              <span className="hidden sm:inline">GEO: 28.4744° N, 77.5040° E</span>
              <span className="text-[#888888] hidden sm:inline">/</span>
              <span className="text-[#111111] bg-[#5fb57a]/30 px-2 py-0.5 rounded border border-[#111111]">
                OPEN TO OPPORTUNITIES
              </span>
            </div>
          </div>

          {/* Headline Banner */}
          <div className="max-w-4xl mb-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="editorial-pill">
                  <b>00</b> CANDIDATE DOSSIER
                </span>
                <span className="stamp-badge text-[11px] bg-white">
                  BATCH 2023–2027 &bull; CGPA 8.21 @
                </span>
                <span className="stamp-badge text-[10px] bg-[#5fb57a]">
                  GCP ARCADE FACILITATOR 2025 @
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl text-[#111111] uppercase tracking-tight leading-[1.05]">
                AGENTIC AI COPILOTS &amp; ENTERPRISE BACKENDS*
              </h2>

              <p className="text-sm sm:text-base text-[#333333] leading-relaxed font-medium">
                Computer Science &amp; Engineering undergraduate at{' '}
                <strong className="text-[#111111] underline decoration-[#5fb57a] decoration-2">
                  Noida Institute of Engineering and Technology (NIET, Greater Noida)
                </strong>{' '}
                (2023–2027 batch, CGPA 8.21/10). Experienced in orchestrating multi-agent state graphs using LangGraph &amp; Groq LLaMA 3.3 70B, building hybrid RAG (BM25 + Cosine) in ChromaDB, and developing REST APIs.
              </p>

              {/* Direct Candidate Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-code text-[#222222] pt-1">
                <div className="p-2.5 rounded bg-white border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center gap-2 font-bold">
                  <MapPin className="w-3.5 h-3.5 text-[#5fb57a] shrink-0 stroke-[2.5]" />
                  <span>Greater Noida, India</span>
                </div>
                <div className="p-2.5 rounded bg-white border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center gap-2 font-bold">
                  <Phone className="w-3.5 h-3.5 text-[#5fb57a] shrink-0 stroke-[2.5]" />
                  <a href="tel:+916204405855" className="hover:underline">+91-6204405855</a>
                </div>
                <div className="p-2.5 rounded bg-white border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center gap-2 font-bold">
                  <Mail className="w-3.5 h-3.5 text-[#5fb57a] shrink-0 stroke-[2.5]" />
                  <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="hover:underline truncate">{PORTFOLIO_DATA.personal.email}</a>
                </div>
                <div className="p-2.5 rounded bg-white border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] flex items-center gap-2 font-bold">
                  <Award className="w-3.5 h-3.5 text-[#5fb57a] shrink-0 stroke-[2.5]" />
                  <span>200+ Solved (LeetCode &amp; GFG)</span>
                </div>
              </div>

              {/* Recruiter Trust Points */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono-code text-[#222222] pt-1">
                <div className="p-2 rounded bg-white border-[1.5px] border-[#111111] shadow-[1.5px_1.5px_0px_#111111] flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5fb57a] shrink-0 stroke-[2.5]" />
                  <span className="truncate">LangGraph 4-Agent</span>
                </div>
                <div className="p-2 rounded bg-white border-[1.5px] border-[#111111] shadow-[1.5px_1.5px_0px_#111111] flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5fb57a] shrink-0 stroke-[2.5]" />
                  <span className="truncate">Hybrid BM25 + Cosine</span>
                </div>
                <div className="p-2 rounded bg-white border-[1.5px] border-[#111111] shadow-[1.5px_1.5px_0px_#111111] flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5fb57a] shrink-0 stroke-[2.5]" />
                  <span className="truncate">Groq LLaMA 3.3 70B</span>
                </div>
                <div className="p-2 rounded bg-white border-[1.5px] border-[#111111] shadow-[1.5px_1.5px_0px_#111111] flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#5fb57a] shrink-0 stroke-[2.5]" />
                  <span className="truncate">CodSoft Python Intern</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href="#projects"
                  className="neo-btn px-5 py-2.5 rounded-full bg-[#5fb57a] hover:bg-[#4ea569] text-[#111111] font-bold text-xs uppercase tracking-wider"
                >
                  Inspect Projects &rarr;
                </a>
                <button
                  onClick={onOpenResume}
                  className="neo-btn px-5 py-2.5 rounded-full bg-white hover:bg-[#f5f5f4] text-[#111111] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#111111]" />
                  <span>Resume (PDF)</span>
                </button>
                <a
                  href={PORTFOLIO_DATA.personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn px-4 py-2.5 rounded-full bg-white hover:bg-[#f5f5f4] text-[#111111] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                  title="GitHub Profile"
                >
                  <Github className="w-3.5 h-3.5 text-[#111111]" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-btn px-4 py-2.5 rounded-full bg-white hover:bg-[#f5f5f4] text-[#111111] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#111111]" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { ProjectModal } from './ProjectModal';
import {
  Github,
  ExternalLink,
  Search,
  ArrowRight,
  Users,
} from 'lucide-react';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (activeCategory !== 'All' && p.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim() === '') return true;

    return (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <section id="projects" className="py-24 relative border-t-2 border-[#111111] bg-[#ebebea] text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="editorial-pill">
                <b>03</b> SELECTED WORKS
              </span>
              <span className="stamp-badge bg-white text-[11px]">
                {PORTFOLIO_DATA.projects.length} VERIFIED PROJECTS @
              </span>
              <span className="stamp-badge bg-[#5fb57a] text-[10px]">
                BATCH 2023–2027 @
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl text-[#111111] uppercase tracking-tight leading-[1.05]">
              PRODUCTION SOFTWARE &amp; AGENTIC BUILDS*
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#444444] font-medium">
              Multi-agent autonomous systems (LangGraph &amp; Groq LLaMA 3.3 70B), hybrid RAG retrieval engines, AST vulnerability scanners, and campus architectures engineered for 1,200+ users.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-[#111111] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by tech, e.g. LangGraph, Groq, RAG..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-white border-[1.5px] border-[#111111] shadow-[2.5px_2.5px_0px_#111111] text-xs font-mono-code font-bold text-[#111111] placeholder-[#777777] focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b-[1.5px] border-[#111111]">
          {['All', 'Agentic AI', 'AI / GenAI', 'Full-Stack', 'Backend'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`neo-btn px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
                activeCategory === cat
                  ? 'bg-[#5fb57a] text-[#111111]'
                  : 'bg-white text-[#111111] hover:bg-[#f5f5f4]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Spotlight 1: GrowthPilot AI (Multi-Agent Commerce Copilot) */}
        {filteredProjects.some((p) => p.id === 'growthpilot-ai') && (
          <div className="mb-12 rounded-2xl border-2 border-[#111111] bg-white p-6 sm:p-10 shadow-[6px_6px_0px_#111111] relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-12 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="editorial-pill">
                    <b>AGENTIC AI</b> LANGGRAPH &bull; GROQ 70B
                  </span>
                  <span className="stamp-badge bg-[#5fb57a] text-[10px]">
                    4 AUTONOMOUS AGENTS @
                  </span>
                  <span className="stamp-badge bg-white text-[10px]">
                    2026 @
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl text-[#111111] uppercase tracking-tight">
                  GrowthPilot AI: Multi-Agent Commerce Copilot
                </h3>

                <p className="text-sm sm:text-base text-[#333333] leading-relaxed font-medium">
                  Architected an agentic AI system orchestrating four specialized autonomous agents (Discovery, Personalization, Cart Recovery, Analytics) using LangGraph state graphs and Groq LLaMA 3.3 70B to automate an end-to-end commerce workflow.
                </p>

                {/* Architecture Highlights */}
                <div className="p-4 rounded-xl bg-[#fafaf8] border-[1.5px] border-[#111111] text-xs space-y-2 font-mono-code shadow-[2px_2px_0px_#111111]">
                  <div className="flex items-start gap-2 text-[#222222]">
                    <span className="bg-[#ffbd2e] text-[#111111] px-1.5 py-0.5 rounded font-bold shrink-0">CHALLENGE</span>
                    <span>Single-prompt AI systems fail at complex stateful decision trees and multi-step customer journeys.</span>
                  </div>
                  <div className="flex items-start gap-2 text-[#222222]">
                    <span className="bg-[#5fb57a] text-[#111111] px-1.5 py-0.5 rounded font-bold shrink-0">SOLUTION</span>
                    <span>LangGraph cyclic state graph with ChromaDB semantic search &amp; HuggingFace embeddings for context-grounded agent actions.</span>
                  </div>
                </div>

                {/* 4 Agent Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-mono-code font-bold">
                  <div className="p-2 rounded bg-white border border-[#111111] text-center">
                    <span className="text-[#5fb57a] block text-[9px]">AGENT 01</span>
                    <span className="truncate">Discovery</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-[#111111] text-center">
                    <span className="text-[#5fb57a] block text-[9px]">AGENT 02</span>
                    <span className="truncate">Personalization</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-[#111111] text-center">
                    <span className="text-[#5fb57a] block text-[9px]">AGENT 03</span>
                    <span className="truncate">Cart Recovery</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-[#111111] text-center">
                    <span className="text-[#5fb57a] block text-[9px]">AGENT 04</span>
                    <span className="truncate">Analytics</span>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {[
                    'Python',
                    'LangGraph',
                    'LangChain',
                    'Groq (LLaMA 3.3 70B)',
                    'ChromaDB',
                    'HuggingFace Embeddings',
                    'Streamlit',
                    'RAG',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded text-[11px] font-mono-code font-bold bg-[#f5f5f4] text-[#111111] border border-[#111111]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    onClick={() =>
                      setSelectedProject(
                        PORTFOLIO_DATA.projects.find((p) => p.id === 'growthpilot-ai') || null
                      )
                    }
                    className="neo-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5fb57a] hover:bg-[#4ea569] text-[#111111] font-bold text-xs uppercase tracking-wider"
                  >
                    <span>View Agent Blueprint &amp; Architecture</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://github.com/Rishuraj0610/growthpilot-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-[#f5f5f4] text-[#111111] font-bold text-xs uppercase"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repo</span>
                  </a>

                  <a
                    href="https://growthpilot-ai.preview.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-[#f5f5f4] text-[#111111] font-bold text-xs uppercase"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Spotlight 2: DocuMind (Full-Stack Hybrid RAG & NLP Suite) */}
        {filteredProjects.some((p) => p.id === 'documind-ai') && (
          <div className="mb-14 rounded-2xl border-2 border-[#111111] bg-white p-6 sm:p-10 shadow-[6px_6px_0px_#111111] relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-12 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="editorial-pill">
                    <b>FULL-STACK RAG</b> REACT 19 &bull; TS &bull; POSTGRES
                  </span>
                  <span className="stamp-badge bg-[#5fb57a] text-[10px]">
                    HYBRID BM25 + COSINE @
                  </span>
                  <span className="stamp-badge bg-white text-[10px]">
                    5 NLP TOOLS @
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl text-[#111111] uppercase tracking-tight">
                  DocuMind: Full-Stack AI Research &amp; Document Platform
                </h3>

                <p className="text-sm sm:text-base text-[#333333] leading-relaxed font-medium">
                  Engineered a production-style hybrid RAG pipeline (React 19, TypeScript, Node.js, Express, PostgreSQL) using vector embeddings and BM25 sparse retrieval for citation-tracked document analysis, alongside an AI academic-integrity suite of five NLP micro-utilities.
                </p>

                {/* 5 NLP Tools Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 text-[11px] font-mono-code font-bold">
                  <div className="p-2 rounded bg-white border border-[#111111] text-center">
                    <span className="text-[#5fb57a] block text-[9px]">TOOL 01</span>
                    <span className="truncate">Paraphraser</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-[#111111] text-center">
                    <span className="text-[#5fb57a] block text-[9px]">TOOL 02</span>
                    <span className="truncate">Grammar</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-[#111111] text-center">
                    <span className="text-[#5fb57a] block text-[9px]">TOOL 03</span>
                    <span className="truncate">AI Detector</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-[#111111] text-center">
                    <span className="text-[#5fb57a] block text-[9px]">TOOL 04</span>
                    <span className="truncate">Plagiarism</span>
                  </div>
                  <div className="p-2 rounded bg-white border border-[#111111] text-center col-span-2 sm:col-span-1">
                    <span className="text-[#5fb57a] block text-[9px]">TOOL 05</span>
                    <span className="truncate">Humanizer</span>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {[
                    'React 19',
                    'TypeScript',
                    'Node.js',
                    'Express',
                    'PostgreSQL',
                    'Google Gemini API',
                    'ChromaDB',
                    'BM25 Retrieval',
                    'JWT Auth',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded text-[11px] font-mono-code font-bold bg-[#f5f5f4] text-[#111111] border border-[#111111]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    onClick={() =>
                      setSelectedProject(
                        PORTFOLIO_DATA.projects.find((p) => p.id === 'documind-ai') || null
                      )
                    }
                    className="neo-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#5fb57a] hover:bg-[#4ea569] text-[#111111] font-bold text-xs uppercase tracking-wider"
                  >
                    <span>View RAG Architecture Blueprint</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="https://github.com/Rishuraj0610/documind-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-[#f5f5f4] text-[#111111] font-bold text-xs uppercase"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Repo</span>
                  </a>

                  <a
                    href="https://documind-ai.preview.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-[#f5f5f4] text-[#111111] font-bold text-xs uppercase"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Grid for Other Projects: StutterCare AI, CodSoft ML Suite, CloudScale, CodeGuard, SmartCampus, AlphaForecast */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects
            .filter((p) => p.id !== 'growthpilot-ai' && p.id !== 'documind-ai')
            .map((project) => (
              <div
                key={project.id}
                className="neo-box rounded-xl bg-white p-6 sm:p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="editorial-pill">
                      <b>{project.category}</b>
                    </span>
                    {project.period && (
                      <span className="text-[10px] font-mono-code font-bold bg-[#fafaf8] border border-[#111111] px-2 py-0.5 rounded text-[#111111]">
                        {project.period}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-xl uppercase text-[#111111] tracking-tight mb-1">
                    {project.name}
                  </h3>

                  {project.roleOrTeam && (
                    <div className="flex items-center gap-1.5 text-[11px] font-mono-code font-bold text-[#5fb57a] bg-[#111111] px-2 py-0.5 rounded w-fit mb-2">
                      <Users className="w-3 h-3" />
                      <span>{project.roleOrTeam}</span>
                    </div>
                  )}

                  <p className="text-xs font-mono-code font-bold text-[#555555] mb-3">
                    {project.tagline}
                  </p>

                  <p className="text-xs text-[#333333] font-medium leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Highlights Pill */}
                  <div className="p-2.5 rounded bg-[#fafaf8] border-[1.5px] border-[#111111] text-[11px] font-mono-code font-bold text-[#111111] mb-4 shadow-[1.5px_1.5px_0px_#111111]">
                    &bull; {project.metricsOrHighlight}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold bg-[#f5f5f4] text-[#111111] border border-[#111111]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t-[1.5px] border-[#111111] flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="neo-btn px-3 py-1.5 rounded-full bg-[#5fb57a] text-[#111111] text-[11px] font-bold uppercase tracking-wider flex items-center gap-1"
                  >
                    <span>Blueprint</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-white border-[1.5px] border-[#111111] shadow-[1.5px_1.5px_0px_#111111] text-[#111111] hover:bg-[#f5f5f4] transition-colors"
                    aria-label="View on GitHub"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-[#555555] font-mono-code text-sm">
            No projects matched "{searchQuery}".
          </div>
        )}
      </div>

      {/* Detailed Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

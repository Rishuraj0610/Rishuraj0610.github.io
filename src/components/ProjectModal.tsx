import React from 'react';
import { Project } from '../data/portfolioData';
import {
  X,
  Github,
  ExternalLink,
  ShieldAlert,
  Lightbulb,
  CheckCircle2,
  Workflow,
  Sparkles,
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog (21st.dev Poster Blueprint) */}
      <div className="relative w-full max-w-4xl bg-[#ebebea] border-2 border-[#111111] shadow-[8px_8px_0px_#111111] rounded-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto text-[#111111]">
        {/* Modal Header */}
        <div className="p-6 bg-white border-b-2 border-[#111111] flex items-start justify-between gap-4 sticky top-0 z-20">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="editorial-pill">
                <b>{project.category}</b> BLUEPRINT
              </span>
              {project.isFeatured && (
                <span className="stamp-badge bg-[#5fb57a] text-[10px]">
                  FEATURED WORK @
                </span>
              )}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[#111111]">
              {project.name}
            </h2>
            <p className="text-xs sm:text-sm font-mono-code font-bold text-[#555555] mt-0.5">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#f0f0ee] border border-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-sm leading-relaxed">
          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-[#f5f5f4] text-[#111111] font-bold text-xs uppercase"
            >
              <Github className="w-4 h-4" />
              <span>Inspect Source on GitHub</span>
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#5fb57a] hover:bg-[#4ea569] text-[#111111] font-bold text-xs uppercase"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Interactive Demo</span>
              </a>
            )}
            <span className="text-xs font-mono-code font-bold text-[#555555] ml-auto">
              {project.metricsOrHighlight}
            </span>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="neo-box p-5 rounded-xl bg-white">
              <div className="flex items-center gap-2 mb-2 text-[#111111] font-bold text-xs uppercase tracking-wider font-mono-code">
                <span className="bg-[#ffbd2e] text-[#111111] px-1.5 py-0.5 rounded font-extrabold">PROBLEM</span>
                <span>The Engineering Challenge</span>
              </div>
              <p className="text-[#333333] text-xs sm:text-sm font-medium leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="neo-box p-5 rounded-xl bg-white">
              <div className="flex items-center gap-2 mb-2 text-[#111111] font-bold text-xs uppercase tracking-wider font-mono-code">
                <span className="bg-[#5fb57a] text-[#111111] px-1.5 py-0.5 rounded font-extrabold">SOLUTION</span>
                <span>The Architectural Solution</span>
              </div>
              <p className="text-[#333333] text-xs sm:text-sm font-medium leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Visualizer (Blueprint Pipeline) */}
          <div className="neo-box p-6 rounded-xl bg-white">
            <div className="flex items-center justify-between mb-4 pb-2 border-b-[1.5px] border-[#111111]">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#111111] font-extrabold uppercase tracking-wider">
                <Workflow className="w-4 h-4 text-[#5fb57a]" />
                <span>{project.architecture.title}</span>
              </div>
              <span className="text-[11px] font-mono-code font-bold bg-[#5fb57a] text-[#111111] px-2 py-0.5 rounded-full">
                PIPELINE BLUEPRINT
              </span>
            </div>

            <div className="space-y-3">
              {project.architecture.steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3.5 rounded-lg bg-[#fafaf8] border-[1.5px] border-[#111111] gap-2 shadow-[2px_2px_0px_#111111]"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#5fb57a] border border-[#111111] flex items-center justify-center text-xs font-mono-code font-extrabold text-[#111111] shrink-0 mt-0.5 sm:mt-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#111111] uppercase font-mono-code">{step.title}</h4>
                      <p className="text-[11px] text-[#444444] font-medium mt-0.5">{step.description}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono-code font-bold px-2.5 py-1 rounded bg-white text-[#111111] border border-[#111111] shrink-0 self-end sm:self-center">
                    {step.tech}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#111111] font-extrabold mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#5fb57a]" />
              <span>Implemented Capabilities</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-white border-[1.5px] border-[#111111] shadow-[2px_2px_0px_#111111] flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#5fb57a] shrink-0 mt-0.5 stroke-[2.5]" />
                  <span className="text-xs text-[#222222] font-semibold">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <h3 className="text-xs font-mono-code uppercase tracking-wider text-[#111111] font-extrabold mb-2">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md text-xs font-mono-code font-bold bg-white text-[#111111] border-[1.5px] border-[#111111] shadow-[1.5px_1.5px_0px_#111111]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Engineering Challenges & Learnings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3 border-t-[1.5px] border-[#111111]">
            <div className="p-4 rounded-xl bg-white border border-[#111111]">
              <h4 className="text-xs font-bold text-[#111111] uppercase font-mono-code mb-1.5 flex items-center gap-1.5">
                <span className="text-[#ffbd2e]">&bull;</span> Challenges Overcome
              </h4>
              <p className="text-xs text-[#444444] font-medium leading-relaxed">
                {project.challenges}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#111111]">
              <h4 className="text-xs font-bold text-[#111111] uppercase font-mono-code mb-1.5 flex items-center gap-1.5">
                <span className="text-[#5fb57a]">&bull;</span> What I Learned &amp; Gained
              </h4>
              <p className="text-xs text-[#444444] font-medium leading-relaxed">
                {project.whatILearned}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t-2 border-[#111111] flex items-center justify-between text-xs font-mono-code font-bold text-[#555555]">
          <span>Rishu Raj Portfolio // Candidate Case Study</span>
          <button
            onClick={onClose}
            className="neo-btn px-4 py-1.5 rounded-full bg-[#111111] text-white uppercase text-xs"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};

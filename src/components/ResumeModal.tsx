import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  X,
  Download,
  Printer,
  ExternalLink,
} from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const resumeText = `
RISHU RAJ
Computer Science & Engineering Undergraduate (Batch 2023 – 2027)
Phone: ${PORTFOLIO_DATA.personal.phone} | Email: ${PORTFOLIO_DATA.personal.email}
GitHub: ${PORTFOLIO_DATA.personal.github} | LinkedIn: ${PORTFOLIO_DATA.personal.linkedin}
LeetCode: ${PORTFOLIO_DATA.personal.leetcode} | GeeksforGeeks: ${PORTFOLIO_DATA.personal.geeksforgeeks}
Location: Greater Noida, Uttar Pradesh, India

================================================================================
EDUCATION
================================================================================
Bachelor of Technology (B.Tech) in Computer Science and Engineering
Noida Institute of Engineering & Technology (NIET), Greater Noida
Dr. A.P.J. Abdul Kalam Technical University (AKTU)
Duration: 2023 – 2027 | Cumulative GPA: 8.21 / 10.0
Key Coursework: Data Structures & Algorithms, Object-Oriented Programming (C++/Python),
Database Management Systems (DBMS), Operating Systems, Computer Networks, Software Engineering.

================================================================================
TECHNICAL SKILLS
================================================================================
• Languages: Python, C++, JavaScript (ES6+), TypeScript, SQL
• Agentic AI & Generative AI: LangGraph (State Graphs, Cyclic Multi-Agent), LangChain,
  RAG (Retrieval-Augmented Generation), Hybrid Retrieval (BM25 + Cosine Similarity),
  Prompt Engineering, Groq (LLaMA 3.3 70B LPU), Google Gemini API, HuggingFace Embeddings
• Backend & Cloud: Node.js, Express.js, FastAPI, Flask, Streamlit, RESTful APIs, JWT Auth,
  Google Cloud Platform (GCP Arcade 15+ Labs), Docker, Git & GitHub
• Databases & Vector Stores: ChromaDB (Vector Indexing), PostgreSQL, MySQL, MongoDB, Redis
• Fundamentals: Data Structures & Algorithms (200+ Solved), OOP, System Architecture, Agile

================================================================================
PROFESSIONAL EXPERIENCE & INTERNSHIPS
================================================================================
Python Developer Intern | CodSoft (Remote)
June 2024 – July 2024
• Engineered 5 Python applications utilizing machine learning algorithms, object-oriented design,
  and modular architecture within an Agile remote team.
• Resolved 25+ functional bugs through rigorous unit testing, slashing debugging overhead by 30%.
• Delivered 100% of assigned sprint milestones on schedule with clean Git version control.

================================================================================
FEATURED SOFTWARE & AI ENGINEERING PROJECTS
================================================================================
1. GrowthPilot AI — Multi-Agent Agentic Commerce Copilot (2026)
   Tech: Python, LangGraph, LangChain, Groq (LLaMA 3.3 70B), ChromaDB, HuggingFace, Streamlit
   • Architected an autonomous multi-agent state graph coordinating 4 specialized agents:
     Discovery, Personalization, Cart Recovery, and Analytics.
   • Implemented vector semantic product retrieval with ChromaDB and HuggingFace embeddings.
   • Leveraged Groq LPU inference for sub-2-second complex multi-agent reasoning handoffs.

2. DocuMind — Full-Stack Hybrid RAG Research & NLP Suite (2026)
   Tech: React 19, TypeScript, Node.js, Express, PostgreSQL, Google Gemini API, ChromaDB, BM25
   • Built a production hybrid RAG pipeline fusing BM25 sparse matching with dense ChromaDB
     cosine vectors, solving exact keyword retrieval misses and eliminating hallucinations.
   • Integrated an academic integrity suite of 5 NLP micro-tools (Paraphraser, Grammar Corrector,
     AI Detector, Plagiarism Scanner, Humanizer) powered by Google Gemini API.
   • Engineered stateless JWT authentication and text-to-speech audio synthesis.

3. StutterCare AI — Speech Therapy & AI Counselling Platform (Nov 2025 – Apr 2026)
   Tech: Node.js, Express, MySQL, Groq API, Machine Learning, Agile
   • Built in an Agile team of 4 members to support individuals with speech disfluencies.
   • Engineered a low-latency Groq conversational counselling agent providing empathetic feedback.
   • Designed an ML therapy recommendation engine that boosted user exercise completion by 35%.

4. CodeGuard AI — AST Vulnerability & Pull Request Reviewer (2025 – 2026)
   Tech: Python, FastAPI, Google Gemini API, AST Parser, Bandit, Docker, GitHub API
   • Intercepts Git pull requests to run Abstract Syntax Tree taint analysis flagging OWASP flaws.
   • Leverages Google Gemini API to produce automated line-by-line security code review comments.

5. SmartCampus NIET — Academic Resource & Notice Hub (2024 – 2025)
   Tech: React 19, TypeScript, Node.js, Express, MongoDB, Redis, WebSockets
   • Serving 1,200+ NIET CSE students with indexed lecture notes and exam schedules.
   • Implemented Redis write-through cache achieving sub-100ms circular retrieval times.

6. CloudScale Gateway — Distributed Task & Cache Service (2025)
   Tech: Node.js, Express, TypeScript, PostgreSQL, Redis, BullMQ, Docker
   • Token bucket rate limiting, Redis query caching (-80% db read latency), and asynchronous workers.

================================================================================
CERTIFICATIONS & HONORS
================================================================================
• Google Cloud Arcade Facilitator 2025 Certificate of Achievement (15+ Cloud Labs)
• ServiceNow University & SmartBridge (AICTE) — Administration, Agentic AI, Flows, ATF (2026)
• Udacity — C++ Nanodegree Program (Advanced C++, Memory Management, Concurrency) (2025)
• Deloitte via Forage — Data Analytics Virtual Job Simulation (2025)
• 200+ Problems Solved across LeetCode & GeeksforGeeks in Data Structures & Algorithms
`.trim();

    const file = new Blob([resumeText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'Rishu_Raj_BTech_CSE_Resume_2023-2027.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Card (21st.dev Style) */}
      <div className="relative w-full max-w-4xl bg-[#ebebea] border-2 border-[#111111] shadow-[8px_8px_0px_#111111] rounded-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto text-[#111111]">
        {/* Top Control Bar */}
        <div className="p-4 bg-white border-b-2 border-[#111111] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono-code font-bold text-[#111111]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5fb57a] border border-[#111111]" />
            <span className="uppercase">RISHU_RAJ_RESUME.PDF [PREVIEW]</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="neo-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-[#f5f5f4] text-[#111111] text-xs font-bold uppercase transition-colors"
              title="Print formatted resume"
            >
              <Printer className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="neo-btn inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#5fb57a] hover:bg-[#4ea569] text-[#111111] text-xs font-bold uppercase transition-all"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Download File</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#f0f0ee] border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted ATS Resume Document */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-white text-[#111111] font-sans text-xs sm:text-sm space-y-6">
          {/* Resume Header */}
          <div className="border-b-2 border-[#111111] pb-5 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1 justify-center sm:justify-start">
                <h1 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[#111111]">
                  {PORTFOLIO_DATA.personal.name}
                </h1>
                <span className="editorial-pill text-[10px]">
                  BATCH 2023–2027
                </span>
                <span className="stamp-badge bg-[#5fb57a] text-[10px]">
                  CGPA: {PORTFOLIO_DATA.personal.cgpa}
                </span>
              </div>
              <p className="text-[#111111] font-bold text-xs sm:text-sm font-mono-code">
                Computer Science Engineering Undergraduate &bull; Aspiring Software &amp; AI Engineer
              </p>
              <p className="text-[#555555] font-semibold text-xs mt-1">
                {PORTFOLIO_DATA.personal.college} &bull; {PORTFOLIO_DATA.personal.university} &bull; {PORTFOLIO_DATA.personal.location}
              </p>
            </div>

            <div className="flex flex-col gap-1 font-mono-code text-[11px] font-bold text-[#333333] sm:text-right">
              <span>{PORTFOLIO_DATA.personal.phone}</span>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="hover:underline hover:text-[#5fb57a]"
              >
                {PORTFOLIO_DATA.personal.email}
              </a>
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                className="hover:underline hover:text-[#5fb57a]"
              >
                github.com/Rishuraj0610
              </a>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:underline hover:text-[#5fb57a]"
              >
                linkedin.com/in/rishu-raj0610
              </a>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="font-display text-xs uppercase text-[#111111] tracking-wider mb-2 border-b-[1.5px] border-[#111111] pb-1">
              Education
            </h2>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-[#111111] text-sm">
                  {PORTFOLIO_DATA.education.degree} &mdash; {PORTFOLIO_DATA.education.major}
                </h3>
                <p className="text-[#444444] text-xs font-semibold">
                  {PORTFOLIO_DATA.education.institution} ({PORTFOLIO_DATA.education.affiliation})
                </p>
              </div>
              <div className="text-right font-mono-code text-xs">
                <span className="font-bold text-[#111111] block">{PORTFOLIO_DATA.education.duration}</span>
                <span className="text-[#5fb57a] font-bold text-[11px]">CGPA: {PORTFOLIO_DATA.education.cgpa}</span>
              </div>
            </div>
            <p className="text-[11px] text-[#555555] font-medium mt-1">
              Relevant Coursework: Data Structures &amp; Algorithms, Database Management Systems (DBMS), Operating Systems, Object-Oriented Programming, Computer Networks, Software Engineering.
            </p>
          </div>

          {/* Professional Experience / Internship */}
          <div>
            <h2 className="font-display text-xs uppercase text-[#111111] tracking-wider mb-2 border-b-[1.5px] border-[#111111] pb-1">
              Internship Experience
            </h2>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-[#111111] text-sm">
                  {PORTFOLIO_DATA.internship.role} &mdash; {PORTFOLIO_DATA.internship.company}
                </h3>
                <p className="text-[#444444] text-xs font-semibold">
                  {PORTFOLIO_DATA.internship.type} &bull; {PORTFOLIO_DATA.internship.location}
                </p>
              </div>
              <span className="font-mono-code font-bold text-xs text-[#111111]">
                {PORTFOLIO_DATA.internship.period}
              </span>
            </div>
            <ul className="list-disc list-inside text-[#333333] font-medium text-xs space-y-1 mt-1.5 pl-1">
              {PORTFOLIO_DATA.internship.highlights.map((highlight, idx) => (
                <li key={idx}>{highlight}</li>
              ))}
            </ul>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="font-display text-xs uppercase text-[#111111] tracking-wider mb-2 border-b-[1.5px] border-[#111111] pb-1">
              Technical Proficiencies
            </h2>
            <div className="space-y-1.5 text-xs">
              <div>
                <span className="font-bold text-[#111111]">Programming Languages: </span>
                <span className="text-[#333333] font-medium">Python, C++, JavaScript (ES6+), TypeScript, SQL</span>
              </div>
              <div>
                <span className="font-bold text-[#111111]">Agentic &amp; Generative AI: </span>
                <span className="text-[#333333] font-medium">LangGraph (State Graphs, Cyclic Multi-Agent), LangChain, Hybrid RAG (BM25 + Cosine Similarity), Groq (LLaMA 3.3 70B), Google Gemini API, HuggingFace Embeddings, Prompt Engineering</span>
              </div>
              <div>
                <span className="font-bold text-[#111111]">Backend &amp; Cloud: </span>
                <span className="text-[#333333] font-medium">Node.js, Express.js, FastAPI, Flask, RESTful APIs, JWT Auth, Google Cloud Platform (GCP 15+ Labs), Docker, Git &amp; GitHub</span>
              </div>
              <div>
                <span className="font-bold text-[#111111]">Databases &amp; Vector: </span>
                <span className="text-[#333333] font-medium">ChromaDB, PostgreSQL, MySQL, MongoDB, Redis Cache</span>
              </div>
              <div>
                <span className="font-bold text-[#111111]">Core Fundamentals: </span>
                <span className="text-[#333333] font-medium">Data Structures &amp; Algorithms (200+ Solved), OOP, System Design, Unit Testing, Agile/Scrum</span>
              </div>
            </div>
          </div>

          {/* Key Projects */}
          <div>
            <h2 className="font-display text-xs uppercase text-[#111111] tracking-wider mb-2 border-b-[1.5px] border-[#111111] pb-1">
              Featured Software &amp; AI Engineering Projects
            </h2>

            {/* GrowthPilot AI */}
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-[#111111] text-sm">
                  GrowthPilot AI &mdash; Autonomous 4-Agent Commerce Copilot
                </h3>
                <span className="font-mono-code text-[11px] font-bold text-[#111111] bg-[#5fb57a] px-2 py-0.5 rounded">
                  LangGraph &bull; Groq LLaMA 3.3 70B &bull; ChromaDB
                </span>
              </div>
              <ul className="list-disc list-inside text-[#333333] font-medium text-xs space-y-1 mt-1 pl-1">
                <li>Architected an autonomous multi-agent state graph orchestrating Discovery, Personalization, Cart Recovery, and Analytics agents.</li>
                <li>Engineered vector semantic product retrieval with ChromaDB and HuggingFace embeddings.</li>
                <li>Achieved sub-2-second complex multi-agent reasoning cycles utilizing Groq LPU inference acceleration.</li>
              </ul>
            </div>

            {/* DocuMind AI */}
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-[#111111] text-sm">
                  DocuMind &mdash; Full-Stack AI Research &amp; Hybrid RAG Platform
                </h3>
                <span className="font-mono-code text-[11px] font-bold text-[#111111] bg-[#5fb57a] px-2 py-0.5 rounded">
                  React 19 &bull; TypeScript &bull; Express &bull; Gemini &bull; BM25
                </span>
              </div>
              <ul className="list-disc list-inside text-[#333333] font-medium text-xs space-y-1 mt-1 pl-1">
                <li>Built a production hybrid RAG pipeline fusing BM25 sparse matching with dense ChromaDB cosine vectors, eliminating hallucinations.</li>
                <li>Integrated an academic integrity NLP suite of 5 tools (Paraphraser, Grammar, AI Detector, Plagiarism Scanner, Humanizer).</li>
                <li>Implemented stateless JWT token authentication and document-to-speech audio playback.</li>
              </ul>
            </div>

            {/* StutterCare AI */}
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-[#111111] text-sm">
                  StutterCare AI &mdash; Speech Therapy &amp; AI Counselling Platform
                </h3>
                <span className="font-mono-code text-[11px] font-bold text-[#111111] bg-[#5fb57a] px-2 py-0.5 rounded">
                  Node.js &bull; Express &bull; MySQL &bull; Groq &bull; ML
                </span>
              </div>
              <ul className="list-disc list-inside text-[#333333] font-medium text-xs space-y-1 mt-1 pl-1">
                <li>Built in an Agile team of 4 members with a Groq-powered empathetic LLM counselling agent for conversational support.</li>
                <li>Implemented an ML recommendation engine that boosted user exercise completion rates by 35%.</li>
              </ul>
            </div>

            {/* CodeGuard AI */}
            <div className="mb-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-[#111111] text-sm">
                  CodeGuard AI &mdash; AST Vulnerability &amp; Pull Request Reviewer
                </h3>
                <span className="font-mono-code text-[11px] font-bold text-[#111111] bg-[#5fb57a] px-2 py-0.5 rounded">
                  FastAPI &bull; Python AST &bull; Google Gemini &bull; Docker
                </span>
              </div>
              <ul className="list-disc list-inside text-[#333333] font-medium text-xs space-y-1 mt-1 pl-1">
                <li>Automated AST-based static analysis detecting OWASP Top 10 vulnerabilities with contextual refactoring recommendations.</li>
              </ul>
            </div>

            {/* SmartCampus NIET */}
            <div>
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-[#111111] text-sm">
                  SmartCampus NIET &mdash; High-Throughput Resource &amp; Notice Hub
                </h3>
                <span className="font-mono-code text-[11px] font-bold text-[#111111] bg-[#5fb57a] px-2 py-0.5 rounded">
                  React 19 &bull; Node.js &bull; Redis &bull; MongoDB
                </span>
              </div>
              <ul className="list-disc list-inside text-[#333333] font-medium text-xs space-y-1 mt-1 pl-1">
                <li>Engineered for 1,200+ NIET CSE batch students with sub-100ms Redis notice caching and instant WebSocket alert broadcasts.</li>
              </ul>
            </div>
          </div>

          {/* Certifications & Badges */}
          <div>
            <h2 className="font-display text-xs uppercase text-[#111111] tracking-wider mb-2 border-b-[1.5px] border-[#111111] pb-1">
              Certifications &amp; Achievements
            </h2>
            <ul className="list-disc list-inside text-[#333333] font-medium text-xs space-y-1 pl-1">
              <li>Google Cloud Arcade Facilitator 2025 Certificate of Achievement (15+ Cloud Labs).</li>
              <li>ServiceNow University &amp; SmartBridge (AICTE) &mdash; Administration, Agentic AI, Flows, ATF (2026).</li>
              <li>Udacity &mdash; C++ Nanodegree Program (Advanced C++, Memory Management, Concurrency) (2025).</li>
              <li>Deloitte via Forage &mdash; Data Analytics Virtual Job Simulation (2025).</li>
              <li>Solved 200+ Data Structures &amp; Algorithms problems across LeetCode &amp; GeeksforGeeks.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t-2 border-[#111111] flex items-center justify-between text-xs text-[#555555] font-mono-code font-bold">
          <span>CONFIGURABLE VIA PORTFOLIO_DATA</span>
          <button
            onClick={onClose}
            className="neo-btn px-4 py-1.5 rounded-full bg-[#111111] text-white uppercase text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import {
  Code2,
  Server,
  Cpu,
  Database,
  Layout,
  Wrench,
  CheckCircle2,
  Search,
} from 'lucide-react';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, React.ReactNode> = {
    Programming: <Code2 className="w-5 h-5 text-[#111111]" />,
    'Backend Development': <Server className="w-5 h-5 text-[#111111]" />,
    'AI / GenAI': <Cpu className="w-5 h-5 text-[#111111]" />,
    Databases: <Database className="w-5 h-5 text-[#111111]" />,
    Frontend: <Layout className="w-5 h-5 text-[#111111]" />,
    'Cloud & Dev Tools': <Wrench className="w-5 h-5 text-[#111111]" />,
  };

  const filteredCategories = PORTFOLIO_DATA.skills.filter((category) => {
    if (selectedCategory !== 'All' && category.title !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim() === '') return true;

    const matchesCategory = category.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkill = category.skills.some(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return matchesCategory || matchesSkill;
  });

  return (
    <section id="skills" className="py-24 relative text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="editorial-pill">
                <b>02</b> TECHNICAL ARSENAL
              </span>
              <span className="stamp-badge bg-white text-[11px]">
                PRODUCTION TOOLS @
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl xl:text-5xl text-[#111111] uppercase tracking-tight leading-[1.05]">
              SKILLS &amp; TECHNOLOGIES*
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#444444] font-medium">
              Categorized competencies grounded in practical project implementations, API contracts, and problem-solving.
            </p>
          </div>

          {/* Quick Search in 21st.dev brutalist input */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-[#111111] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skills, e.g. RAG, JWT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-white border-[1.5px] border-[#111111] shadow-[2.5px_2.5px_0px_#111111] text-xs font-mono-code font-bold text-[#111111] placeholder-[#777777] focus:outline-none focus:bg-[#fafaf8]"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b-[1.5px] border-[#111111]">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`neo-btn px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
              selectedCategory === 'All'
                ? 'bg-[#5fb57a] text-[#111111]'
                : 'bg-white text-[#111111] hover:bg-[#f5f5f4]'
            }`}
          >
            All Categories ({PORTFOLIO_DATA.skills.reduce((acc, c) => acc + c.skills.length, 0)})
          </button>
          {PORTFOLIO_DATA.skills.map((cat) => (
            <button
              key={cat.title}
              onClick={() => setSelectedCategory(cat.title)}
              className={`neo-btn px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
                selectedCategory === cat.title
                  ? 'bg-[#5fb57a] text-[#111111]'
                  : 'bg-white text-[#111111] hover:bg-[#f5f5f4]'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.title}
              className="neo-box tech-bracket rounded-xl bg-white p-5 flex flex-col justify-between"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b-[1.5px] border-[#111111]">
                  <div className="w-9 h-9 rounded-lg bg-[#5fb57a] border-[1.5px] border-[#111111] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#111111]">
                    {categoryIcons[category.title] || <Code2 className="w-5 h-5 text-[#111111]" />}
                  </div>
                  <div>
                    <h3 className="font-display text-sm uppercase text-[#111111] tracking-tight">
                      {category.title}
                    </h3>
                    <p className="text-[11px] text-[#555555] font-medium line-clamp-1">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Skills Badges */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {category.skills
                    .filter((skill) => {
                      if (!searchQuery.trim()) return true;
                      return (
                        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        skill.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
                      );
                    })
                    .map((skill) => (
                      <div
                        key={skill.name}
                        className="p-2.5 rounded-lg bg-[#fafaf8] border-[1.5px] border-[#111111] shadow-[1.5px_1.5px_0px_#111111] hover:bg-white hover:translate-x-0.5 transition-all flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-[#111111]">
                            {skill.name}
                          </span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5fb57a] stroke-[2.5]" />
                        </div>
                        {skill.tags && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {skill.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[9px] font-mono-code font-bold px-1.5 py-0.5 rounded bg-white text-[#333333] border border-[#111111]"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>

              {/* Footer Indicator */}
              <div className="mt-5 pt-3 border-t-[1.5px] border-[#111111] flex items-center justify-between text-[11px] font-mono-code font-bold text-[#555555]">
                <span>{category.skills.length} CORE CAPABILITIES</span>
                <span className="text-[#111111] bg-[#5fb57a] px-2 py-0.5 rounded-full">ACTIVE IN PROJECTS</span>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-16 text-[#555555] font-mono-code text-sm">
            No matching skills found for "{searchQuery}".
          </div>
        )}
      </div>
    </section>
  );
};

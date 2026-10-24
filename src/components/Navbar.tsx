import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Menu, X, FileText, Terminal, ExternalLink, Sparkles, Github, Linkedin } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onOpenResume: () => void;
  mascotMode?: boolean;
  onToggleMascotMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onOpenResume,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Journey', href: '#journey' },
    { name: 'Education', href: '#education' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Profiles', href: '#profiles' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'translate-y-0 opacity-100 bg-[#ebebea]/95 backdrop-blur-md border-b-2 border-[#111111] shadow-[0_4px_12px_rgba(0,0,0,0.08)] py-3 text-[#111111]'
          : '-translate-y-full opacity-0 pointer-events-none py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group cursor-pointer"
            onClick={(e) => handleNavClick(e, '#hero')}
          >
            <div className="w-8 h-8 rounded-lg bg-[#5fb57a] border-[1.5px] border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111] transition-all">
              <Terminal className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm uppercase tracking-tight text-[#111111] group-hover:underline">
                {PORTFOLIO_DATA.personal.name}
              </span>
              <span className="text-[10px] font-mono-code font-bold text-[#555555]">
                CS_ENG // BATCH 2023–2027
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-[#111111] bg-[#5fb57a] border border-[#111111] shadow-[1.5px_1.5px_0px_#111111]'
                      : 'text-[#444444] hover:text-[#111111] hover:bg-white/80'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Actions: Social links & Resume CTA */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#111111] hover:bg-[#5fb57a] transition-colors"
              title="GitHub Profile (Rishuraj0610)"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4 stroke-[2.5]" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#111111] hover:bg-[#5fb57a] transition-colors"
              title="LinkedIn Profile (rishu-raj0610)"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 stroke-[2.5]" />
            </a>
            <button
              onClick={onOpenResume}
              className="neo-btn flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase rounded-full bg-[#5fb57a] hover:bg-[#4ea569] text-[#111111] shadow-sm transition-all ml-1"
            >
              <FileText className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Resume.pdf</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <a
              href={PORTFOLIO_DATA.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn p-1.5 rounded-lg bg-white text-[#111111]"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4 stroke-[2.5]" />
            </a>
            <a
              href={PORTFOLIO_DATA.personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn p-1.5 rounded-lg bg-white text-[#111111]"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 stroke-[2.5]" />
            </a>
            <button
              onClick={onOpenResume}
              className="neo-btn px-2.5 py-1 text-xs font-bold uppercase rounded-full bg-[#5fb57a] text-[#111111]"
            >
              Resume
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white text-[#111111] border-[1.5px] border-[#111111]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#ebebea] border-b-2 border-[#111111] px-4 pt-3 pb-6 mt-3 space-y-2 text-[#111111]">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#111111]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-xs font-bold uppercase rounded-md text-[#111111] hover:bg-white"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold uppercase rounded-full bg-white text-[#111111]"
              >
                <Github className="w-4 h-4 stroke-[2.5]" />
                <span>GitHub</span>
              </a>
              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold uppercase rounded-full bg-white text-[#111111]"
              >
                <Linkedin className="w-4 h-4 stroke-[2.5]" />
                <span>LinkedIn</span>
              </a>
            </div>
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="neo-btn w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold uppercase rounded-full bg-[#5fb57a] text-[#111111]"
            >
              <FileText className="w-4 h-4 stroke-[2.5]" />
              <span>View &amp; Download Resume</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

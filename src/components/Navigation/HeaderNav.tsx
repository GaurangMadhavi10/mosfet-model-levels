import React, { useState } from 'react';
import { Cpu, Menu, X, Printer, BookOpen, Layers } from 'lucide-react';
import { ThemeToggle } from '../UI/ThemeToggle';

interface HeaderNavProps {
  activeSection: string;
  onOpenToc?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'intuition', label: 'Map vs GPS' },
    { id: 'fundamentals', label: 'Fundamentals' },
    { id: 'level1', label: 'Level 1' },
    { id: 'regions', label: 'Regions & Gain' },
    { id: 'level2', label: 'Level 2' },
    { id: 'level3', label: 'Level 3' },
    { id: 'spice-discipline', label: 'SPICE Core' },
    { id: 'bsim', label: 'BSIM Family' },
    { id: 'spice-card', label: 'Model Cards' },
    { id: 'extraction', label: 'Extraction' },
    { id: 'short-channel', label: 'Short-Channel' },
    { id: 'finfet-gaa', label: 'FinFET & GAA' },
    { id: 'comparison', label: 'Comparison' },
    { id: 'verification', label: 'Verification' },
    { id: 'references', label: 'References' },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-wafer-950/85 dark:bg-wafer-950/85 light:bg-white/85 border-b border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 group text-left focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-chip group-hover:scale-105 transition-transform">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="font-display font-bold text-sm tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <span>MOSFET Model Levels</span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                VLSI CCE1
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono hidden md:block">
              Square-Law → Compact Models → 3D Silicon
            </div>
          </div>
        </button>

        {/* Desktop Quick Nav Links */}
        <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-1">
          {navItems.slice(0, 10).map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="relative group">
            <button className="px-2 py-1 rounded text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              <span>More</span>
            </button>
            <div className="absolute right-0 top-full mt-1 w-44 py-1.5 bg-wafer-900 dark:bg-wafer-900 light:bg-white border border-slate-800 rounded-lg shadow-xl hidden group-hover:block">
              {navItems.slice(10).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                    activeSection === item.id ? 'text-cyan-400 bg-cyan-950/30 font-semibold' : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            title="Print / Save Engineering Publication"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-700/60 dark:border-slate-800 light:border-slate-300 bg-slate-900/60 dark:bg-slate-900/60 light:bg-slate-100 text-slate-300 dark:text-slate-300 light:text-slate-700 hover:text-cyan-400 hover:border-cyan-500/50 text-xs font-medium transition-all"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF</span>
          </button>

          <ThemeToggle />

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg border border-slate-700/60 dark:border-slate-800 bg-slate-900/80 text-slate-300 hover:text-cyan-400"
            aria-label="Toggle Table of Contents"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-wafer-950/98 dark:bg-wafer-950/98 light:bg-white border-b border-slate-800 px-4 py-3 max-h-[75vh] overflow-y-auto space-y-1 shadow-2xl animate-fade-in">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 px-2 py-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Table of Contents</span>
          </div>
          <div className="grid grid-cols-2 gap-1 pt-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left px-3 py-2 rounded text-xs transition-colors ${
                  activeSection === item.id
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/40'
                    : 'text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

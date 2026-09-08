import React from 'react';
import { Bookmark, ChevronRight } from 'lucide-react';

interface TocItem {
  id: string;
  title: string;
  number?: string;
  category: string;
}

interface TableOfContentsProps {
  activeSection: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ activeSection }) => {
  const sections: TocItem[] = [
    { id: 'hero', title: 'MOSFET Model Levels Roadmap', category: 'Overview' },
    { id: 'intuition', number: '1', title: 'The City Map and the GPS', category: 'Intuition' },
    { id: 'fundamentals', number: '2', title: 'MOSFET Fundamentals: Voltage into Current', category: 'Foundations' },
    { id: 'level1', number: '3', title: 'Level 1: Long-Channel Square-Law Model', category: 'Square-Law' },
    { id: 'regions', number: '4', title: 'Regions of Operation & Small-Signal Insight', category: 'Analysis' },
    { id: 'level2', number: '5', title: 'Level 2: First Non-Ideal Corrections', category: 'Evolution' },
    { id: 'level3', number: '6', title: 'Level 3 & Empirical Compact Models', category: 'Evolution' },
    { id: 'spice-discipline', number: '7', title: 'What Makes a Model Useful in SPICE?', category: 'SPICE Core' },
    { id: 'bsim', number: '8', title: 'BSIM: The Industry Workhorse', category: 'Compact Models' },
    { id: 'simple-vs-compact', number: '9', title: 'From Square Law to BSIM-Like Behavior', category: 'Compact Models' },
    { id: 'spice-card', number: '10', title: 'Model Cards: What a Designer Actually Sees', category: 'SPICE Netlist' },
    { id: 'extraction', number: '11', title: 'From Wafer Data to a Predictive Model', category: 'Wafer Extraction' },
    { id: 'short-channel', number: '12', title: 'Why Long-Channel Intuition Eventually Fails', category: 'Short-Channel' },
    { id: 'finfet-gaa', number: '13', title: 'FinFET and GAA: New Shapes Need New Models', category: '3D Silicon' },
    { id: 'comparison', number: '14', title: 'Choosing a MOSFET Model Level', category: 'Comparison' },
    { id: 'verification', number: '15', title: 'Practical Simulation Checklist', category: 'Verification' },
    { id: 'learning-ladder', number: '16', title: 'The 5-Step Learning Ladder', category: 'Takeaways' },
    { id: 'references', number: '17', title: 'References & Further Reading', category: 'Academic' },
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 75;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  return (
    <aside className="hidden xl:block w-72 shrink-0">
      <div className="sticky top-20 p-4 rounded-xl border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-wafer-900/60 dark:bg-wafer-900/60 light:bg-slate-50/90 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800 light:border-slate-200">
          <Bookmark className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 dark:text-slate-300 light:text-slate-800">
            Article Structure
          </span>
        </div>

        <nav className="space-y-0.5 max-h-[calc(100vh-140px)] overflow-y-auto pr-1 text-xs">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`w-full text-left py-1.5 px-2 rounded-lg flex items-start gap-2 transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 font-semibold border-l-2 border-cyan-400 pl-2.5 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {sec.number && (
                  <span className="font-mono text-[10px] text-cyan-500/80 shrink-0 mt-0.5">
                    {sec.number}.
                  </span>
                )}
                <span className="line-clamp-1 leading-snug flex-1">{sec.title}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />}
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

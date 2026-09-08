import React from 'react';
import { Layers, CheckCircle2, TrendingUp, Cpu, Compass } from 'lucide-react';
import { Callout } from '../UI/Callout';

export const Level3Empirical: React.FC = () => {
  const evolutionCards = [
    {
      level: 'LEVEL 1',
      title: 'Teaching & Hand Analysis',
      params: 'Few Parameters (3-5)',
      description: 'Pure physical approximations (GCA, square-law). Ideal for blackboard derivations, initial sizing, and fast conceptual reasoning.',
      physics: '1D Long-Channel Electrostatics',
      role: 'Classroom & Hand Estimates'
    },
    {
      level: 'LEVEL 2 / 3',
      title: 'Short-Channel & Curve Fitting',
      params: 'Moderate Parameters (10-25)',
      description: 'Adds empirical functions and semi-physical corrections when first-principles closed-form equations become analytically intractable.',
      physics: '2D Depletion Geometry + Empirical Fits',
      role: 'Early SPICE Simulators'
    },
    {
      level: 'BSIM FAMILY',
      title: 'Foundry Compact & Sign-Off',
      params: 'Production Calibrated (50-200+)',
      description: 'Industry-standard surface-potential / charge-based compact models with complete PVT scalability, non-quasi-static dynamics, and foundry calibration.',
      physics: 'Quantum Mechanics, DIBL, FinFET 3D',
      role: 'Modern Million-Gate Fabrication'
    },
  ];

  return (
    <section id="level3" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Model Evolution</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            6. Level 3 and the Rise of Empirical Compact Models
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            "The equation set expands as measured silicon gets more complex."
          </p>
        </div>

        {/* Why Empirical Terms Appear */}
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/70 dark:bg-wafer-900/70 light:bg-white mb-8">
          <h3 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider mb-2">
            Why Empirical Terms Appear
          </h3>
          <p className="text-sm text-slate-300 dark:text-slate-300 leading-relaxed">
            Early Level 3 models introduced curve-fitting flexibility for short-channel behavior. The philosophy changed: <strong>preserve physical anchors, but use carefully chosen empirical functions when first-principles closed forms are too slow or incomplete for circuit simulation.</strong>
          </p>
        </div>

        {/* 3 Evolution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {evolutionCards.map((card, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 dark:bg-wafer-900/60 light:bg-slate-50 hover:border-cyan-500/40 transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                    {card.level}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {card.params}
                  </span>
                </div>
                <h4 className="text-base font-bold font-mono text-slate-100 dark:text-slate-100 light:text-slate-900 mb-2">
                  {card.title}
                </h4>
                <p className="text-xs text-slate-300 dark:text-slate-300 leading-relaxed mb-4">
                  {card.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400 space-y-1">
                <div><strong>Physics:</strong> {card.physics}</div>
                <div><strong>Application:</strong> <span className="text-cyan-300">{card.role}</span></div>
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Lesson Callout from PDF */}
        <Callout type="engineering-lesson" title="ENGINEERING LESSON">
          <strong>"Model level" is not a quality score.</strong> It is a contract between a simulator and a design task. A simple level can be the right tool for an estimate; a foundry model is the right tool when a million-transistor chip must work across corners.
        </Callout>

      </div>
    </section>
  );
};

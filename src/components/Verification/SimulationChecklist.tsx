import React, { useState } from 'react';
import { CheckSquare, Square, CheckCircle2, AlertCircle, Shield, Sliders, Thermometer, Shuffle, Layers, LineChart } from 'lucide-react';

export const SimulationChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: true,
    5: false,
  });

  const checklist = [
    {
      id: 1,
      name: 'Bias',
      desc: 'Check operating region, VOV, gm/ID and terminal voltages.',
      detail: 'Confirm all active transistors stay in desired region (saturation for current mirrors/amplifiers, triode for switches) across dynamic signal swings.',
      icon: <Sliders className="w-4 h-4 text-cyan-400" />
    },
    {
      id: 2,
      name: 'Corners',
      desc: 'Run process, supply and temperature extremes from the PDK.',
      detail: 'Simulate full PVT matrix: TT (25°C), FF (0°C / high VDD), SS (125°C / low VDD), SF, FS corner extremes.',
      icon: <Thermometer className="w-4 h-4 text-sky-400" />
    },
    {
      id: 3,
      name: 'Variation',
      desc: 'Include mismatch / Monte Carlo where the design is sensitive.',
      detail: 'Evaluate Pelgrom threshold voltage mismatch (σ_ΔVTH = Avth / √(W·L)) for differential pairs, current mirrors, and bandgap references.',
      icon: <Shuffle className="w-4 h-4 text-purple-400" />
    },
    {
      id: 4,
      name: 'Parasitics',
      desc: 'Use extracted R and C for timing and post-layout decisions.',
      detail: 'Never rely on schematic-only simulation for final sign-off. Post-layout parasitic extraction (PEX) accounts for interconnect wire delays and coupling caps.',
      icon: <Layers className="w-4 h-4 text-amber-400" />
    },
    {
      id: 5,
      name: 'Correlation',
      desc: 'Compare simulation against lab or silicon data when available.',
      detail: 'Reconcile measured silicon wafer test structures with simulated ring oscillator frequencies and amplifier gain-bandwidth products.',
      icon: <LineChart className="w-4 h-4 text-emerald-400" />
    },
  ];

  const sanityChecks = [
    { q: 'Does increased W improve drive current proportionally?', pass: true },
    { q: 'Does higher temperature (125°C) increase circuit propagation delay?', pass: true },
    { q: 'Is subthreshold off-state leakage within power budget limits?', pass: true },
    { q: 'Is total charge conserved across all transient switching cycles (Σ Qi = 0)?', pass: true },
  ];

  const toggleItem = (id: number) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="verification" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            <span>Verification & Engineering Insights</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            15. A Practical Simulation Checklist
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            "A compact model is only one part of a trustworthy result."
          </p>
        </div>

        {/* 5-Item Interactive Checklist Grid */}
        <div className="space-y-3 mb-8">
          {checklist.map((item) => {
            const isChecked = checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isChecked
                    ? 'border-cyan-500/50 bg-slate-900/90 dark:bg-wafer-900/90 light:bg-white shadow-chip'
                    : 'border-slate-800 bg-slate-950/60 opacity-60'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-600" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs">
                      {item.id}
                    </span>
                    <h3 className="font-bold font-mono text-sm text-slate-100 dark:text-slate-100 light:text-slate-900">
                      {item.name}
                    </h3>
                    <span className="text-xs font-mono text-cyan-400/80 hidden sm:inline-block">
                      — {item.desc}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 dark:text-slate-300 leading-relaxed font-sans">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fast Sanity Checks Box from PDF Page 16 */}
        <div className="p-6 rounded-xl border border-cyan-500/30 bg-wafer-950/90 shadow-sm mb-6">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Fast Sanity Checks for Circuit Designers</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-slate-300">
            {sanityChecks.map((sc, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{sc.q}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

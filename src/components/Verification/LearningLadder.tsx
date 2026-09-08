import React from 'react';
import { ArrowUpRight, GraduationCap, Eye, Calculator, AlertTriangle, Terminal, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export const LearningLadder: React.FC = () => {
  const steps = [
    {
      num: 1,
      name: 'Observe',
      title: 'Draw the device and label terminal voltages',
      desc: 'Ground yourself in device anatomy: Source, Gate, Drain, Bulk, oxide thickness, and channel dimensions L and W.',
      icon: <Eye className="w-4 h-4 text-cyan-400" />
    },
    {
      num: 2,
      name: 'Derive',
      title: 'Use Level 1 to connect charge, current and geometry',
      desc: 'Apply Gauss’s law and drift equations to derive the canonical square-law relationship: ID,sat = ½β·VOV².',
      icon: <Calculator className="w-4 h-4 text-sky-400" />
    },
    {
      num: 3,
      name: 'Challenge',
      title: 'Name the non-ideal effect that breaks an assumption',
      desc: 'Identify whether velocity saturation, DIBL, body effect, mobility degradation, or self-heating invalidates the simple equation.',
      icon: <AlertTriangle className="w-4 h-4 text-amber-400" />
    },
    {
      num: 4,
      name: 'Simulate',
      title: 'Read the model card, sweep bias and inspect waveforms',
      desc: 'Instantiate the PDK-qualified BSIM/CMG compact model in SPICE, verify continuity, and evaluate dynamic transit delays.',
      icon: <Terminal className="w-4 h-4 text-purple-400" />
    },
    {
      num: 5,
      name: 'Verify',
      title: 'Ask which corner, parasitic or measurement could disagree',
      desc: 'Stress test against process corners (FF, SS), extracted RC layout parasitics, and wafer electrical test data.',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />
    },
  ];

  const timelineMilestones = [
    'Physics',
    'Equations',
    'Corrections',
    'Compact Models',
    'Measured Silicon',
    'Modern 3D Devices'
  ];

  return (
    <section id="learning-ladder" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student Takeaway</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            16. The Learning Ladder
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            "Move fluently from a hand equation to a sign-off mindset."
          </p>
        </div>

        {/* 5-Step Vertical / Horizontal Ladder */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 mb-10">
          {steps.map((s) => (
            <div
              key={s.num}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/70 dark:bg-wafer-900/70 light:bg-white hover:border-cyan-400/60 transition-all flex flex-col justify-between shadow-sm group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-7 h-7 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-xs group-hover:scale-110 transition-transform">
                    {s.num}
                  </div>
                  {s.icon}
                </div>
                <h3 className="font-bold font-mono text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 mb-1">
                  {s.name}
                </h3>
                <div className="text-[11px] font-mono text-cyan-400/90 mb-2 leading-tight">
                  {s.title}
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 leading-relaxed font-sans">
                  {s.desc}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Stage {s.num} of 5
              </div>
            </div>
          ))}
        </div>

        {/* Closing Perspective Card from PDF Page 17 */}
        <div className="p-6 sm:p-8 rounded-2xl border border-cyan-500/40 bg-gradient-to-br from-slate-900 via-wafer-900 to-wafer-950 shadow-chip">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-2">
            Closing Perspective
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-slate-100 mb-4">
            The Model Evolves Because Silicon Evolves
          </h3>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans mb-6">
            MOSFET model levels tell the story of VLSI itself: <strong>a simple physical idea grows into an industrial toolchain as devices scale.</strong> The most capable engineer knows both the elegant first equation and the physical limits that demand a richer model.
          </p>

          {/* Timeline Visual Progression */}
          <div className="p-4 rounded-xl bg-wafer-950/90 border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono font-bold text-slate-300">
              {timelineMilestones.map((m, idx) => (
                <React.Fragment key={m}>
                  <span className="px-2.5 py-1 rounded bg-slate-900 text-cyan-300 border border-slate-800">
                    {m}
                  </span>
                  {idx < timelineMilestones.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-500/60 hidden sm:inline-block shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Cpu, CheckCircle2, ArrowRight, ShieldCheck, Scale, Thermometer, Database } from 'lucide-react';
import { Callout } from '../UI/Callout';

export const UsefulInSpice: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number>(0);

  const pillars = [
    {
      num: 1,
      name: 'Continuity',
      subtitle: 'Smooth derivatives prevent convergence failures',
      icon: <ShieldCheck className="w-5 h-5 text-cyan-400" />,
      detail: 'In SPICE, Newton-Raphson iterations solve non-linear KCL equations by calculating the Jacobian matrix of partial derivatives (∂ID/∂VGS, ∂ID/∂VDS, etc.). Any step discontinuity or kink in current or charge causes infinite slopes or non-convergence crashes.',
      metric: 'C¹ and C² continuous derivatives across subthreshold, linear, and saturation boundaries.'
    },
    {
      num: 2,
      name: 'Scalability',
      subtitle: 'One model must span L, W, fingers and bias',
      icon: <Scale className="w-5 h-5 text-sky-400" />,
      detail: 'A single global parameter card must seamlessly interpolate across varying channel lengths L (from minimum design rule to long-channel analog transistors), channel widths W, multiple finger layouts (NF), and wide bias conditions.',
      metric: 'Binning-free formulation across multi-decade geometric aspect ratios.'
    },
    {
      num: 3,
      name: 'PVT Coverage',
      subtitle: 'Process, voltage and temperature captured',
      icon: <Thermometer className="w-5 h-5 text-amber-400" />,
      detail: 'Digital logic and analog precision blocks must function from -40°C to 125°C, with ±10% VDD supply tolerances, and across statistical fabrication variations (Typical-Typical, Fast-Fast, Slow-Slow, Fast-Slow, Slow-Fast).',
      metric: 'Physical temperature coefficients on bandgap Eg, mobility μ(T), and threshold VTH(T).'
    },
    {
      num: 4,
      name: 'Extraction',
      subtitle: 'Parameters connect to measured test structures',
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      detail: 'Every parameter in the model deck must map to physical wafer-level measurement structures (split-CV, high-frequency S-parameters, Kelvin contact testkeys). Unconstrained mathematical curve fits fail under statistical corner extrapolation.',
      metric: 'Orthogonal parameter extraction sequence with physical lower/upper bounds.'
    },
  ];

  return (
    <section id="spice-discipline" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>Compact-Model Discipline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            7. What Makes a Model Useful in SPICE?
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            "Accuracy matters only if the simulator can use it reliably."
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {pillars.map((p, idx) => (
            <div
              key={p.num}
              onClick={() => setActiveCard(idx)}
              className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                activeCard === idx
                  ? 'border-cyan-500/80 bg-cyan-950/20 dark:bg-cyan-950/30 shadow-chip ring-1 ring-cyan-500/30'
                  : 'border-slate-800 bg-slate-900/60 dark:bg-wafer-900/60 light:bg-slate-50 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs">
                    {p.num}
                  </div>
                  {p.icon}
                </div>
                <h3 className="font-bold font-mono text-base text-slate-100 dark:text-slate-100 light:text-slate-900 mb-1">
                  {p.name}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-400 leading-snug mb-3">
                  {p.subtitle}
                </p>
              </div>

              <div className="text-[11px] font-mono text-cyan-400 pt-2 border-t border-slate-800">
                Click to inspect requirements
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Pillar Inspector Card */}
        <div className="p-6 rounded-xl border border-cyan-500/30 bg-wafer-950/80 shadow-chip mb-8">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-cyan-400 font-bold uppercase tracking-wider">
            <span>Pillar Deep Dive: {pillars[activeCard].name}</span>
          </div>
          <p className="text-sm text-slate-200 dark:text-slate-200 leading-relaxed mb-4">
            {pillars[activeCard].detail}
          </p>
          <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-300">
            <strong>Key Quality Metric:</strong> {pillars[activeCard].metric}
          </div>
        </div>

        {/* A Compact Model is a System */}
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/70 dark:bg-wafer-900/70 light:bg-white mb-8">
          <h3 className="text-base font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900 mb-2">
            A Compact Model is a System
          </h3>
          <p className="text-sm text-slate-300 dark:text-slate-300 leading-relaxed mb-6">
            A production compact model is not merely a single drain current equation. It combines <strong>intrinsic channel current, terminal charges, parasitic resistances, leakage paths, noise and temperature dependencies</strong>. Crucially, it must preserve <strong>charge conservation (<span className="font-mono text-cyan-400">Qg + Qd + Qs + Qb = 0</span>)</strong> and provide smooth, continuous behavior for Newton-Raphson circuit solving.
          </p>

          {/* Pipeline from PDF Page 8 */}
          <div className="p-5 rounded-xl bg-wafer-950 border border-slate-800">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
              MODEL → SIMULATOR → CIRCUIT PREDICTION
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              
              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                <div className="w-7 h-7 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto mb-2 font-mono font-bold text-xs">
                  1
                </div>
                <div className="font-mono font-bold text-sm text-slate-100 mb-1">Parameters</div>
                <div className="text-xs text-slate-400 font-mono">geometry + process</div>
              </div>

              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                <div className="w-7 h-7 rounded-full bg-sky-950 text-sky-400 border border-sky-500/30 flex items-center justify-center mx-auto mb-2 font-mono font-bold text-xs">
                  2
                </div>
                <div className="font-mono font-bold text-sm text-slate-100 mb-1">Equations</div>
                <div className="text-xs text-slate-400 font-mono">current + charge</div>
              </div>

              <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                <div className="w-7 h-7 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2 font-mono font-bold text-xs">
                  3
                </div>
                <div className="font-mono font-bold text-sm text-slate-100 mb-1">Results</div>
                <div className="text-xs text-slate-400 font-mono">delay + power</div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

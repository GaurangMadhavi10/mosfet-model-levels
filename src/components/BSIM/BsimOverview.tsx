import React, { useState } from 'react';
import { Layers, ShieldCheck, Box, Activity, Cpu, Sparkles } from 'lucide-react';
import { Callout } from '../UI/Callout';

export const BsimOverview: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const layers = [
    {
      layer: 'External Parasitics',
      captures: 'series R, overlap C, layout effects (WPE, PSE)',
      description: 'Captures source/drain access series resistance RDS, gate-to-diffusion overlap and fringing capacitances, well-proximity effects (WPE), and shallow trench isolation stress (PSE).',
      color: 'border-amber-500/50 bg-amber-950/20 text-amber-300'
    },
    {
      layer: 'Terminal Charges',
      captures: 'capacitance, charge conservation (Ward-Dutton)',
      description: 'Guarantees exact dynamic charge conservation across all 4 terminals (Qg, Qd, Qs, Qb), providing continuous transcapacitances (Cgs, Cgd, Cgb, Cdd, Cgg) without floating charge buildup.',
      color: 'border-sky-500/50 bg-sky-950/20 text-sky-300'
    },
    {
      layer: 'Core Channel',
      captures: 'short-channel current, mobility, saturation',
      description: 'Unified equation formulation incorporating carrier velocity saturation, vertical field mobility degradation, channel-length modulation, and non-quasi-static (NQS) transient lag.',
      color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300'
    },
    {
      layer: 'Electrostatics',
      captures: 'threshold, DIBL, body effect, halo doping',
      description: 'Captures 2D/3D surface potential, Drain-Induced Barrier Lowering (DIBL), pocket/halo implant steepness, narrow-width effects, and substrate bias sensitivity.',
      color: 'border-purple-500/50 bg-purple-950/20 text-purple-300'
    },
  ];

  return (
    <section id="bsim" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            <span>Advanced Device Models</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            8. BSIM: The Industry Workhorse
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            "Berkeley Short-channel IGFET Model families underpin modern SPICE decks."
          </p>
        </div>

        {/* BSIM Layered Architecture Card */}
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/70 dark:bg-wafer-900/70 light:bg-white mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-200 font-bold flex items-center gap-2">
              <Box className="w-4 h-4 text-cyan-400" />
              <span>A Layered Physical Architecture</span>
            </h3>
            <span className="text-xs font-mono text-cyan-400">Click layer to inspect</span>
          </div>

          <div className="space-y-3 mb-6">
            {layers.map((l, idx) => (
              <div
                key={l.layer}
                onClick={() => setActiveLayer(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  activeLayer === idx
                    ? `${l.color} ring-1 ring-cyan-400 shadow-chip`
                    : 'border-slate-800 bg-wafer-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <span className="font-mono font-bold text-sm text-slate-100 dark:text-slate-100 light:text-slate-900">
                    {l.layer}
                  </span>
                  <span className="text-xs font-mono text-cyan-400/90">
                    Captures: {l.captures}
                  </span>
                </div>
                <p className="text-xs text-slate-300 dark:text-slate-300 leading-relaxed mt-1">
                  {l.description}
                </p>
              </div>
            ))}
          </div>

          {/* Why BSIM Matters Checklist */}
          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3">
              Why BSIM Matters in Silicon Design
            </h4>
            <ul className="space-y-2 text-xs text-slate-300 dark:text-slate-300 font-sans">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong>Scalable Parameterization:</strong> Continuous behavior across wide geometry spans (Lmin to 10μm, Wmin to multi-finger arrays) and full bias envelopes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong>Multi-Domain Coverage:</strong> Accurately predicts propagation delay, subthreshold leakage power, RF transconductance efficiency (gm/ID), and noise figures.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                <span><strong>Foundry Calibration:</strong> Semiconductor foundries (TSMC, Intel, Samsung, GlobalFoundries) fit BSIM parameters directly to inline electrical wafer tests across production PVT corners.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* A Note on Names Callout from PDF */}
        <Callout type="note" title="A NOTE ON NAMES">
          <strong>BSIM3 and BSIM4</strong> are planar bulk MOSFET compact-model generations. <strong>BSIM-CMG</strong> (Common Multi-Gate) targets multi-gate 3D FETs such as FinFETs and GAA Nanosheets, while <strong>BSIM-IMG</strong> supports independent multi-gate structures (e.g. UTBB FD-SOI). The exact model used is determined by the PDK and technology library.
        </Callout>

      </div>
    </section>
  );
};

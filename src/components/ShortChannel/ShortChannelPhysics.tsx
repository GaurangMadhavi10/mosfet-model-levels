import React, { useState } from 'react';
import { Zap, ShieldAlert, Activity, Flame, Shield, ArrowRight } from 'lucide-react';
import { Callout } from '../UI/Callout';
import { MathBlock } from '../UI/MathBlock';

export const ShortChannelPhysics: React.FC = () => {
  const [selectedEffect, setSelectedEffect] = useState<number>(0);

  const consequences = [
    {
      effect: 'DIBL (Drain-Induced Barrier Lowering)',
      consequence: 'VTH decreases as VDS increases; off-state subthreshold leakage rises exponentially.',
      physics: 'The electrostatic potential barrier preventing source electrons from entering the channel is pulled down by the drain field lines extending across the short channel.',
      mitigation: 'Halo implants, thin gate dielectrics, multi-gate wrap architectures.',
      icon: <Zap className="w-4 h-4 text-cyan-400" />
    },
    {
      effect: 'Velocity Saturation',
      consequence: 'ID grows more nearly linearly with overdrive (VOV) than classical square-law (VOV²).',
      physics: 'Optical phonon scattering at high lateral field (E > 10⁴ V/cm) caps electron velocity at vsat ≈ 10⁷ cm/s, reducing saturation drive current below square-law predictions.',
      mitigation: 'Strained silicon engineering (SiGe pMOS, embedded Si:C nMOS) to boost low-field mobility.',
      icon: <Activity className="w-4 h-4 text-sky-400" />
    },
    {
      effect: 'Punch-Through',
      consequence: 'Source-drain depletion regions interact excessively below the surface, causing uncontrolled subsurface leakage.',
      physics: 'At short L and high VDS, the drain depletion zone merges directly with the source depletion region deep in the substrate, bypassing gate control completely.',
      mitigation: 'Retrograde well doping, ultra-thin body SOI, FinFET / GAA thin-body confinement.',
      icon: <ShieldAlert className="w-4 h-4 text-rose-400" />
    },
    {
      effect: 'Hot Carriers / Reliability',
      consequence: 'High fields stress dielectric and interconnect interfaces, shifting VTH and degrading gm over operational lifetime.',
      physics: 'Electrons accelerated by extreme peak lateral electric fields gain sufficient kinetic energy to inject into the gate dielectric (HCI) or generate electron-hole pairs via impact ionization.',
      mitigation: 'Lightly Doped Drain (LDD) extensions and BSIM age/reliability modeling macros.',
      icon: <Flame className="w-4 h-4 text-amber-400" />
    },
  ];

  return (
    <section id="short-channel" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Short-Channel Physics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            12. Why Long-Channel Intuition Eventually Fails
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            "At small L, the drain participates in controlling the source barrier."
          </p>
        </div>

        {/* Side-by-side Electrostatics Diagram (from PDF Page 13) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Long Channel Card */}
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/70 dark:bg-wafer-900/70 light:bg-slate-50 text-center shadow-sm">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-3">
              LONG CHANNEL (L &gt; 1μm)
            </div>
            
            {/* Schematic */}
            <div className="max-w-xs mx-auto my-4 p-4 rounded-lg bg-wafer-950 border border-slate-800 relative">
              <div className="w-32 mx-auto h-6 bg-blue-600 rounded-t text-[10px] font-mono font-bold text-white flex items-center justify-center">
                GATE
              </div>
              <div className="w-44 mx-auto h-1.5 bg-cyan-300 rounded-none mb-1"></div>
              
              <div className="flex items-center justify-between h-10 w-full px-2">
                <div className="w-12 h-8 bg-blue-500 rounded text-[10px] font-mono font-bold text-white flex items-center justify-center">
                  S
                </div>
                <div className="flex-1 text-[10px] font-mono text-slate-400 px-2">
                  Channel L (Long)
                </div>
                <div className="w-12 h-8 bg-blue-500 rounded text-[10px] font-mono font-bold text-white flex items-center justify-center">
                  D
                </div>
              </div>

              {/* Dominant Field lines from Gate */}
              <div className="mt-2 text-[10px] font-mono text-cyan-300">
                ↓↓↓ Vertical Gate Field Dominates ↓↓↓
              </div>
            </div>

            <p className="text-xs font-mono text-slate-300">
              Gate dominates barrier control. Drain field cannot penetrate across the long distance.
            </p>
          </div>

          {/* Short Channel Card */}
          <div className="p-6 rounded-xl border border-rose-500/40 bg-rose-950/15 dark:bg-rose-950/20 light:bg-slate-50 text-center shadow-sm">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-3">
              SHORT CHANNEL (L &lt; 90nm)
            </div>

            {/* Schematic */}
            <div className="max-w-xs mx-auto my-4 p-4 rounded-lg bg-wafer-950 border border-slate-800 relative">
              <div className="w-20 mx-auto h-6 bg-blue-600 rounded-t text-[10px] font-mono font-bold text-white flex items-center justify-center">
                GATE
              </div>
              <div className="w-24 mx-auto h-1.5 bg-cyan-300 rounded-none mb-1"></div>
              
              <div className="flex items-center justify-between h-10 w-full px-2">
                <div className="w-10 h-8 bg-blue-500 rounded text-[10px] font-mono font-bold text-white flex items-center justify-center">
                  S
                </div>
                <div className="w-6 h-1 bg-emerald-400"></div>
                <div className="w-10 h-8 bg-blue-500 rounded text-[10px] font-mono font-bold text-white flex items-center justify-center">
                  D
                </div>
              </div>

              {/* Lateral Field Intrusion from Drain to Source */}
              <div className="mt-2 text-[10px] font-mono text-rose-400 animate-pulse">
                ← ← Drain field lines penetrate source barrier ← ←
              </div>
            </div>

            <p className="text-xs font-mono text-slate-300">
              Drain field reaches toward source. 2D electrostatics degrade gate barrier control.
            </p>
          </div>

        </div>

        {/* Observable Consequences Table */}
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/70 dark:bg-wafer-900/70 light:bg-white mb-8 shadow-sm">
          <h3 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider mb-4">
            Observable Physical Consequences
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {consequences.map((c, idx) => (
              <div
                key={c.effect}
                onClick={() => setSelectedEffect(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedEffect === idx
                    ? 'border-cyan-400 bg-cyan-950/20 ring-1 ring-cyan-400'
                    : 'border-slate-800 bg-wafer-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {c.icon}
                  <span className="font-bold font-mono text-xs text-slate-100 dark:text-slate-100 light:text-slate-900">
                    {c.effect}
                  </span>
                </div>
                <p className="text-xs text-slate-300 dark:text-slate-300 leading-relaxed mb-3">
                  <strong>Consequence:</strong> {c.consequence}
                </p>
                <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                  <span className="text-cyan-400">Physics:</span> {c.physics}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* The Response Callout from PDF Page 13 */}
        <Callout type="important" title="THE RESPONSE: STRONGER ELECTROSTATICS">
          <strong>Thin-body multi-gate devices wrap the gate around more of the channel,</strong> restoring electrostatic control that planar dimensional scaling inevitably loses.
        </Callout>

      </div>
    </section>
  );
};

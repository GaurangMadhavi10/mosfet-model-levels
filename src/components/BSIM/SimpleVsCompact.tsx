import React, { useState } from 'react';
import { Sliders, Cpu, Zap, Activity, Waves, Volume2, ShieldCheck, ArrowRightLeft } from 'lucide-react';
import { MathBlock } from '../UI/MathBlock';
import { Callout } from '../UI/Callout';

export const SimpleVsCompact: React.FC = () => {
  const [selectedEffect, setSelectedEffect] = useState<string>('dibl');

  const effects = [
    {
      id: 'dibl',
      name: 'DIBL (Drain-Induced Barrier Lowering)',
      subtitle: 'Drain field lowers source barrier',
      icon: <Zap className="w-4 h-4 text-cyan-400" />,
      detail: 'As drain voltage VDS increases in short channels, the depletion region from the drain extends toward the source, lowering the source-channel electrostatic potential barrier. This causes threshold voltage VTH to drop, inflating off-state leakage exponentially (Ioff ∝ exp(-qVTH/kT)).',
      math: '\\Delta V_{TH,DIBL} = -\\eta \\cdot V_{DS}'
    },
    {
      id: 'vsat',
      name: 'Velocity Saturation',
      subtitle: 'Carrier velocity limit (~10⁷ cm/s)',
      icon: <Activity className="w-4 h-4 text-sky-400" />,
      detail: 'At high lateral electric fields (E > 1 V/μm), carrier optical phonon scattering causes drift velocity to saturate at vsat ≈ 10⁷ cm/s. As a result, drain current scales linearly with overdrive (ID ∝ VOV) rather than quadratically (VOV²).',
      math: 'I_{D,sat} \\approx W \\cdot C_{ox} \\cdot v_{sat} \\cdot (V_{GS} - V_{TH})'
    },
    {
      id: 'rds',
      name: 'RDS / Rcontact Access Resistance',
      subtitle: 'Source/Drain extension resistance',
      icon: <Sliders className="w-4 h-4 text-amber-400" />,
      detail: 'Silicide contact resistance and ultra-shallow source/drain extensions create series parasitic resistance RDS. The intrinsic voltage across the channel is reduced to VGS,int = VGS - ID·RS and VDS,int = VDS - ID(RS + RD), degrading transconductance gm.',
      math: 'V_{GS,int} = V_{GS} - I_D R_S, \\quad V_{DS,int} = V_{DS} - I_D(R_S + R_D)'
    },
    {
      id: 'gate-leakage',
      name: 'Gate Leakage',
      subtitle: 'Thin dielectric quantum tunneling',
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
      detail: 'Direct quantum-mechanical tunneling through ultra-thin high-κ dielectric layers creates gate current components: gate-to-channel (Igc), gate-to-bulk (Igb), and gate-to-diffusion overlap (Igs, Igd).',
      math: 'I_{Gate} = I_{gc} + I_{gb} + I_{gs} + I_{gd}'
    },
    {
      id: 'nqs',
      name: 'NQS (Non-Quasi-Static) Effects',
      subtitle: 'Dynamic channel charge transit lag',
      icon: <Waves className="w-4 h-4 text-indigo-400" />,
      detail: 'At high operating frequencies (approaching transistor cut-off frequency fT), channel charge cannot rearrange instantaneously with changing gate voltage. NQS modeling captures this finite carrier transit time via distributed RC sub-networks.',
      math: '\\tau_{transit} \\approx \\frac{L^2}{\\mu \\cdot V_{OV}}'
    },
    {
      id: 'noise',
      name: 'Noise Sources',
      subtitle: 'Thermal and 1/f flicker noise',
      icon: <Volume2 className="w-4 h-4 text-purple-400" />,
      detail: 'Compact models calculate physical noise spectra including thermal channel noise (enhanced by hot-carrier effects), flicker (1/f) noise from trap states at the Si/SiO2 interface, and induced gate noise.',
      math: '\\overline{i_{d,th}^2} = 4kT \\cdot \\gamma \\cdot g_{d0} \\cdot \\Delta f'
    },
  ];

  return (
    <section id="simple-vs-compact" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Advanced Device Models</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            9. From Square Law to BSIM-Like Behavior
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            "Modern current is shaped by coupled effects rather than one parabola."
          </p>
        </div>

        {/* Dual Comparison Cards: Simple View vs Compact View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Simple View */}
          <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/60 dark:bg-wafer-900/60 light:bg-slate-50 shadow-sm">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
              SIMPLE VIEW
            </span>
            <MathBlock math="I_D \sim \frac{1}{2}\mu C_{ox}\left(\frac{W}{L}\right)V_{OV}^2" allowCopy={true} />
            <div className="text-xs font-mono text-cyan-400/90 mt-3 pt-3 border-t border-slate-800">
              One constant mobility, one fixed threshold, one geometric channel length.
            </div>
          </div>

          {/* Compact View */}
          <div className="p-6 rounded-xl border border-cyan-500/50 bg-cyan-950/20 dark:bg-cyan-950/25 shadow-chip">
            <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
              COMPACT VIEW
            </span>
            <MathBlock math="I_D = \mathcal{F}\left(V_{GS}, V_{DS}, V_{BS}, T, L, W, \text{process}\right)" allowCopy={true} />
            <div className="text-xs font-mono text-cyan-300 mt-3 pt-3 border-t border-slate-800/80">
              Smooth multi-dimensional interpolation of electrostatics, transport, parasitics and leakage.
            </div>
          </div>

        </div>

        {/* Key Effects Encoded Grid */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Key Coupled Physical Effects Encoded in Compact Models
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {effects.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedEffect(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedEffect === item.id
                    ? 'border-cyan-400 bg-cyan-950/30 shadow-chip ring-1 ring-cyan-500/30'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {item.icon}
                  <span className="font-bold font-mono text-xs text-slate-100 dark:text-slate-100 light:text-slate-900">
                    {item.name}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400 mb-2">
                  {item.subtitle}
                </div>
                <p className="text-xs text-slate-300 dark:text-slate-300 leading-relaxed mb-3">
                  {item.detail}
                </p>
                <div className="pt-2 border-t border-slate-800 text-xs font-mono text-cyan-300">
                  <MathBlock math={item.math} displayMode={false} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Form Matters Callout from PDF */}
        <Callout type="important" title="MODEL FORM MATTERS">
          <strong>Compact-model equations are engineered for continuity of current and charge derivatives.</strong> That is essential: circuit simulators repeatedly linearize the non-linear device equations (computing the Jacobian matrix) while searching for an operating point using Newton-Raphson iterations.
        </Callout>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { GitBranch, Layers, Sliders, ArrowDown, Info } from 'lucide-react';
import { MathBlock } from '../UI/MathBlock';

export const Level2Corrections: React.FC = () => {
  const [vsb, setVsb] = useState(0.5); // Source-to-Body reverse bias (V)
  const [vth0, setVth0] = useState(0.40); // Zero-bias threshold (V)
  const [gamma, setGamma] = useState(0.45); // Body effect coefficient (V^0.5)
  const phiF2 = 0.65; // 2φF (V)

  // Calculate body-effect shifted VTH
  const sqrtTerm1 = Math.sqrt(phiF2 + vsb);
  const sqrtTerm2 = Math.sqrt(phiF2);
  const vthShift = gamma * (sqrtTerm1 - sqrtTerm2);
  const totalVth = vth0 + vthShift;

  const corrections = [
    {
      title: '1. Body Effect (Substrate Sensitivity)',
      miss: 'Level 1 assumes the bulk substrate is pinned at the source potential (VBS = 0). When source is elevated above bulk (VSB > 0), the depletion layer widens, requiring more gate charge to invert the surface.',
      math: 'V_{TH} = V_{TH0} + \\gamma \\left[ \\sqrt{2\\phi_F + V_{SB}} - \\sqrt{2\\phi_F} \\right]',
      note: 'γ is the body effect coefficient = √(2q ε_si N_sub) / C_ox, and 2φ_F is the bulk Fermi inversion potential.',
      tag: 'Electrostatic Non-Ideality'
    },
    {
      title: '2. Mobility Degradation (High Vertical Field)',
      miss: 'As gate voltage VGS increases, carriers in the inversion layer are pulled tightly against the rough oxide-silicon interface, scattering and reducing effective mobility μeff.',
      math: '\\mu_{eff} = \\frac{\\mu_0}{1 + \\theta (V_{GS} - V_{TH})}',
      note: 'θ is the mobility reduction parameter (~0.05 to 0.1 V⁻¹), dampening the quadratic transconductance boost.',
      tag: 'Transport Non-Ideality'
    },
    {
      title: '3. Channel-Length Modulation (Finite ro in Saturation)',
      miss: 'In saturation, the pinch-off point moves inward from the drain as VDS rises, reducing the effective channel length (L_eff = L - ΔL) and creating a finite output conductance.',
      math: 'I_{D,sat} \\approx \\frac{1}{2}\\beta V_{OV}^2 \\left( 1 + \\lambda V_{DS} \\right)',
      note: 'λ is the channel-length modulation parameter (λ ∝ 1/L). Real transistors do not act as infinite impedance current sources.',
      tag: 'Short-Channel Non-Ideality'
    },
  ];

  return (
    <section id="level2" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Model Evolution</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            5. Level 2: Add the First Non-Ideal Corrections
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            "A better map begins to include hills, traffic and weather."
          </p>
        </div>

        {/* Visual Transition Progression Banner */}
        <div className="p-4 sm:p-5 rounded-xl border border-slate-800 bg-slate-900/60 dark:bg-wafer-900/60 light:bg-slate-50 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex-1">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">Baseline</span>
            <div className="font-mono font-bold text-sm text-slate-200">Ideal Level 1</div>
            <div className="text-xs text-slate-400">Pure GCA, constant mobility</div>
          </div>
          <div className="text-cyan-500 font-mono font-bold text-sm flex items-center gap-1">
            <span>↓ Non-Ideal Physics</span>
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">Correction Layer</span>
            <div className="font-mono font-bold text-sm text-slate-200">Real-World Effects</div>
            <div className="text-xs text-slate-400">Body bias, CLM, field decay</div>
          </div>
          <div className="text-cyan-500 font-mono font-bold text-sm flex items-center gap-1">
            <span>↓ Analytical Result</span>
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">Outcome</span>
            <div className="font-mono font-bold text-sm text-slate-200">Level 2 Model</div>
            <div className="text-xs text-slate-400">Grove-Frohman physics</div>
          </div>
        </div>

        {/* 3 Non-Ideal Physics Cards */}
        <div className="space-y-4 mb-8">
          {corrections.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-slate-800 bg-slate-900/70 dark:bg-wafer-900/70 light:bg-white shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-sm font-bold font-mono text-slate-100 dark:text-slate-100 light:text-slate-900">
                  {item.title}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                  {item.tag}
                </span>
              </div>
              
              <p className="text-xs text-slate-300 dark:text-slate-300 leading-relaxed mb-3">
                {item.miss}
              </p>

              <MathBlock math={item.math} allowCopy={true} />

              <div className="text-xs font-mono text-slate-400 mt-2 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{item.note}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Body-Effect Threshold Calculator */}
        <div className="p-5 sm:p-6 rounded-xl border border-cyan-500/30 bg-wafer-950/90 shadow-chip mb-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold">
                Live Body-Effect Threshold Simulator (<MathBlock math="V_{TH}(V_{SB})" displayMode={false} />)
              </h4>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              Shift: +{(vthShift * 1000).toFixed(0)} mV
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Source-to-Body Bias VSB: {vsb.toFixed(2)} V
              </label>
              <input
                type="range"
                min="0"
                max="2.0"
                step="0.05"
                value={vsb}
                onChange={(e) => setVsb(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Zero-Bias VTH0: {vth0.toFixed(2)} V
              </label>
              <input
                type="range"
                min="0.2"
                max="0.8"
                step="0.05"
                value={vth0}
                onChange={(e) => setVth0(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Body Factor γ: {gamma.toFixed(2)} V^0.5
              </label>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={gamma}
                onChange={(e) => setGamma(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>
          </div>

          <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300">Resulting Effective Threshold Voltage VTH:</span>
            <span className="text-sm font-bold text-cyan-400">{totalVth.toFixed(3)} V</span>
          </div>
        </div>

        <p className="text-xs font-mono text-slate-400 italic">
          Level 2 models retain a recognizable analytical structure while adding selected physics. They improve bias and gain estimates, yet they still struggle once the channel becomes short enough for two-dimensional electrostatics.
        </p>

      </div>
    </section>
  );
};

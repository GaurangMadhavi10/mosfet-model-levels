import React, { useState } from 'react';
import { BookOpen, Check, ChevronRight, Calculator, Sliders } from 'lucide-react';
import { MathBlock } from '../UI/MathBlock';

export const SquareLawDerivation: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  // Live calculator states for Level 1
  const [muCox, setMuCox] = useState(200); // μA/V²
  const [wOverL, setWOverL] = useState(10);
  const [vgs, setVgs] = useState(1.0);
  const [vth, setVth] = useState(0.4);

  const beta = (muCox * wOverL); // in μA/V²
  const vov = Math.max(0, vgs - vth);
  const idSat = 0.5 * (beta * 1e-6) * (vov * vov) * 1e3; // mA
  const gm = (beta * 1e-6) * vov * 1e3; // mS
  const ron = vov > 0 ? (1 / ((beta * 1e-6) * vov)) : 0; // Ohms

  const derivationSteps = [
    {
      title: 'Step 1: Local Inversion Charge Density',
      desc: 'Applying Gauss’s law across the gate dielectric, the mobile inversion charge per unit area at channel position x is proportional to local vertical potential difference:',
      latex: 'Q_{inv}(x) = -C_{ox}\\left[V_{GS} - V_{TH} - V(x)\\right]',
      note: 'Here V(x) is the channel potential relative to source (V(0) = 0, V(L) = VDS).'
    },
    {
      title: 'Step 2: Drift Current Continuity',
      desc: 'Assuming carrier transport is governed purely by electric drift without velocity saturation, drain current is the product of mobile charge, width, mobility and electric field -dV/dx:',
      latex: 'I_D = \\mu W \\,|Q_{inv}(x)|\\,\\frac{dV(x)}{dx} = \\mu C_{ox} W \\left[V_{GS} - V_{TH} - V(x)\\right]\\frac{dV}{dx}',
      note: 'Under steady state, current ID must be constant along all cross-sections from x = 0 to x = L.'
    },
    {
      title: 'Step 3: Definite Spatial Integration',
      desc: 'Separating variables and integrating along the physical length from source (x=0, V=0) to drain (x=L, V=VDS):',
      latex: '\\int_0^L I_D\\,dx = \\mu C_{ox} W \\int_0^{V_{DS}} \\left(V_{GS} - V_{TH} - V\\right)dV',
      note: 'The left side yields ID · L, while the right side yields a quadratic polynomial in VDS.'
    },
    {
      title: 'Step 4: Triode Region Current Equation',
      desc: 'Dividing by channel length L gives the classic Level 1 Shichman-Hodges triode equation:',
      latex: 'I_D = \\beta \\left[ (V_{GS} - V_{TH})V_{DS} - \\frac{V_{DS}^2}{2} \\right], \\quad \\beta = \\mu C_{ox}\\frac{W}{L}',
      note: 'In the limit of small VDS, the quadratic term is negligible, yielding an ohmic resistor.'
    },
    {
      title: 'Step 5: Saturation & Pinch-Off Condition',
      desc: 'When VDS reaches the saturation voltage VDS,sat = VGS - VTH = VOV, the channel pinches off at the drain (Qinv(L) → 0). Substituting VDS = VOV:',
      latex: 'I_{D,sat} = \\frac{1}{2}\\beta (V_{GS} - V_{TH})^2 = \\frac{1}{2}\\beta V_{OV}^2',
      note: 'Further increase in VDS is absorbed across the high-field pinch-off region, leaving current virtually constant.'
    }
  ];

  return (
    <section id="level1" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mathematical Rigor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            3. Level 1: The Long-Channel Square-Law Model
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            "The canonical starting point for MOSFET reasoning."
          </p>
        </div>

        {/* Assumptions Box */}
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 dark:bg-wafer-900/60 light:bg-slate-50 mb-8">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center gap-2">
            <span>Foundational Level 1 Assumptions</span>
          </h3>
          <ul className="space-y-2 text-sm text-slate-300 dark:text-slate-300">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span><strong>Gradual Channel Approximation (GCA):</strong> The vertical electric field from the gate dominates channel control; the lateral field along the channel is assumed to vary much more gradually.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span><strong>Constant Mobility & Long Channel:</strong> Carrier mobility <MathBlock math="\mu" displayMode={false} /> is assumed constant. Velocity saturation and Drain-Induced Barrier Lowering (DIBL) are completely neglected.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span><strong>Abrupt Threshold:</strong> Inversion charge is strictly zero below <MathBlock math="V_{TH}" displayMode={false} /> (no subthreshold conduction) and no channel-length modulation in the simplest form.</span>
            </li>
          </ul>
        </div>

        {/* Interactive Step-by-Step Derivation */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-300 font-bold">
              Derivation in One Unified Path
            </h3>
            <span className="text-xs font-mono text-cyan-400">
              Step {activeStep + 1} of {derivationSteps.length}
            </span>
          </div>

          {/* Stepper buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {derivationSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
                  activeStep === idx
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-chip'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {idx + 1}. {step.title.split(':')[1] || step.title}
              </button>
            ))}
          </div>

          {/* Active Step Card */}
          <div className="p-6 rounded-xl border border-cyan-500/40 bg-slate-900/90 dark:bg-wafer-900/90 light:bg-white shadow-chip">
            <div className="text-base font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 mb-2">
              {derivationSteps[activeStep].title}
            </div>
            <p className="text-sm text-slate-300 dark:text-slate-300 mb-3 leading-relaxed">
              {derivationSteps[activeStep].desc}
            </p>
            
            <MathBlock math={derivationSteps[activeStep].latex} allowCopy={true} />

            <div className="text-xs font-mono text-cyan-400/90 bg-cyan-950/40 p-2.5 rounded border border-cyan-500/20 mt-3">
              💡 {derivationSteps[activeStep].note}
            </div>

            <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-800">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="px-3 py-1 text-xs font-mono text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none"
              >
                ← Previous
              </button>
              <button
                onClick={() => setActiveStep(Math.min(derivationSteps.length - 1, activeStep + 1))}
                disabled={activeStep === derivationSteps.length - 1}
                className="px-3 py-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold disabled:opacity-30 disabled:pointer-events-none"
              >
                Next Step →
              </button>
            </div>
          </div>
        </div>

        {/* Live Square-Law Hand Calculator */}
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/70 dark:bg-wafer-900/70 light:bg-slate-50 shadow-sm mb-8">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
            <Calculator className="w-4 h-4 text-cyan-400" />
            <h4 className="text-sm font-mono uppercase tracking-wider text-slate-200 font-bold">
              Level 1 Parameterized Calculation Studio
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                μ·Cox (μA/V²):
              </label>
              <input
                type="number"
                value={muCox}
                onChange={(e) => setMuCox(Math.max(1, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-1.5 rounded bg-wafer-950 border border-slate-700 text-sm font-mono text-cyan-400 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                Aspect Ratio (W / L):
              </label>
              <input
                type="number"
                value={wOverL}
                onChange={(e) => setWOverL(Math.max(0.1, parseFloat(e.target.value) || 0))}
                className="w-full px-3 py-1.5 rounded bg-wafer-950 border border-slate-700 text-sm font-mono text-cyan-400 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                VGS (Volts):
              </label>
              <input
                type="number"
                step="0.05"
                value={vgs}
                onChange={(e) => setVgs(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-1.5 rounded bg-wafer-950 border border-slate-700 text-sm font-mono text-cyan-400 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">
                VTH (Volts):
              </label>
              <input
                type="number"
                step="0.05"
                value={vth}
                onChange={(e) => setVth(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-1.5 rounded bg-wafer-950 border border-slate-700 text-sm font-mono text-cyan-400 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Computed Results Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-lg bg-wafer-950 border border-slate-800 text-center font-mono">
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Overdrive (VOV)</div>
              <div className="text-sm font-bold text-slate-100">{vov.toFixed(3)} V</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Transconductance β</div>
              <div className="text-sm font-bold text-cyan-400">{(beta).toFixed(0)} μA/V²</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Saturation ID,sat</div>
              <div className="text-sm font-bold text-emerald-400">{idSat.toFixed(3)} mA</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 uppercase">Small-Signal gm</div>
              <div className="text-sm font-bold text-amber-400">{gm.toFixed(3)} mS</div>
            </div>
          </div>
        </div>

        {/* Saturation Result Banner from PDF */}
        <div className="p-5 rounded-xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/30 to-blue-950/30">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
            Canonical Saturation Result
          </div>
          <MathBlock math="I_{D,sat} = \frac{1}{2}\beta (V_{GS} - V_{TH})^2 = \frac{1}{2}\beta V_{OV}^2" allowCopy={true} />
          <p className="text-sm text-slate-300 dark:text-slate-300 mt-3 leading-relaxed">
            At pinch-off, <MathBlock math="V_{DS,sat} \approx V_{GS} - V_{TH}" displayMode={false} />. The square law exposes a powerful design intuition: <strong>more overdrive raises current quadratically, while a larger W/L increases current linearly.</strong>
          </p>
        </div>

      </div>
    </section>
  );
};

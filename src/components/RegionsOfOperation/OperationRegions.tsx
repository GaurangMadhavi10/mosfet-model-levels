import React, { useState } from 'react';
import { Activity, Gauge, TrendingUp, Zap, HelpCircle } from 'lucide-react';
import { MathBlock } from '../UI/MathBlock';
import { IVCurveChart } from './IVCurveChart';

export const OperationRegions: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('triode');

  const regions = [
    {
      id: 'cutoff',
      name: 'Cutoff',
      condition: 'VGS < VTH',
      conditionLatex: 'V_{GS} < V_{TH}',
      behavior: 'ID ≈ 0',
      behaviorDesc: 'Off-state switch, subthreshold leakage dominates in nanometer nodes.',
      circuitRole: 'Digital logic "OFF" state, power gating switches.',
      color: 'border-slate-700 bg-slate-900/60 text-slate-300'
    },
    {
      id: 'triode',
      name: 'Triode (Linear / Ohmic)',
      condition: 'VDS < VOV (where VOV = VGS - VTH)',
      conditionLatex: 'V_{DS} < V_{OV} \\quad (V_{GS} > V_{TH})',
      behavior: 'Voltage-controlled resistor',
      behaviorDesc: 'Channel is continuous from source to drain; current increases monotonically with VDS.',
      circuitRole: 'Analog switches, variable attenuators, digital pull-up/pull-down when ON.',
      color: 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300'
    },
    {
      id: 'saturation',
      name: 'Saturation (Active)',
      condition: 'VDS ≥ VOV',
      conditionLatex: 'V_{DS} \\ge V_{OV} \\quad (V_{GS} > V_{TH})',
      behavior: 'Current-source-like behavior',
      behaviorDesc: 'Inversion channel pinches off at drain edge; current saturates at ID,sat = ½β·VOV².',
      circuitRole: 'Analog amplifiers (high output resistance ro), current mirrors, high-gain stages.',
      color: 'border-blue-500/40 bg-blue-950/20 text-blue-300'
    },
  ];

  return (
    <section id="regions" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" />
            <span>Level 1 In Practice</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            4. Regions of Operation and Small-Signal Insight
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            "The same model connects DC bias, gain and switching."
          </p>
        </div>

        {/* Region Checklist Table / Cards */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Region Checklist
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {regions.map((reg) => (
              <div
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`p-5 rounded-xl border transition-all cursor-pointer ${
                  selectedRegion === reg.id
                    ? `${reg.color} ring-1 ring-cyan-500/40 shadow-chip`
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold font-mono text-sm text-slate-100 dark:text-slate-100 light:text-slate-900">
                    {reg.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-400 border border-slate-700">
                    {reg.behavior}
                  </span>
                </div>
                
                <div className="my-2 py-1.5 px-2.5 rounded bg-wafer-950/80 border border-slate-800 text-xs font-mono text-cyan-300">
                  <MathBlock math={reg.conditionLatex} displayMode={false} />
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-2">
                  {reg.behaviorDesc}
                </p>

                <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                  <strong>Circuit Application:</strong> {reg.circuitRole}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive IV Chart */}
        <IVCurveChart />

        {/* Useful Derivatives Section from PDF Page 5 */}
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/70 dark:bg-wafer-900/70 light:bg-slate-50 shadow-sm mb-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-slate-200 font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span>Useful Derivatives & Hand-Calculation Relations</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="p-4 rounded-lg bg-wafer-950 border border-slate-800">
              <div className="text-xs font-mono font-bold text-cyan-400 mb-1 uppercase">
                Small-Signal Transconductance (gm)
              </div>
              <MathBlock math="g_m = \frac{\partial I_D}{\partial V_{GS}} = \beta V_{OV} = \frac{2I_D}{V_{OV}}" allowCopy={true} />
              <p className="text-xs text-slate-400 mt-2">
                Governs voltage gain in amplifiers (<MathBlock math="A_v = -g_m R_L" displayMode={false} />) and transistor transit frequency <MathBlock math="f_T \approx \frac{g_m}{2\pi C_{gg}}" displayMode={false} />.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-wafer-950 border border-slate-800">
              <div className="text-xs font-mono font-bold text-emerald-400 mb-1 uppercase">
                Triode On-Resistance (RDS,on)
              </div>
              <MathBlock math="R_{DS,on}\,(small\,V_{DS}) \approx \frac{1}{\beta(V_{GS} - V_{TH})}" allowCopy={true} />
              <p className="text-xs text-slate-400 mt-2">
                Dictates the switch resistance in digital pass gates, sampling switches, and resistive mixers.
              </p>
            </div>
          </div>

          <p className="text-xs font-mono text-slate-400 leading-relaxed italic bg-slate-950/60 p-3 rounded border border-slate-800">
            These hand-calculation relations are valuable sanity checks. But a real transistor does not preserve constant mobility, a fixed threshold, or an infinite output resistance. Those gaps motivate the next levels.
          </p>
        </div>

      </div>
    </section>
  );
};

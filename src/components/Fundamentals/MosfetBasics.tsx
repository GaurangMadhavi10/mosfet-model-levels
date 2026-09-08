import React from 'react';
import { Layers, Sliders, Zap, CheckCircle2 } from 'lucide-react';
import { MosfetVariable } from '../../types/mosfet';
import { MathBlock } from '../UI/MathBlock';
import { Callout } from '../UI/Callout';
import { Mosfet2DDiagram } from './Mosfet2DDiagram';

export const MosfetBasics: React.FC = () => {
  const variables: MosfetVariable[] = [
    {
      symbol: 'VGS',
      latex: 'V_{GS}',
      name: 'Gate-to-Source Voltage',
      unit: 'Volts (V)',
      description: 'Controls vertical electric field and induces the mobile inversion charge layer at the oxide-silicon interface.',
      typicalValue: '0.6 - 1.2 V',
      role: 'Control Terminal'
    },
    {
      symbol: 'VDS',
      latex: 'V_{DS}',
      name: 'Drain-to-Source Voltage',
      unit: 'Volts (V)',
      description: 'Establishes the lateral drift electric field along the channel length, driving carrier transport.',
      typicalValue: '0.1 - 1.2 V',
      role: 'Output Terminal'
    },
    {
      symbol: 'VTH',
      latex: 'V_{TH}',
      name: 'Threshold Voltage',
      unit: 'Volts (V)',
      description: 'Minimum gate potential required to achieve strong inversion (surface potential reaches 2φF).',
      typicalValue: '0.3 - 0.5 V',
      role: 'Device Parameter'
    },
    {
      symbol: 'W / L',
      latex: 'W / L',
      name: 'Geometry Aspect Ratio',
      unit: 'Dimensionless (μm/μm)',
      description: 'Channel width W determines total current capacity; channel length L governs electrostatic control and transit time.',
      typicalValue: '1μm / 60nm',
      role: 'Design Variable'
    },
    {
      symbol: 'Cox',
      latex: 'C_{ox}',
      name: 'Oxide Capacitance per Area',
      unit: 'fF / μm²',
      description: 'Specific gate capacitance Cox = εox / tox. Thinner oxide tox provides stronger gate electrostatic control.',
      typicalValue: '10 - 25 fF/μm²',
      role: 'Technology Parameter'
    },
    {
      symbol: 'μ',
      latex: '\\mu',
      name: 'Carrier Mobility',
      unit: 'cm² / (V·s)',
      description: 'Carrier drift velocity per unit electric field (μn for electrons in nMOS, μp for holes in pMOS).',
      typicalValue: '300 - 600 cm²/(V·s)',
      role: 'Material Constant'
    },
  ];

  return (
    <section id="fundamentals" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>Theoretical Foundations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            2. MOSFET Fundamentals: Turning Voltage into Current
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            "A field-controlled resistor becomes a current source in saturation."
          </p>
        </div>

        {/* Core Variables Grid */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3">
            Core State & Technology Variables
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {variables.map((v) => (
              <div
                key={v.symbol}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 dark:bg-wafer-900/60 light:bg-slate-50 hover:border-cyan-500/40 transition-all group shadow-sm"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="text-base font-bold font-mono text-cyan-400 group-hover:text-cyan-300">
                    <MathBlock math={v.latex} displayMode={false} />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {v.role}
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-200 dark:text-slate-200 light:text-slate-900 mb-1">
                  {v.name}
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-400 leading-relaxed mb-2">
                  {v.description}
                </p>
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Unit: {v.unit}</span>
                  <span className="text-slate-400">Typ: {v.typicalValue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Description */}
        <div className="p-5 rounded-xl border border-slate-800/80 bg-slate-900/40 dark:bg-wafer-900/40 light:bg-white text-sm text-slate-300 dark:text-slate-300 leading-relaxed mb-6">
          <p className="mb-2">
            For an <strong>nMOS device</strong>, applying a positive gate-to-source bias (<MathBlock math="V_{GS}" displayMode={false} />) attracts mobile electrons under the gate dielectric. When <MathBlock math="V_{GS}" displayMode={false} /> exceeds the threshold voltage (<MathBlock math="V_{TH}" displayMode={false} />), a continuous electron <strong>inversion channel</strong> bridges the <MathBlock math="n^+" displayMode={false} /> source and drain wells across the p-type substrate.
          </p>
          <p>
            Applying a drain-to-source voltage (<MathBlock math="V_{DS}" displayMode={false} />) then sets up a lateral electric field along the channel length <MathBlock math="L" displayMode={false} />, accelerating the inversion charge carriers and creating the macroscopic drain current <MathBlock math="I_D" displayMode={false} />.
          </p>
        </div>

        {/* Interactive 2D Cross Section */}
        <Mosfet2DDiagram />

        {/* Modeling Assumption Callout */}
        <Callout type="important" title="MODELING ASSUMPTION">
          A compact model compresses complex device physics into a computationally efficient set of equations and parameters. The target is not a pretty curve; <strong>it is reliable circuit prediction across bias, process and temperature.</strong>
        </Callout>

      </div>
    </section>
  );
};

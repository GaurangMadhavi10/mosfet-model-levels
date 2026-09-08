import React, { useState } from 'react';
import { Database, CheckSquare, Square, ArrowRight } from 'lucide-react';
import { MathBlock } from '../UI/MathBlock';

export const ExtractionPipeline: React.FC = () => {
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({
    0: true,
    1: true,
    2: true,
  });

  const categories = [
    {
      num: 1,
      title: 'DC I–V Measurement',
      curves: 'ID–VG and ID–VD Sweeps',
      target: 'Threshold voltage (VTH), drive current (Ion), output conductance (gds), subthreshold swing (SS), and DIBL shift.',
      testStructures: 'Transistor arrays across varied W and L matrix.',
      color: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300'
    },
    {
      num: 2,
      title: 'C–V Characterization',
      curves: 'Cgg, Cgd, Cgs, Cdb, Cgb',
      target: 'Terminal charges, intrinsic gate capacitance, source/drain junction capacitances, and overlap fringing components.',
      testStructures: 'Split-CV large-area MOS capacitors & RF multi-finger layouts.',
      color: 'border-sky-500/50 bg-sky-950/20 text-sky-300'
    },
    {
      num: 3,
      title: 'AC / RF Characterization',
      curves: 'Multi-port S-Parameters (0.1 - 100 GHz)',
      target: 'High-frequency gate resistance Rg, substrate network, transit frequency fT, maximum oscillation frequency fmax, and NQS delay.',
      testStructures: 'Ground-Signal-Ground (GSG) coplanar pads with de-embedding.',
      color: 'border-purple-500/50 bg-purple-950/20 text-purple-300'
    },
  ];

  const validationQuestions = [
    {
      id: 0,
      question: 'Does the model reproduce ID–VG in both subthreshold and strong inversion without slope kinks?',
      desc: 'Ensures subthreshold slope (60-100 mV/dec) transitions smoothly into linear/saturation regimes for low-power and high-speed operation.'
    },
    {
      id: 1,
      question: 'Are all terminal capacitances physically plausible and strictly charge-conserving?',
      desc: 'Checks that Σ Qi = 0 and dynamic transcapacitances (Cij = -∂Qi/∂Vj) are smooth and non-negative along diagonal elements.'
    },
    {
      id: 2,
      question: 'Do ring oscillators, SRAM bitcells, and analog test circuits correlate accurately across PVT corners?',
      desc: 'Verifies circuit-level propagation delays, static noise margins (SNM), and phase noise match physical silicon wafer measurements.'
    }
  ];

  const toggleCheck = (id: number) => {
    setCheckedQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="extraction" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5" />
            <span>Parameter Extraction</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            11. From Wafer Data to a Predictive Model
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            "Measurements anchor equations to the manufactured transistor."
          </p>
        </div>

        {/* 3 Measurement Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {categories.map((c) => (
            <div
              key={c.num}
              className={`p-5 rounded-xl border ${c.color} bg-slate-900/70 dark:bg-wafer-900/70 light:bg-white shadow-sm flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-700 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs">
                    {c.num}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400/90">
                    Measurement
                  </span>
                </div>
                <h3 className="font-bold font-mono text-base text-slate-100 dark:text-slate-100 light:text-slate-900 mb-1">
                  {c.title}
                </h3>
                <div className="text-xs font-mono text-cyan-300 mb-3">
                  {c.curves}
                </div>
                <p className="text-xs text-slate-300 dark:text-slate-300 leading-relaxed mb-4">
                  <strong>Targets:</strong> {c.target}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                <strong>Testkey Structure:</strong> {c.testStructures}
              </div>
            </div>
          ))}
        </div>

        {/* Pipeline Strip */}
        <div className="p-4 rounded-xl border border-slate-800 bg-wafer-950 text-center font-mono text-xs text-slate-300 mb-8 flex flex-wrap items-center justify-center gap-3">
          <span className="text-cyan-400 font-bold">Wafer Probing</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-cyan-400 font-bold">Parameter Fitting</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-cyan-400 font-bold">Model QA Validation</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-emerald-400 font-bold">Release PDK Corner Models (TT, FF, SS)</span>
        </div>

        {/* Extraction Is Not One Curve Fit Note */}
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/70 dark:bg-wafer-900/70 light:bg-slate-50 mb-8 shadow-sm">
          <h3 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider mb-2">
            Extraction Is Not One Curve Fit
          </h3>
          <p className="text-sm text-slate-300 dark:text-slate-300 leading-relaxed mb-6">
            A robust parameter extraction flow fits multiple geometries (<MathBlock math="L_{min} \dots L_{max}, W_{min} \dots W_{max}" displayMode={false} />), bias points, and temperatures simultaneously. Parameters are mathematically and physically constrained so that a fix to one plot does not break another. Correlation is systematically checked on isolated devices and representative circuit benchmark macros.
          </p>

          {/* Interactive Validation Questions Checklist */}
          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3">
              Good Validation Questions Checklist
            </h4>
            <div className="space-y-3">
              {validationQuestions.map((q) => {
                const isChecked = checkedQuestions[q.id];
                return (
                  <div
                    key={q.id}
                    onClick={() => toggleCheck(q.id)}
                    className={`p-3.5 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'border-cyan-500/40 bg-cyan-950/20 shadow-sm'
                        : 'border-slate-800 bg-wafer-950/60 opacity-60'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="text-xs font-bold text-slate-200 font-mono">
                        {q.question}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 leading-relaxed font-sans">
                        {q.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

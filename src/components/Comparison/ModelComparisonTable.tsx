import React, { useState } from 'react';
import { Table, Search, CheckCircle, AlertTriangle, ShieldCheck, Layers } from 'lucide-react';
import { ModelComparisonRow } from '../../types/mosfet';
import { Callout } from '../UI/Callout';

export const ModelComparisonTable: React.FC = () => {
  const [filterText, setFilterText] = useState('');

  const rows: ModelComparisonRow[] = [
    {
      model: 'Level 1 (Shichman-Hodges)',
      bestUse: 'education & classroom',
      captures: 'square-law, cutoff/triode/saturation regions',
      limits: 'no short channel, no DIBL, no velocity saturation',
      typicalEra: 'long channel (> 3μm)',
      equationForm: 'Algebraic closed-form polynomial',
      parameterCount: '3 - 5 parameters',
      multiGate: false,
    },
    {
      model: 'Level 2 (Grove-Frohman)',
      bestUse: 'hand design & intuition',
      captures: 'body effect (γ), mobility degradation, CLM (λ)',
      limits: 'limited geometric scaling, 2D electrostatic breakdown',
      typicalEra: 'legacy planar (1μm - 3μm)',
      equationForm: 'Semi-physical analytical with 3/2 power terms',
      parameterCount: '15 - 25 parameters',
      multiGate: false,
    },
    {
      model: 'Level 3 (Semi-Empirical)',
      bestUse: 'legacy SPICE decks',
      captures: 'empirical short-channel, velocity saturation, DIBL',
      limits: 'not valid for modern sign-off, parameter non-physicality',
      typicalEra: 'legacy submicron (0.5μm - 1μm)',
      equationForm: 'Empirical curve fitting polynomials',
      parameterCount: '25 - 40 parameters',
      multiGate: false,
    },
    {
      model: 'BSIM4 (Surface-Potential / Charge)',
      bestUse: 'planar foundry PDK',
      captures: 'PVT, terminal charge conservation, gate tunneling leakage, noise, stress',
      limits: 'planar bulk & SOI focus (cannot model 3D multi-gate)',
      typicalEra: 'deep submicron / nanometer planar (180nm - 28nm)',
      equationForm: 'Unified physical charge-sheet & surface potential',
      parameterCount: '100 - 250+ parameters',
      multiGate: false,
    },
    {
      model: 'BSIM-CMG (Common Multi-Gate)',
      bestUse: 'FinFET & GAA PDK',
      captures: '3D multi-gate electrostatics, fin perimeter, nanosheets, quantum confinement',
      limits: 'requires extensive foundry test structure characterization data',
      typicalEra: 'advanced nodes (16nm down to 2nm & beyond)',
      equationForm: 'Multi-gate core electrostatics & 3D parasitics',
      parameterCount: '200 - 400+ parameters',
      multiGate: true,
    },
  ];

  const filteredRows = rows.filter(r => 
    r.model.toLowerCase().includes(filterText.toLowerCase()) ||
    r.bestUse.toLowerCase().includes(filterText.toLowerCase()) ||
    r.captures.toLowerCase().includes(filterText.toLowerCase()) ||
    r.typicalEra.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <section id="comparison" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <Table className="w-3.5 h-3.5" />
            <span>Comparison Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            14. Choosing a MOSFET Model Level
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            "Match fidelity to the decision you are trying to make."
          </p>
        </div>

        {/* Filter Input */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search model, feature, or era..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-wafer-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">
            Showing {filteredRows.length} of {rows.length} models
          </span>
        </div>

        {/* Responsive Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/80 dark:bg-wafer-900/80 light:bg-white overflow-hidden shadow-chip mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="bg-wafer-950/90 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4 font-semibold">Model Level</th>
                  <th className="py-3 px-4 font-semibold">Best Use</th>
                  <th className="py-3 px-4 font-semibold">Captures</th>
                  <th className="py-3 px-4 font-semibold">Limits</th>
                  <th className="py-3 px-4 font-semibold">Typical Era</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredRows.map((r, idx) => (
                  <tr
                    key={r.model}
                    className="hover:bg-cyan-950/20 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">
                      <div className="flex items-center gap-1.5">
                        <span>{r.model}</span>
                        {r.multiGate && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-950 text-amber-300 border border-amber-500/30">
                            3D Multi-Gate
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-cyan-300 font-semibold">
                      {r.bestUse}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 dark:text-slate-300">
                      {r.captures}
                    </td>
                    <td className="py-3.5 px-4 text-rose-300/90">
                      {r.limits}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {r.typicalEra}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Decision Rule from PDF Page 15 */}
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/70 dark:bg-wafer-900/70 light:bg-slate-50 mb-6 shadow-sm">
          <h3 className="text-sm font-bold font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>The Engineer's Decision Rule</span>
          </h3>
          <ul className="space-y-2 text-sm text-slate-300 dark:text-slate-300 leading-relaxed font-sans mb-4">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span><strong>For learning:</strong> Begin with Level 1 and explain which underlying physical assumption drives each observed analytical result.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span><strong>For design decisions:</strong> Use the foundry-qualified compact model named and configured by the PDK.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <span><strong>For sign-off verification:</strong> Validate with corners, statistical mismatch (Monte Carlo), and extracted RC parasitics appropriate to the specific circuit block.</span>
            </li>
          </ul>

          {/* Banner from PDF */}
          <div className="p-4 rounded-lg bg-gradient-to-r from-purple-950/40 via-cyan-950/40 to-blue-950/40 border border-purple-500/40 text-center">
            <div className="font-mono font-extrabold text-sm sm:text-base text-purple-300 uppercase tracking-wider">
              MODEL COMPLEXITY IS NOT A SUBSTITUTE FOR VERIFICATION
            </div>
            <div className="text-xs font-mono text-cyan-300 mt-1">
              Calibration + simulation setup + review = credible prediction
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Terminal, Copy, Check, Info, ShieldAlert, Cpu, Code2 } from 'lucide-react';
import { Callout } from '../UI/Callout';

export const SpiceCodeInspector: React.FC = () => {
  const [selectedToken, setSelectedToken] = useState<string | null>('nmos_lvt');
  const [copied, setCopied] = useState(false);

  const tokenExplanations: Record<string, { label: string; desc: string; type: string; rule: string }> = {
    'M1': {
      label: 'Instance Name (M1)',
      desc: 'Transistor device instance designator in SPICE netlist.',
      type: 'Device Instance',
      rule: 'Prefix "M" designates a 4-terminal or multi-gate MOSFET primitive.'
    },
    'out': {
      label: 'Drain Node (out)',
      desc: 'First connectivity terminal: Drain connection node of the transistor.',
      type: 'Circuit Node',
      rule: 'Node order standard in SPICE: Drain, Gate, Source, Bulk.'
    },
    'in': {
      label: 'Gate Node (in)',
      desc: 'Second connectivity terminal: Gate control input node.',
      type: 'Circuit Node',
      rule: 'Receives the high-speed switching pulse from testbench voltage source.'
    },
    '0': {
      label: 'Ground Reference (0)',
      desc: 'Reference node 0 (Global Ground). Source and Bulk are tied to ground in this nMOS inverter testbench.',
      type: 'Reference Ground',
      rule: 'Node 0 is the universal zero-potential datum for nodal analysis.'
    },
    'nmos_lvt': {
      label: 'Model Name (nmos_lvt)',
      desc: 'PDK-defined Low-VTH nMOS foundry compact model card identifier.',
      type: 'Foundry Model Name',
      rule: 'Resolved directly by the PDK include statements. Encapsulates 100+ calibrated BSIM4/BSIM-CMG equations.'
    },
    'W=1u': {
      label: 'Channel Width (W=1u)',
      desc: 'Total drawn transistor width of 1 micrometer (1.0 × 10⁻⁶ m).',
      type: 'Geometric Parameter',
      rule: 'Determines the total channel drive current and gate capacitance.'
    },
    'L=60n': {
      label: 'Channel Length (L=60n)',
      desc: 'Drawn gate length of 60 nanometers (60 × 10⁻⁹ m).',
      type: 'Geometric Parameter',
      rule: 'Constrained by the foundry design rule manual (DRM) minimum feature size.'
    },
    'NF=2': {
      label: 'Number of Fingers (NF=2)',
      desc: 'Layout finger count: splits the total width into two parallel fingers (each W/NF = 0.5μm).',
      type: 'Layout Parameter',
      rule: 'Reduces gate resistance Rg by 4x and halves drain diffusion parasitic capacitance.'
    },
    'PULSE': {
      label: 'PULSE Source Definition',
      desc: 'PULSE(V1 V2 Tdelay Trise Tfall Ton Tperiod): Generates a 0.8V rail-to-rail digital clock waveform.',
      type: 'Stimulus Directive',
      rule: 'Defines 20ps rise/fall times with 200ps pulse width and 400ps period.'
    },
    '.tran': {
      label: 'Transient Analysis (.tran 1p 2n)',
      desc: 'Runs dynamic non-linear time-domain simulation for 2 nanoseconds with 1 picosecond maximum integration step size.',
      type: 'Simulation Control',
      rule: 'Uses numerical integration algorithms (Trapezoidal / Gear) to calculate charge movement.'
    },
    '.measure': {
      label: 'Automated Measurement (.measure tran tpd)',
      desc: 'Calculates propagation delay tpd from 50% input threshold (0.4V) rise to 50% output threshold fall.',
      type: 'Post-Processing',
      rule: 'Essential for automated standard cell library timing characterization.'
    }
  };

  const spiceCode = `* nMOS using a PDK-provided model name
M1 out in 0 0 nmos_lvt W=1u L=60n NF=2
VDD vdd 0 0.8
VIN in 0 PULSE(0 0.8 0 20p 20p 200p 400p)
.tran 1p 2n
.measure tran tpd TRIG v(in) VAL=0.4 RISE=1
+ TARG v(out) VAL=0.4 FALL=1`;

  const handleCopy = () => {
    navigator.clipboard.writeText(spiceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="spice-card" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5" />
            <span>SPICE / Model Examples</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            10. Model Cards: What a Designer Actually Sees
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            "A netlist instantiates a device; the PDK supplies its calibrated behavior."
          </p>
        </div>

        {/* Dark Code Editor Block */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden mb-6">
          
          {/* Editor Titlebar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-slate-400 ml-2">
                inverter_tpd_testbench.sp — SPICE Netlist
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy SPICE'}</span>
            </button>
          </div>

          {/* Code Content with Interactive Clickable Tokens */}
          <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-slate-200">
            <div className="text-slate-500 italic mb-2 select-none">
              * nMOS using a PDK-provided model name
            </div>

            <div className="space-x-1.5 py-0.5">
              <span
                onClick={() => setSelectedToken('M1')}
                className={`cursor-pointer px-1 py-0.5 rounded transition-all ${
                  selectedToken === 'M1' ? 'bg-cyan-500/30 text-cyan-300 ring-1 ring-cyan-400' : 'text-amber-400 hover:bg-slate-800'
                }`}
              >
                M1
              </span>
              <span
                onClick={() => setSelectedToken('out')}
                className={`cursor-pointer px-1 py-0.5 rounded transition-all ${
                  selectedToken === 'out' ? 'bg-cyan-500/30 text-cyan-300 ring-1 ring-cyan-400' : 'text-sky-300 hover:bg-slate-800'
                }`}
              >
                out
              </span>
              <span
                onClick={() => setSelectedToken('in')}
                className={`cursor-pointer px-1 py-0.5 rounded transition-all ${
                  selectedToken === 'in' ? 'bg-cyan-500/30 text-cyan-300 ring-1 ring-cyan-400' : 'text-sky-300 hover:bg-slate-800'
                }`}
              >
                in
              </span>
              <span
                onClick={() => setSelectedToken('0')}
                className={`cursor-pointer px-1 py-0.5 rounded transition-all ${
                  selectedToken === '0' ? 'bg-cyan-500/30 text-cyan-300 ring-1 ring-cyan-400' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                0 0
              </span>
              <span
                onClick={() => setSelectedToken('nmos_lvt')}
                className={`cursor-pointer font-bold px-1.5 py-0.5 rounded transition-all ${
                  selectedToken === 'nmos_lvt' ? 'bg-cyan-500 text-slate-950 ring-1 ring-cyan-300' : 'text-emerald-400 hover:bg-slate-800'
                }`}
              >
                nmos_lvt
              </span>
              <span
                onClick={() => setSelectedToken('W=1u')}
                className={`cursor-pointer px-1 py-0.5 rounded transition-all ${
                  selectedToken === 'W=1u' ? 'bg-cyan-500/30 text-cyan-300 ring-1 ring-cyan-400' : 'text-purple-300 hover:bg-slate-800'
                }`}
              >
                W=1u
              </span>
              <span
                onClick={() => setSelectedToken('L=60n')}
                className={`cursor-pointer px-1 py-0.5 rounded transition-all ${
                  selectedToken === 'L=60n' ? 'bg-cyan-500/30 text-cyan-300 ring-1 ring-cyan-400' : 'text-purple-300 hover:bg-slate-800'
                }`}
              >
                L=60n
              </span>
              <span
                onClick={() => setSelectedToken('NF=2')}
                className={`cursor-pointer px-1 py-0.5 rounded transition-all ${
                  selectedToken === 'NF=2' ? 'bg-cyan-500/30 text-cyan-300 ring-1 ring-cyan-400' : 'text-purple-300 hover:bg-slate-800'
                }`}
              >
                NF=2
              </span>
            </div>

            <div className="py-0.5 text-slate-400">
              <span>VDD vdd 0 0.8</span>
            </div>

            <div className="space-x-1.5 py-0.5">
              <span>VIN in 0</span>
              <span
                onClick={() => setSelectedToken('PULSE')}
                className={`cursor-pointer px-1 py-0.5 rounded transition-all ${
                  selectedToken === 'PULSE' ? 'bg-cyan-500/30 text-cyan-300 ring-1 ring-cyan-400' : 'text-yellow-400 hover:bg-slate-800'
                }`}
              >
                PULSE(0 0.8 0 20p 20p 200p 400p)
              </span>
            </div>

            <div className="space-x-1.5 py-0.5">
              <span
                onClick={() => setSelectedToken('.tran')}
                className={`cursor-pointer px-1 py-0.5 rounded transition-all ${
                  selectedToken === '.tran' ? 'bg-cyan-500/30 text-cyan-300 ring-1 ring-cyan-400' : 'text-rose-400 font-bold hover:bg-slate-800'
                }`}
              >
                .tran 1p 2n
              </span>
            </div>

            <div className="space-x-1.5 py-0.5">
              <span
                onClick={() => setSelectedToken('.measure')}
                className={`cursor-pointer px-1 py-0.5 rounded transition-all ${
                  selectedToken === '.measure' ? 'bg-cyan-500/30 text-cyan-300 ring-1 ring-cyan-400' : 'text-rose-400 font-bold hover:bg-slate-800'
                }`}
              >
                .measure tran tpd TRIG v(in) VAL=0.4 RISE=1
              </span>
            </div>
            <div className="text-slate-400 pl-4 select-none">
              + TARG v(out) VAL=0.4 FALL=1
            </div>

          </div>

          {/* Interactive Token Inspector Ribbon */}
          {selectedToken && tokenExplanations[selectedToken] && (
            <div className="p-4 bg-wafer-900 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono animate-fade-in">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-cyan-400 text-sm">
                    {tokenExplanations[selectedToken].label}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 text-[10px] border border-cyan-500/30">
                    {tokenExplanations[selectedToken].type}
                  </span>
                </div>
                <div className="text-slate-300 text-xs mt-1">
                  {tokenExplanations[selectedToken].desc}
                </div>
              </div>
              <div className="text-slate-400 text-[11px] bg-slate-950/80 p-2 rounded border border-slate-800/80 sm:max-w-xs">
                <strong>PDK Significance:</strong> {tokenExplanations[selectedToken].rule}
              </div>
            </div>
          )}
        </div>

        {/* Read It Carefully Notes from PDF */}
        <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/60 dark:bg-wafer-900/60 light:bg-slate-50 mb-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-300 font-bold mb-3 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>Read It Carefully: Netlist vs PDK Contract</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-300 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
              <span><strong>Model Name Resolution:</strong> The model name <code className="font-mono text-cyan-300 bg-slate-800 px-1 py-0.5 rounded">nmos_lvt</code> is resolved from the technology library, not invented in the schematic.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
              <span><strong>Geometric Constraints:</strong> Parameters <code className="font-mono text-cyan-300 bg-slate-800 px-1 py-0.5 rounded">W</code>, <code className="font-mono text-cyan-300 bg-slate-800 px-1 py-0.5 rounded">L</code>, and <code className="font-mono text-cyan-300 bg-slate-800 px-1 py-0.5 rounded">NF</code> select physical geometry; PDK rules constrain legal values and snap to layout grids.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
              <span><strong>Corner Files:</strong> Corner files alter model parameters for process and temperature; supply voltage is a testbench condition.</span>
            </li>
          </ul>
        </div>

        {/* Caution Callout from PDF */}
        <Callout type="caution" title="CAUTION: SILICON CORRELATION PRINCIPLE">
          <strong>Do not replace a foundry BSIM/CMG model with a Level 1 line and expect silicon correlation.</strong> Level 1 is excellent for learning; sign-off requires the qualified PDK model and extraction-aware simulation.
        </Callout>

      </div>
    </section>
  );
};

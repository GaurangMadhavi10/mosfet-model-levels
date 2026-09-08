import React, { useState } from 'react';
import { Box, Layers, Cpu, Flame, Sliders, Sparkles } from 'lucide-react';
import { MathBlock } from '../UI/MathBlock';
import { Callout } from '../UI/Callout';

export const MultiGateEvolution: React.FC = () => {
  const [deviceType, setDeviceType] = useState<'finfet' | 'gaa'>('finfet');

  // FinFET parameters
  const [hfin, setHfin] = useState(45); // nm
  const [wfin, setWfin] = useState(8);  // nm
  const [numFins, setNumFins] = useState(2);
  const finWeff = numFins * (2 * hfin + wfin);

  // GAA parameters
  const [nsheets, setNsheets] = useState(3);
  const [wsheet, setWsheet] = useState(30); // nm
  const [tsheet, setTsheet] = useState(6);  // nm
  const gaaWeff = nsheets * 2 * (wsheet + tsheet);

  return (
    <section id="finfet-gaa" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <Box className="w-3.5 h-3.5" />
            <span>3D Transistors</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            13. FinFET and GAA: New Shapes Need New Models
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            "Geometry changes the electrostatics, the parasitics and the compact-model equations."
          </p>
        </div>

        {/* 3D Visualizer Cards: FinFET vs GAA Nanosheet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Card 1: FINFET */}
          <div 
            onClick={() => setDeviceType('finfet')}
            className={`p-6 rounded-xl border transition-all cursor-pointer ${
              deviceType === 'finfet'
                ? 'border-cyan-400 bg-cyan-950/20 shadow-chip ring-1 ring-cyan-500/40'
                : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono font-bold text-base text-slate-100 dark:text-slate-100 light:text-slate-900">
                FINFET (Tri-Gate Architecture)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                GATE (3 Sides)
              </span>
            </div>

            {/* FinFET Cross-section SVG */}
            <div className="my-4 p-4 rounded-lg bg-wafer-950 border border-slate-800 text-center">
              <svg viewBox="0 0 260 160" className="w-full max-w-[200px] mx-auto select-none">
                {/* Substrate */}
                <rect x="20" y="125" width="220" height="30" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <text x="130" y="145" textAnchor="middle" fill="#64748b" className="font-mono text-[9px]">Substrate / Oxide</text>

                {/* Vertical Silicon Fin Channel */}
                <rect x="115" y="45" width="30" height="80" rx="2" fill="#10b981" stroke="#34d399" strokeWidth="1.5" />
                <text x="130" y="90" textAnchor="middle" fill="#ecfdf5" className="font-mono text-[9px] font-bold">Si Fin</text>

                {/* Gate dielectric wrapping 3 sides */}
                <path d="M 105 125 L 105 38 L 155 38 L 155 125" fill="none" stroke="#38bdf8" strokeWidth="3" />

                {/* Metal Gate wrapping top and 2 side walls */}
                <path d="M 85 125 L 85 25 L 175 25 L 175 125 L 158 125 L 158 42 L 102 42 L 102 125 Z" fill="#3b82f6" fillOpacity="0.75" stroke="#60a5fa" strokeWidth="1" />
                <text x="130" y="36" textAnchor="middle" fill="#ffffff" className="font-mono text-[9px] font-bold">GATE (3 sides)</text>
              </svg>
              <div className="text-[11px] font-mono text-cyan-400 mt-2">
                Vertical Fin Channel • Effective Width: <MathBlock math="W_{eff} = 2H_{fin} + W_{fin}" displayMode={false} />
              </div>
            </div>

            <p className="text-xs text-slate-300 dark:text-slate-300 leading-relaxed">
              Gate wraps around 3 sides of a vertical silicon fin, suppressing short-channel DIBL without heavy channel doping.
            </p>
          </div>

          {/* Card 2: GAA NANOSHEET */}
          <div 
            onClick={() => setDeviceType('gaa')}
            className={`p-6 rounded-xl border transition-all cursor-pointer ${
              deviceType === 'gaa'
                ? 'border-sky-400 bg-sky-950/20 shadow-chip ring-1 ring-sky-500/40'
                : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono font-bold text-base text-slate-100 dark:text-slate-100 light:text-slate-900">
                GAA NANOSHEET (Gate-All-Around)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-500/30">
                GATE (360° Wrap)
              </span>
            </div>

            {/* GAA Cross-section SVG */}
            <div className="my-4 p-4 rounded-lg bg-wafer-950 border border-slate-800 text-center">
              <svg viewBox="0 0 260 160" className="w-full max-w-[200px] mx-auto select-none">
                {/* Metal Gate surrounding all nanosheets */}
                <rect x="50" y="15" width="160" height="135" rx="4" fill="#3b82f6" fillOpacity="0.7" stroke="#60a5fa" strokeWidth="1" />
                <text x="130" y="27" textAnchor="middle" fill="#ffffff" className="font-mono text-[9px] font-bold">GATE (360° wrap)</text>

                {/* Nanosheet 1 */}
                <rect x="80" y="38" width="100" height="16" rx="2" fill="#10b981" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="130" y="50" textAnchor="middle" fill="#ecfdf5" className="font-mono text-[8px] font-bold">Sheet 3</text>

                {/* Nanosheet 2 */}
                <rect x="80" y="70" width="100" height="16" rx="2" fill="#10b981" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="130" y="82" textAnchor="middle" fill="#ecfdf5" className="font-mono text-[8px] font-bold">Sheet 2</text>

                {/* Nanosheet 3 */}
                <rect x="80" y="102" width="100" height="16" rx="2" fill="#10b981" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="130" y="114" textAnchor="middle" fill="#ecfdf5" className="font-mono text-[8px] font-bold">Sheet 1</text>
              </svg>
              <div className="text-[11px] font-mono text-sky-400 mt-2">
                Stacked Nanosheet Channels • <MathBlock math="W_{eff} = 2 N_{sheets}(W_{sheet} + T_{sheet})" displayMode={false} />
              </div>
            </div>

            <p className="text-xs text-slate-300 dark:text-slate-300 leading-relaxed">
              Gate wraps 360° around vertically stacked silicon sheets, maximizing electrostatic control and drive current per footprint.
            </p>
          </div>

        </div>

        {/* Modeling Implications Grid from PDF Page 14 */}
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/70 dark:bg-wafer-900/70 light:bg-white mb-8 shadow-sm">
          <h3 className="text-sm font-bold font-mono text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Modeling Implications for 3D Devices</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            
            <div className="p-4 rounded-lg bg-wafer-950 border border-slate-800">
              <div className="text-xs font-mono font-bold text-cyan-400 mb-1 uppercase">
                Perimeter Effective Width (Weff)
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Effective width depends on 3D fin perimeter (<MathBlock math="2H_{fin} + W_{fin}" displayMode={false} />) or nanosheet perimeter (<MathBlock math="2(W_{sheet} + T_{sheet})" displayMode={false} />), quantized by integer fin/sheet counts rather than continuous planar W.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-wafer-950 border border-slate-800">
              <div className="text-xs font-mono font-bold text-amber-400 mb-1 uppercase">
                Self-Heating & Quantum Effects
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Narrow silicon bodies confine phonons and heat, increasing thermal resistance <MathBlock math="R_{th}" displayMode={false} />. Quantum subband splitting shifts threshold voltage and modifies effective density of states.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-wafer-950 border border-slate-800">
              <div className="text-xs font-mono font-bold text-emerald-400 mb-1 uppercase">
                BSIM-CMG Standard Model
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                BSIM-CMG (Common Multi-Gate) uses core surface-potential physics derived for cylindrical/rectangular multi-gate boundaries, capturing 3D corner rounding and cross-coupling capacitances.
              </p>
            </div>

          </div>

          {/* Interactive Effective Width Calculator */}
          <div className="p-4 rounded-lg bg-wafer-950 border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold text-slate-300 uppercase">
                Live {deviceType === 'finfet' ? 'FinFET' : 'GAA Nanosheet'} Effective Width (<MathBlock math="W_{eff}" displayMode={false} />) Calculator
              </span>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                Total Weff: {deviceType === 'finfet' ? finWeff : gaaWeff} nm
              </span>
            </div>

            {deviceType === 'finfet' ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">Fin Height (Hfin): {hfin} nm</label>
                  <input
                    type="range"
                    min="20"
                    max="70"
                    value={hfin}
                    onChange={(e) => setHfin(parseInt(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Fin Width (Wfin): {wfin} nm</label>
                  <input
                    type="range"
                    min="4"
                    max="20"
                    value={wfin}
                    onChange={(e) => setWfin(parseInt(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Number of Fins (Nfin): {numFins}</label>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={numFins}
                    onChange={(e) => setNumFins(parseInt(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">Sheet Width (Wsheet): {wsheet} nm</label>
                  <input
                    type="range"
                    min="15"
                    max="60"
                    value={wsheet}
                    onChange={(e) => setWsheet(parseInt(e.target.value))}
                    className="w-full accent-sky-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Sheet Thickness (Tsheet): {tsheet} nm</label>
                  <input
                    type="range"
                    min="3"
                    max="12"
                    value={tsheet}
                    onChange={(e) => setTsheet(parseInt(e.target.value))}
                    className="w-full accent-sky-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Stacked Sheets (Nsheets): {nsheets}</label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={nsheets}
                    onChange={(e) => setNsheets(parseInt(e.target.value))}
                    className="w-full accent-sky-400"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Takeaway Callout from PDF Page 14 */}
        <Callout type="tip" title="TAKEAWAY: DEVICE ARCHITECTURE & MODELS EVOLVE TOGETHER">
          <strong>The device architecture and its model evolve together.</strong> A simulator needs a description that matches the exact way the gate controls the channel in physical silicon.
        </Callout>

      </div>
    </section>
  );
};

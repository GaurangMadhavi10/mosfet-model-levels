import React, { useState } from 'react';
import { Sliders, Zap, Eye, RefreshCw } from 'lucide-react';

export const Mosfet2DDiagram: React.FC = () => {
  const [vgs, setVgs] = useState(1.2);
  const [vds, setVds] = useState(0.6);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  const vth = 0.5;
  const isChannelFormed = vgs > vth;
  const vov = Math.max(0, vgs - vth);
  const isPinchOff = isChannelFormed && vds >= vov;

  // Channel thickness calculations for SVG
  const channelDepthSource = isChannelFormed ? Math.min(18, 6 + vov * 10) : 0;
  // Pinch-off near drain
  const channelDepthDrain = isChannelFormed 
    ? Math.max(0, channelDepthSource * Math.max(0, 1 - vds / (vov || 0.001)))
    : 0;

  return (
    <div className="my-6 p-5 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/80 dark:bg-wafer-900/80 light:bg-white shadow-chip">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
            Interactive Cross-Section
          </span>
          <h4 className="text-lg font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            2D nMOS Field & Inversion Layer Dynamics
          </h4>
        </div>
        
        {/* Operating status pill */}
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold border ${
            !isChannelFormed 
              ? 'bg-slate-800 text-slate-400 border-slate-700' 
              : isPinchOff 
                ? 'bg-amber-950/80 text-amber-300 border-amber-500/40' 
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
          }`}>
            {!isChannelFormed ? '● CUTOFF (VGS < VTH)' : isPinchOff ? '▲ SATURATION (PINCHED)' : '■ TRIODE (CONTINUOUS)'}
          </span>
        </div>
      </div>

      {/* Interactive Bias Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-wafer-950/70 border border-slate-800">
        <div>
          <div className="flex justify-between text-xs font-mono mb-1.5">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Gate-to-Source Voltage (VGS):
            </span>
            <span className="text-cyan-400 font-bold">{vgs.toFixed(2)} V</span>
          </div>
          <input
            type="range"
            min="0"
            max="2.0"
            step="0.05"
            value={vgs}
            onChange={(e) => setVgs(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>0.0 V (Cutoff)</span>
            <span className="text-cyan-500 font-semibold">VTH = 0.50 V</span>
            <span>2.0 V (Strong Inv)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-mono mb-1.5">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
              Drain-to-Source Voltage (VDS):
            </span>
            <span className="text-sky-400 font-bold">{vds.toFixed(2)} V</span>
          </div>
          <input
            type="range"
            min="0"
            max="2.0"
            step="0.05"
            value={vds}
            onChange={(e) => setVds(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>0.0 V (Ohmic)</span>
            <span className="text-sky-500 font-semibold">VOV = {vov.toFixed(2)} V</span>
            <span>2.0 V (Deep Sat)</span>
          </div>
        </div>
      </div>

      {/* SVG Cross-Section */}
      <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-4">
        <svg viewBox="0 0 600 320" className="w-full h-auto select-none">
          <defs>
            <linearGradient id="gateGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="oxideGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="nPlusGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
            <pattern id="substrateHatch" width="20" height="20" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="20" y2="20" stroke="#1e293b" strokeWidth="1" />
            </pattern>
          </defs>

          {/* p-Substrate Background */}
          <rect x="30" y="110" width="540" height="170" rx="4" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
          <rect x="30" y="110" width="540" height="170" rx="4" fill="url(#substrateHatch)" opacity="0.6" />
          
          <text x="300" y="250" textAnchor="middle" fill="#64748b" className="font-mono text-xs" fontWeight="bold">
            p-Substrate (Body / Bulk, VB = 0V)
          </text>

          {/* Depletion Region Shading under channel */}
          {isChannelFormed && (
            <path
              d={`M 150 110 Q 300 ${140 + vov * 15} 450 110 L 450 125 Q 300 ${145 + vov * 15} 150 125 Z`}
              fill="#f59e0b"
              opacity="0.15"
            />
          )}

          {/* Source n+ Region */}
          <g 
            onMouseEnter={() => setActiveRegion('source')}
            onMouseLeave={() => setActiveRegion(null)}
            className="cursor-pointer transition-transform"
          >
            <rect x="50" y="110" width="100" height="70" rx="2" fill="url(#nPlusGrad)" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="100" y="150" textAnchor="middle" fill="#ffffff" className="font-mono text-xs font-bold">
              Source (n+)
            </text>
            <text x="100" y="166" textAnchor="middle" fill="#bae6fd" className="font-mono text-[9px]">
              VS = 0.0V
            </text>
          </g>

          {/* Drain n+ Region */}
          <g 
            onMouseEnter={() => setActiveRegion('drain')}
            onMouseLeave={() => setActiveRegion(null)}
            className="cursor-pointer"
          >
            <rect x="450" y="110" width="100" height="70" rx="2" fill="url(#nPlusGrad)" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="500" y="150" textAnchor="middle" fill="#ffffff" className="font-mono text-xs font-bold">
              Drain (n+)
            </text>
            <text x="500" y="166" textAnchor="middle" fill="#bae6fd" className="font-mono text-[9px]">
              VD = {vds.toFixed(2)}V
            </text>
          </g>

          {/* Inversion Channel */}
          {isChannelFormed ? (
            <g>
              <polygon
                points={`150,110 450,110 450,${110 + channelDepthDrain} 150,${110 + channelDepthSource}`}
                fill="#10b981"
                opacity="0.85"
                stroke="#34d399"
                strokeWidth="1"
              />
              <text x="300" y="132" textAnchor="middle" fill="#ecfdf5" className="font-mono text-[10px] font-bold">
                {isPinchOff ? 'PINCH-OFF POINT' : 'ELECTRON INVERSION LAYER (2DEG)'}
              </text>
            </g>
          ) : (
            <text x="300" y="135" textAnchor="middle" fill="#94a3b8" className="font-mono text-[10px] italic">
              No Inversion Channel (VGS &lt; VTH)
            </text>
          )}

          {/* Gate Oxide (SiO2 / High-k) */}
          <g 
            onMouseEnter={() => setActiveRegion('oxide')}
            onMouseLeave={() => setActiveRegion(null)}
            className="cursor-pointer"
          >
            <rect x="130" y="98" width="340" height="12" rx="1" fill="url(#oxideGrad)" stroke="#7dd3fc" strokeWidth="1" />
            <text x="300" y="107" textAnchor="middle" fill="#0c4a6e" className="font-mono text-[8px] font-bold tracking-wider">
              GATE DIELECTRIC (SiO2 / High-k, Cox = εox/tox)
            </text>
          </g>

          {/* Gate Metal / Polysilicon Electrode */}
          <g 
            onMouseEnter={() => setActiveRegion('gate')}
            onMouseLeave={() => setActiveRegion(null)}
            className="cursor-pointer"
          >
            <rect x="150" y="45" width="300" height="53" rx="3" fill="url(#gateGrad)" stroke="#60a5fa" strokeWidth="1.5" />
            <text x="300" y="75" textAnchor="middle" fill="#ffffff" className="font-mono text-sm font-bold">
              GATE ELECTRODE
            </text>
            <text x="300" y="90" textAnchor="middle" fill="#bfdbfe" className="font-mono text-[10px]">
              VG = {vgs.toFixed(2)}V
            </text>
          </g>

          {/* Channel Length Indicator Line */}
          <line x1="150" y1="35" x2="450" y2="35" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
          <polygon points="150,32 145,35 150,38" fill="#38bdf8" />
          <polygon points="450,32 455,35 450,38" fill="#38bdf8" />
          <text x="300" y="28" textAnchor="middle" fill="#38bdf8" className="font-mono text-[10px] font-bold">
            Channel Length L (Source to Drain)
          </text>
        </svg>

        {/* Hover / Inspector Legend */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>
              {activeRegion === 'gate' && 'Gate: Electrostatic control over the surface potential.'}
              {activeRegion === 'oxide' && 'Oxide: Insulating capacitance Cox that couples gate charge.'}
              {activeRegion === 'source' && 'Source: High electron concentration reservoir (n+).'}
              {activeRegion === 'drain' && 'Drain: Collects electrons swept across channel by VDS.'}
              {!activeRegion && 'Hover over device terminals to view electrical role.'}
            </span>
          </div>
          <div className="text-[11px] text-cyan-400/80 font-bold">
            VOV = (VGS - VTH) = {vov.toFixed(2)} V
          </div>
        </div>
      </div>
    </div>
  );
};

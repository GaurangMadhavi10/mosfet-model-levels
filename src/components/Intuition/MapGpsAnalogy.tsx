import React, { useState } from 'react';
import { Map, Navigation, CheckCircle2, ArrowRight, Gauge, Cpu, Compass } from 'lucide-react';
import { Callout } from '../UI/Callout';

export const MapGpsAnalogy: React.FC = () => {
  const [selectedMindset, setSelectedMindset] = useState<'map' | 'gps'>('map');

  return (
    <section id="intuition" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Real-World Metaphor & Intuition</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            1. The City Map and the GPS
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            "A model is a useful map, not the terrain."
          </p>
        </div>

        {/* Dual Cards: The Map vs The GPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          {/* Card 1: THE MAP */}
          <div 
            onClick={() => setSelectedMindset('map')}
            className={`p-6 rounded-xl border transition-all cursor-pointer ${
              selectedMindset === 'map'
                ? 'border-cyan-400/80 bg-cyan-950/20 dark:bg-cyan-950/30 shadow-chip ring-1 ring-cyan-500/30'
                : 'border-slate-800 bg-slate-900/60 dark:bg-wafer-900/60 light:bg-slate-50 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30 flex items-center justify-center">
                <Map className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                Intuition Tool
              </span>
            </div>
            
            <h3 className="text-lg font-bold font-mono text-slate-100 dark:text-slate-100 light:text-slate-900 mb-1">
              THE MAP
            </h3>
            <div className="text-xs font-mono text-slate-400 mb-4">
              A street sketch
            </div>

            <div className="space-y-2.5 text-sm text-slate-300 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong>Fast:</strong> Zero simulation latency, instantaneous algebraic insights.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong>Clear:</strong> Unambiguous analytical relationship between variables.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span><strong>Good for direction:</strong> Sizing transistors and establishing initial bias points.</span>
              </div>
            </div>
          </div>

          {/* Card 2: THE GPS */}
          <div 
            onClick={() => setSelectedMindset('gps')}
            className={`p-6 rounded-xl border transition-all cursor-pointer ${
              selectedMindset === 'gps'
                ? 'border-sky-400/80 bg-sky-950/20 dark:bg-sky-950/30 shadow-chip ring-1 ring-sky-500/30'
                : 'border-slate-800 bg-slate-900/60 dark:bg-wafer-900/60 light:bg-slate-50 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-sky-950 text-sky-400 border border-sky-500/30 flex items-center justify-center">
                <Navigation className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-500/20">
                Predictive Engine
              </span>
            </div>

            <h3 className="text-lg font-bold font-mono text-slate-100 dark:text-slate-100 light:text-slate-900 mb-1">
              THE GPS
            </h3>
            <div className="text-xs font-mono text-slate-400 mb-4">
              A predictive compact model
            </div>

            <div className="space-y-2.5 text-sm text-slate-300 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span><strong>Traffic & Slope:</strong> Real-world parasitics, velocity saturation, and temperature.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span><strong>Route & Uncertainty:</strong> Statistical Monte Carlo mismatch and process corners.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                <span><strong>Silicon Sign-off:</strong> Ensures high fabrication yield across 100M+ transistors.</span>
              </div>
            </div>
          </div>

        </div>

        {/* The Silicon Analogy Deep Dive */}
        <div className="p-6 rounded-xl border border-slate-800 bg-slate-900/70 dark:bg-wafer-900/70 light:bg-white mb-6">
          <h4 className="text-base font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900 mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>The Silicon Analogy</span>
          </h4>
          <p className="text-sm leading-relaxed text-slate-300 dark:text-slate-300 mb-4">
            Level 1 MOSFET equations are like a clean street map: they reveal the main routes from gate voltage to drain current without the clutter of physical non-idealities. At deep-submicron dimensions, however, a circuit simulator needs the GPS: a compact model calibrated against physical measurements, operating temperature, and precise geometric layout effects.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="p-3 rounded-lg bg-wafer-950/70 border border-slate-800">
              <div className="font-mono font-semibold text-cyan-400 uppercase mb-1">When to use a simple model?</div>
              <p className="text-slate-300">
                To build qualitative intuition, estimate small-signal transconductance (<span className="font-mono text-cyan-300">gm</span>), and perform sanity checks on hand calculations.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-wafer-950/70 border border-slate-800">
              <div className="font-mono font-semibold text-sky-400 uppercase mb-1">When to use a calibrated compact model?</div>
              <p className="text-slate-300">
                For timing closure, noise analysis, subthreshold leakage, reliability degradation, and final foundry sign-off.
              </p>
            </div>
          </div>
        </div>

        {/* Engineering Lesson Callout */}
        <Callout type="engineering-lesson" title="CRITICAL ENGINEERING LESSON">
          <strong>"Never mistake more parameters for more truth:</strong> parameter extraction and validation decide predictive power."
        </Callout>

      </div>
    </section>
  );
};

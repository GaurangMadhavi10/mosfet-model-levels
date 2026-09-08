import React from 'react';
import { Mail, ArrowRight, Layers, Sparkles, Terminal, Activity, FileText } from 'lucide-react';
import { SiliconWaferCanvas } from './SiliconWaferCanvas';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 75;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  };

  const tags = [
    { label: 'Square-Law', target: 'level1' },
    { label: 'Short-Channel', target: 'short-channel' },
    { label: 'BSIM', target: 'bsim' },
    { label: 'SPICE', target: 'spice-discipline' },
    { label: 'FinFET / GAA', target: 'finfet-gaa' },
  ];

  const progressionStages = [
    { step: 1, name: 'Level 1', desc: 'ideal physics', target: 'level1', color: 'from-blue-500 to-cyan-400' },
    { step: 2, name: 'Level 2/3', desc: 'corrections', target: 'level2', color: 'from-cyan-400 to-teal-400' },
    { step: 3, name: 'BSIM', desc: 'measured silicon', target: 'bsim', color: 'from-teal-400 to-emerald-400' },
    { step: 4, name: '3D FETs', desc: 'electrostatics', target: 'finfet-gaa', color: 'from-amber-400 to-orange-400' },
  ];

  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden border-b border-slate-800/60">
      <SiliconWaferCanvas />
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-cyan-500/10 dark:bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Activity Badge */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>VLSI DESIGN • CCE1 TECHNICAL ACTIVITY</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-slate-400 bg-slate-900/60 border border-slate-800">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Specialized Semiconductor Monograph</span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100 light:text-slate-900 font-display">
            MOSFET Model Levels:
            <span className="block mt-1 bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              From Simple Models to Advanced Device Models
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 dark:text-slate-300 light:text-slate-700 max-w-3xl font-normal leading-relaxed">
            How equations evolve into predictive compact models for modern silicon.
          </p>
        </div>

        {/* Authors Metadata Card */}
        <div className="mb-10 p-4 sm:p-5 rounded-xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-slate-900/70 dark:bg-wafer-900/70 light:bg-white/80 backdrop-blur-md shadow-chip">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold mb-3 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>CCE1 Group Activity Authors</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Author 1 */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-wafer-950/80 dark:bg-wafer-950/80 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800 light:border-slate-200 hover:border-cyan-500/40 transition-colors">
              <div className="w-9 h-9 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-sm">
                34
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm text-slate-100 dark:text-slate-100 light:text-slate-900">
                  Shloka Loni
                </div>
                <a
                  href="mailto:shloka.18321@sakec.ac.in"
                  className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1 font-mono truncate"
                >
                  <Mail className="w-3 h-3 shrink-0" />
                  <span>shloka.18321@sakec.ac.in</span>
                </a>
              </div>
            </div>

            {/* Author 2 */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-wafer-950/80 dark:bg-wafer-950/80 light:bg-slate-50 border border-slate-800/80 dark:border-slate-800 light:border-slate-200 hover:border-cyan-500/40 transition-colors">
              <div className="w-9 h-9 rounded-md bg-blue-950 text-blue-300 border border-blue-500/30 flex items-center justify-center font-mono font-bold text-sm">
                35
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm text-slate-100 dark:text-slate-100 light:text-slate-900">
                  Gaurang Madhavi
                </div>
                <a
                  href="mailto:gaurang.madhavi18355@sakec.ac.in"
                  className="text-xs text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1 font-mono truncate"
                >
                  <Mail className="w-3 h-3 shrink-0" />
                  <span>gaurang.madhavi18355@sakec.ac.in</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {tags.map((tag) => (
            <button
              key={tag.label}
              onClick={() => scrollTo(tag.target)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium bg-slate-900/90 dark:bg-slate-900/90 light:bg-slate-100 text-slate-300 hover:text-cyan-300 border border-slate-800 dark:border-slate-800 light:border-slate-300 hover:border-cyan-500/50 hover:bg-slate-800/70 transition-all shadow-sm"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* The Model Journey Interactive Banner */}
        <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 dark:border-slate-800 light:border-slate-200 bg-gradient-to-b from-slate-900/95 via-wafer-900/90 to-wafer-950/95 dark:from-slate-900/95 dark:via-wafer-900/90 dark:to-wafer-950/95 light:from-slate-50 light:to-white shadow-2xl relative overflow-hidden">
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase block mb-1">
                Roadmap Overview
              </span>
              <h2 className="text-xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
                The Model Journey
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
              Click stage to inspect physics
            </span>
          </div>

          {/* 4-Stage Horizontal Progression */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
            {progressionStages.map((stage) => (
              <button
                key={stage.step}
                onClick={() => scrollTo(stage.target)}
                className="group relative p-4 rounded-xl bg-wafer-950/90 dark:bg-wafer-950/90 light:bg-white border border-slate-800 hover:border-cyan-400/80 hover:shadow-chip text-left transition-all duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm mb-3 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                  {stage.step}
                </div>
                <div className="font-bold text-sm text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-cyan-300 transition-colors">
                  {stage.name}
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  {stage.desc}
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-cyan-500 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>

          {/* Diagram from PDF Page 1: MOSFET Cross Section Schematic */}
          <div className="p-4 sm:p-6 rounded-xl bg-wafer-950 dark:bg-wafer-950 light:bg-slate-900 border border-slate-800/90 text-center">
            <div className="max-w-md mx-auto">
              
              {/* Gate & Oxide */}
              <div className="w-48 mx-auto h-7 bg-blue-600 rounded-t-md text-[11px] font-mono font-bold text-white flex items-center justify-center shadow-md">
                GATE
              </div>
              <div className="w-56 mx-auto h-2 bg-cyan-300 rounded-sm text-[8px] font-mono text-slate-900 flex items-center justify-center">
                oxide
              </div>
              <div className="w-56 mx-auto h-1.5 bg-emerald-400/90 rounded-none mb-0.5"></div>

              {/* Source, Channel, Drain Block */}
              <div className="flex items-stretch justify-center h-14 w-full max-w-sm mx-auto">
                <div className="w-20 bg-blue-500/90 rounded-l text-[11px] font-mono font-bold text-white flex items-center justify-center border-r border-slate-900">
                  S (n+)
                </div>
                <div className="flex-1 bg-slate-800 text-[10px] font-mono text-cyan-300 flex flex-col items-center justify-center px-1">
                  <span className="text-[9px] text-slate-400">inversion channel</span>
                  <span className="text-[10px] font-bold">L (channel length)</span>
                </div>
                <div className="w-20 bg-blue-500/90 rounded-r text-[11px] font-mono font-bold text-white flex items-center justify-center border-l border-slate-900">
                  D (n+)
                </div>
              </div>

              {/* p-Substrate Body */}
              <div className="w-full max-w-sm mx-auto h-8 bg-slate-900/95 rounded-b border-t border-slate-700/60 text-[11px] font-mono text-slate-400 flex items-center justify-center">
                p-substrate / body
              </div>

            </div>

            <div className="mt-4 text-xs font-mono text-slate-400 italic">
              Figure 1: Roadmap from a classroom square-law model to foundry compact models.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

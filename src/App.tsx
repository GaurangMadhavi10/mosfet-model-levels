import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/Navigation/HeaderNav';
import { ReadingProgress } from './components/Navigation/ReadingProgress';
import { TableOfContents } from './components/Navigation/TableOfContents';
import { HeroSection } from './components/Hero/HeroSection';
import { MapGpsAnalogy } from './components/Intuition/MapGpsAnalogy';
import { MosfetBasics } from './components/Fundamentals/MosfetBasics';
import { SquareLawDerivation } from './components/Level1/SquareLawDerivation';
import { OperationRegions } from './components/RegionsOfOperation/OperationRegions';
import { Level2Corrections } from './components/Level2/Level2Corrections';
import { Level3Empirical } from './components/Level3/Level3Empirical';
import { UsefulInSpice } from './components/SpiceDiscipline/UsefulInSpice';
import { BsimOverview } from './components/BSIM/BsimOverview';
import { SimpleVsCompact } from './components/BSIM/SimpleVsCompact';
import { SpiceCodeInspector } from './components/SpiceModelCard/SpiceCodeInspector';
import { ExtractionPipeline } from './components/ParameterExtraction/ExtractionPipeline';
import { ShortChannelPhysics } from './components/ShortChannel/ShortChannelPhysics';
import { MultiGateEvolution } from './components/FinFET_GAA/MultiGateEvolution';
import { ModelComparisonTable } from './components/Comparison/ModelComparisonTable';
import { SimulationChecklist } from './components/Verification/SimulationChecklist';
import { LearningLadder } from './components/Verification/LearningLadder';
import { ReferenceList } from './components/References/ReferenceList';
import { ArrowUp } from 'lucide-react';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sectionIds = [
        'hero',
        'intuition',
        'fundamentals',
        'level1',
        'regions',
        'level2',
        'level3',
        'spice-discipline',
        'bsim',
        'simple-vs-compact',
        'spice-card',
        'extraction',
        'short-channel',
        'finfet-gaa',
        'comparison',
        'verification',
        'learning-ladder',
        'references',
      ];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-wafer-950 dark:bg-wafer-950 light:bg-slate-50 text-slate-100 dark:text-slate-100 light:text-slate-900 bg-grid-pattern transition-colors">
      <ReadingProgress />
      <HeaderNav activeSection={activeSection} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-8 justify-center">
          
          {/* Main Article Content */}
          <main className="flex-1 max-w-4xl min-w-0">
            <HeroSection />
            <MapGpsAnalogy />
            <MosfetBasics />
            <SquareLawDerivation />
            <OperationRegions />
            <Level2Corrections />
            <Level3Empirical />
            <UsefulInSpice />
            <BsimOverview />
            <SimpleVsCompact />
            <SpiceCodeInspector />
            <ExtractionPipeline />
            <ShortChannelPhysics />
            <MultiGateEvolution />
            <ModelComparisonTable />
            <SimulationChecklist />
            <LearningLadder />
            <ReferenceList />
          </main>

          {/* Sidebar Table of Contents */}
          <TableOfContents activeSection={activeSection} />

        </div>
      </div>

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-chip transition-all z-40 focus:outline-none"
          title="Back to Top"
          aria-label="Back to Top"
        >
          <ArrowUp className="w-5 h-5 font-bold" />
        </button>
      )}
    </div>
  );
};

export default App;

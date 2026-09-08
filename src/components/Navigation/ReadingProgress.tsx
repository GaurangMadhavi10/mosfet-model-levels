import React, { useEffect, useState } from 'react';

export const ReadingProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900/50 z-50 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500 transition-all duration-75 shadow-[0_0_10px_rgba(56,189,248,0.7)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

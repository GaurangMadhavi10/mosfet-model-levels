import React, { useEffect, useRef, useState } from 'react';
import katex from 'katex';
import { Copy, Check } from 'lucide-react';

interface MathBlockProps {
  math: string;
  displayMode?: boolean;
  className?: string;
  allowCopy?: boolean;
  label?: string;
}

export const MathBlock: React.FC<MathBlockProps> = ({
  math,
  displayMode = true,
  className = '',
  allowCopy = false,
  label
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode,
          throwOnError: false,
          output: 'htmlAndMathml',
        });
      } catch (err) {
        console.error('KaTeX rendering error:', err);
      }
    }
  }, [math, displayMode]);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(math);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!displayMode) {
    return <span ref={containerRef} className={`inline-math ${className}`} />;
  }

  return (
    <div className={`relative group my-3 p-3.5 bg-slate-900/80 dark:bg-wafer-900/90 light:bg-slate-50 border border-slate-700/60 dark:border-slate-800 light:border-slate-200 rounded-lg overflow-x-auto shadow-sm transition-all duration-200 hover:border-cyan-500/40 ${className}`}>
      {label && (
        <span className="text-[11px] uppercase tracking-wider font-mono text-cyan-400 font-semibold mb-1 block select-none">
          {label}
        </span>
      )}
      <div className="flex items-center justify-between gap-4">
        <span ref={containerRef} className="block w-full overflow-x-auto text-slate-100 dark:text-slate-100 light:text-slate-900 py-1" />
        {allowCopy && (
          <button
            onClick={handleCopy}
            title="Copy LaTeX source"
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded text-slate-400 hover:text-cyan-400 hover:bg-slate-800/80 light:hover:bg-slate-200 shrink-0 select-none"
            aria-label="Copy LaTeX equation"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};

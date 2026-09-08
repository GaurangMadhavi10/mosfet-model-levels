import React from 'react';
import { AlertCircle, AlertTriangle, Info, Lightbulb, ShieldAlert, Cpu } from 'lucide-react';

export type CalloutType = 'important' | 'caution' | 'note' | 'tip' | 'engineering-lesson' | 'pdk';

interface CalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Callout: React.FC<CalloutProps> = ({
  type,
  title,
  children,
  className = ''
}) => {
  const configs: Record<CalloutType, {
    border: string;
    bg: string;
    text: string;
    titleColor: string;
    icon: React.ReactNode;
    defaultTitle: string;
  }> = {
    important: {
      border: 'border-cyan-500/50',
      bg: 'bg-cyan-950/20 dark:bg-cyan-950/25',
      text: 'text-cyan-200/90',
      titleColor: 'text-cyan-400',
      icon: <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />,
      defaultTitle: 'MODELING ASSUMPTION'
    },
    caution: {
      border: 'border-rose-500/50',
      bg: 'bg-rose-950/20 dark:bg-rose-950/25',
      text: 'text-rose-200/90',
      titleColor: 'text-rose-400',
      icon: <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />,
      defaultTitle: 'CAUTION'
    },
    note: {
      border: 'border-blue-500/50',
      bg: 'bg-blue-950/20 dark:bg-blue-950/25',
      text: 'text-blue-200/90',
      titleColor: 'text-blue-400',
      icon: <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />,
      defaultTitle: 'A NOTE ON NAMES'
    },
    tip: {
      border: 'border-emerald-500/50',
      bg: 'bg-emerald-950/20 dark:bg-emerald-950/25',
      text: 'text-emerald-200/90',
      titleColor: 'text-emerald-400',
      icon: <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
      defaultTitle: 'ENGINEERING TIP'
    },
    'engineering-lesson': {
      border: 'border-purple-500/50',
      bg: 'bg-purple-950/20 dark:bg-purple-950/25',
      text: 'text-purple-200/90',
      titleColor: 'text-purple-300',
      icon: <AlertTriangle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />,
      defaultTitle: 'ENGINEERING LESSON'
    },
    pdk: {
      border: 'border-amber-500/50',
      bg: 'bg-amber-950/20 dark:bg-amber-950/25',
      text: 'text-amber-200/90',
      titleColor: 'text-amber-400',
      icon: <Cpu className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />,
      defaultTitle: 'FOUNDRY PDK REQUIREMENT'
    }
  };

  const config = configs[type];

  return (
    <div className={`my-4 p-4.5 rounded-lg border ${config.border} ${config.bg} backdrop-blur-sm shadow-sm transition-all duration-200 ${className}`}>
      <div className="flex items-start gap-3">
        {config.icon}
        <div className="flex-1 min-w-0">
          <div className={`font-mono text-xs font-bold uppercase tracking-wider mb-1.5 ${config.titleColor}`}>
            {title || config.defaultTitle}
          </div>
          <div className={`text-sm leading-relaxed text-slate-300 dark:text-slate-300 ${config.text}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

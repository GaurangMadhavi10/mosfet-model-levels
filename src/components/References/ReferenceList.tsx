import React from 'react';
import { BookMarked, Mail, ExternalLink, Award, FileText } from 'lucide-react';

export const ReferenceList: React.FC = () => {
  const references = [
    {
      num: 1,
      authors: 'Y. Tsividis and C. McAndrew',
      title: 'Operation and Modeling of the MOS Transistor',
      details: '3rd ed., Oxford University Press, 2011.',
      category: 'Foundational Text'
    },
    {
      num: 2,
      authors: 'Y. Cheng et al.',
      title: 'BSIM3v3 Manual',
      details: 'University of California, Berkeley, 1995.',
      category: 'Compact Model Manual'
    },
    {
      num: 3,
      authors: 'BSIM Group',
      title: 'BSIM4 User Manual and model documentation',
      details: 'University of California, Berkeley.',
      category: 'Compact Model Standard'
    },
    {
      num: 4,
      authors: 'BSIM Group',
      title: 'BSIM-CMG Technical Manual: Common Multi-Gate MOSFET Model',
      details: 'University of California, Berkeley.',
      category: 'Multi-Gate Standard'
    },
    {
      num: 5,
      authors: 'Y. Taur and T. Ning',
      title: 'Fundamentals of Modern VLSI Devices',
      details: '2nd ed., Cambridge University Press, 2009.',
      category: 'Device Physics'
    },
    {
      num: 6,
      authors: 'S. M. Sze and K. K. Ng',
      title: 'Physics of Semiconductor Devices',
      details: '3rd ed., Wiley, 2006.',
      category: 'Semiconductor Physics'
    },
    {
      num: 7,
      authors: 'R. H. Dennard et al.',
      title: 'Design of Ion-Implanted MOSFETs with Very Small Physical Dimensions',
      details: 'IEEE Journal of Solid-State Circuits (JSSC), 1974.',
      category: 'Classic Scaling'
    },
    {
      num: 8,
      authors: 'R. Geiger, P. Allen and N. Strader',
      title: 'VLSI Design Techniques for Analog and Digital Circuits',
      details: 'McGraw-Hill.',
      category: 'Circuit Design'
    },
  ];

  return (
    <section id="references" className="py-14 border-b border-slate-800/60 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <div className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
            <BookMarked className="w-3.5 h-3.5" />
            <span>References & Acknowledgment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            17. References and Further Reading
          </h2>
          <p className="text-base text-slate-400 dark:text-slate-400 font-mono mt-1">
            Selected sources for a CCE1 VLSI technical activity.
          </p>
        </div>

        {/* Bibliography List */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 dark:bg-wafer-900/60 light:bg-white p-5 sm:p-6 shadow-sm mb-10">
          <div className="space-y-4">
            {references.map((r) => (
              <div
                key={r.num}
                className="p-3.5 rounded-xl bg-wafer-950/80 border border-slate-800/80 flex items-start gap-3.5 hover:border-cyan-500/40 transition-colors"
              >
                <div className="w-6 h-6 rounded-md bg-slate-800 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                  {r.num}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-mono text-slate-300">
                    <span className="font-bold text-slate-100 dark:text-slate-100 light:text-slate-900">{r.authors}</span>,{' '}
                    <span className="italic text-cyan-300">"{r.title},"</span>{' '}
                    <span className="text-slate-400">{r.details}</span>
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {r.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Authors Attribution Card from PDF */}
        <div className="p-6 rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-slate-900 via-wafer-900 to-slate-900 shadow-chip">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Activity Authors & Contact</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-wafer-950 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-sm">
                34
              </div>
              <div>
                <div className="font-bold text-sm text-slate-100">Shloka Loni</div>
                <a
                  href="mailto:shloka.18321@sakec.ac.in"
                  className="text-xs text-cyan-400 hover:underline font-mono flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" />
                  <span>shloka.18321@sakec.ac.in</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 rounded-xl bg-wafer-950 border border-slate-800">
              <div className="w-10 h-10 rounded-lg bg-blue-950 text-blue-300 border border-blue-500/30 flex items-center justify-center font-mono font-bold text-sm">
                35
              </div>
              <div>
                <div className="font-bold text-sm text-slate-100">Gaurang Madhavi</div>
                <a
                  href="mailto:gaurang.madhavi18355@sakec.ac.in"
                  className="text-xs text-cyan-400 hover:underline font-mono flex items-center gap-1"
                >
                  <Mail className="w-3 h-3" />
                  <span>gaurang.madhavi18355@sakec.ac.in</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-center text-xs font-mono text-slate-500">
            MOSFET MODEL LEVELS | CCE1 VLSI TECHNICAL ACTIVITY • ENGINEERING PUBLICATION
          </div>
        </div>

      </div>
    </section>
  );
};

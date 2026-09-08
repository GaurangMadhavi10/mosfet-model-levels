import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
  Legend
} from 'recharts';
import { Layers, Sliders, CheckCircle2 } from 'lucide-react';
import { MathBlock } from '../UI/MathBlock';

export const IVCurveChart: React.FC = () => {
  const [lambda, setLambda] = useState(0.05); // 1/V for Level 2 CLM toggle
  const [showCLM, setShowCLM] = useState(false);
  const [hoveredVov, setHoveredVov] = useState<number | null>(null);

  const beta = 1.0; // mA/V² for normalized plotting

  // Generate curves for VOV = 0.2, 0.35, 0.5 V
  const data = useMemo(() => {
    const points = [];
    for (let vds = 0; vds <= 1.0; vds += 0.02) {
      const vdsVal = parseFloat(vds.toFixed(2));
      
      // VOV = 0.2V
      const vov1 = 0.2;
      let id1 = 0;
      if (vdsVal < vov1) {
        id1 = beta * (vov1 * vdsVal - (vdsVal * vdsVal) / 2);
      } else {
        const idSat = 0.5 * beta * vov1 * vov1;
        id1 = showCLM ? idSat * (1 + lambda * (vdsVal - vov1)) : idSat;
      }

      // VOV = 0.35V
      const vov2 = 0.35;
      let id2 = 0;
      if (vdsVal < vov2) {
        id2 = beta * (vov2 * vdsVal - (vdsVal * vdsVal) / 2);
      } else {
        const idSat = 0.5 * beta * vov2 * vov2;
        id2 = showCLM ? idSat * (1 + lambda * (vdsVal - vov2)) : idSat;
      }

      // VOV = 0.5V
      const vov3 = 0.5;
      let id3 = 0;
      if (vdsVal < vov3) {
        id3 = beta * (vov3 * vdsVal - (vdsVal * vdsVal) / 2);
      } else {
        const idSat = 0.5 * beta * vov3 * vov3;
        id3 = showCLM ? idSat * (1 + lambda * (vdsVal - vov3)) : idSat;
      }

      // Pinch-off boundary locus (ID,sat = 0.5 * beta * VDS^2)
      const pinchOffLocus = vdsVal <= 0.6 ? 0.5 * beta * vdsVal * vdsVal : null;

      points.push({
        vds: vdsVal,
        curve1: parseFloat(id1.toFixed(4)),
        curve2: parseFloat(id2.toFixed(4)),
        curve3: parseFloat(id3.toFixed(4)),
        pinchOff: pinchOffLocus !== null ? parseFloat(pinchOffLocus.toFixed(4)) : null,
      });
    }
    return points;
  }, [showCLM, lambda]);

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/80 dark:bg-wafer-900/80 light:bg-white shadow-chip my-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
            Level 1 Characteristic Curves
          </span>
          <h4 className="text-base font-bold font-display text-slate-100 dark:text-slate-100 light:text-slate-900">
            Output Characteristics: <MathBlock math="I_D" displayMode={false} /> vs <MathBlock math="V_{DS}" displayMode={false} />
          </h4>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showCLM}
              onChange={(e) => setShowCLM(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-cyan-500 focus:ring-0"
            />
            <span>Include Channel-Length Mod (λ &gt; 0)</span>
          </label>
        </div>
      </div>

      {showCLM && (
        <div className="mb-4 p-3 rounded-lg bg-wafer-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Early Voltage / CLM Parameter (λ):</span>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0.01"
              max="0.25"
              step="0.01"
              value={lambda}
              onChange={(e) => setLambda(parseFloat(e.target.value))}
              className="w-32 accent-cyan-400"
            />
            <span className="text-cyan-400 font-bold">{lambda.toFixed(2)} V⁻¹</span>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="h-72 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 15, right: 20, left: -10, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="vds"
              unit=" V"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              label={{ value: 'Drain-to-Source Voltage VDS (V)', position: 'insideBottom', offset: -12, fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
            />
            <YAxis
              unit=" mA"
              stroke="#64748b"
              tick={{ fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
              label={{ value: 'Drain Current ID (mA)', angle: -90, position: 'insideLeft', offset: 15, fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px', fontFamily: 'monospace' }}
              formatter={(value: number, name: string) => [
                `${value} mA`,
                name === 'curve3' ? 'VOV = 0.50 V' : name === 'curve2' ? 'VOV = 0.35 V' : name === 'curve1' ? 'VOV = 0.20 V' : 'Pinch-off locus'
              ]}
            />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => {
                const labels: Record<string, string> = {
                  curve3: 'VOV = 0.50 V',
                  curve2: 'VOV = 0.35 V',
                  curve1: 'VOV = 0.20 V',
                  pinchOff: 'Pinch-off Boundary (VDS,sat = VOV)'
                };
                return <span className="text-xs font-mono text-slate-300">{labels[value] || value}</span>;
              }}
            />

            {/* Triode Shading Boundary for VOV = 0.5 */}
            <ReferenceArea x1={0} x2={0.5} y1={0} y2={0.14} fill="#10b981" fillOpacity={0.04} />
            {/* Saturation Shading */}
            <ReferenceArea x1={0.5} x2={1.0} y1={0} y2={0.14} fill="#3b82f6" fillOpacity={0.04} />

            {/* Pinch-off locus curve */}
            <Line
              type="monotone"
              dataKey="pinchOff"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={false}
              name="pinchOff"
            />

            {/* Curve 1: VOV = 0.2 */}
            <Line
              type="monotone"
              dataKey="curve1"
              stroke="#38bdf8"
              strokeWidth={2.5}
              dot={false}
              name="curve1"
            />

            {/* Curve 2: VOV = 0.35 */}
            <Line
              type="monotone"
              dataKey="curve2"
              stroke="#818cf8"
              strokeWidth={2.5}
              dot={false}
              name="curve2"
            />

            {/* Curve 3: VOV = 0.5 */}
            <Line
              type="monotone"
              dataKey="curve3"
              stroke="#34d399"
              strokeWidth={2.5}
              dot={false}
              name="curve3"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-slate-400 italic text-center">
        Level 1 square-law output curves for three gate overdrive voltages. Each curve rises through the triode region and flattens at <MathBlock math="V_{DS} \ge V_{OV}" displayMode={false} />, tracing the pinch-off locus into saturation.
      </div>
    </div>
  );
};

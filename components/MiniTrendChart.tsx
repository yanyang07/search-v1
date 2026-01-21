
import React from 'react';
import { MetricTrend } from '../types';

interface MiniTrendChartProps {
  data: MetricTrend[];
  color: string;
  label: string;
}

const MiniTrendChart: React.FC<MiniTrendChartProps> = ({ data, color, label }) => {
  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const width = 140;
  const height = 40;
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d.value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="absolute bottom-full right-0 mb-2 w-48 bg-white border border-slate-200 rounded-lg shadow-xl p-3 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <div className="flex justify-between items-end mb-2">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label} Trend</span>
        <span className="text-[10px] font-bold text-slate-800">{data[0].year}-{data[data.length-1].year}</span>
      </div>
      <svg width={width} height={height} className="overflow-visible mx-auto">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        {data.map((d, i) => {
           const x = (i / (data.length - 1)) * width;
           const y = height - ((d.value - min) / range) * height;
           return <circle key={i} cx={x} cy={y} r="2" fill={color} />;
        })}
      </svg>
      <div className="mt-2 flex justify-between text-[8px] font-bold text-slate-400">
        <span>Low: {min.toLocaleString()}</span>
        <span>High: {max.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default MiniTrendChart;

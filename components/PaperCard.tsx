
import React, { useState } from 'react';
import { Paper } from '../types';
import { Quote, TrendingUp, Calendar, ChevronRight } from 'lucide-react';
import MiniTrendChart from './MiniTrendChart';

interface PaperCardProps {
  paper: Paper;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper }) => {
  const [showHeatTrend, setShowHeatTrend] = useState(false);
  const [showCitationTrend, setShowCitationTrend] = useState(false);

  return (
    <div className="group bg-white border border-slate-200 p-4 hover:border-blue-400 hover:shadow-lg transition-all duration-300 rounded-xl">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-grow">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
            {paper.title}
          </h3>
          
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1 text-slate-900">
              {paper.authors.join(', ')}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-blue-600">{paper.venue}</span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {paper.year}
              </span>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500 line-clamp-2 leading-relaxed font-light italic">
            "{paper.abstract}"
          </p>

          <div className="mt-3 flex items-center gap-3">
            {paper.fields.map(field => (
              <span key={field} className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                #{field.replace(/\s+/g, '')}
              </span>
            ))}
          </div>
        </div>

        {/* Metrics Sidebar */}
        <div className="flex-shrink-0 flex flex-col items-end gap-3 min-w-[80px]">
          <div 
            className="relative flex flex-col items-end cursor-help"
            onMouseEnter={() => setShowCitationTrend(true)}
            onMouseLeave={() => setShowCitationTrend(false)}
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase">Citations</span>
            <span className="text-sm font-bold text-slate-800 flex items-center gap-1 border-b border-dotted border-slate-200">
              <Quote size={12} className="text-blue-400" />
              {paper.citations.toLocaleString()}
            </span>
            {showCitationTrend && <MiniTrendChart data={paper.citationTrend} color="#3b82f6" label="Impact" />}
          </div>
          <div 
            className="relative flex flex-col items-end cursor-help"
            onMouseEnter={() => setShowHeatTrend(true)}
            onMouseLeave={() => setShowHeatTrend(false)}
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase">Heat Index</span>
            <span className="text-sm font-bold text-emerald-600 flex items-center gap-1 border-b border-dotted border-slate-200">
              <TrendingUp size={12} />
              {paper.heat}
            </span>
            {showHeatTrend && <MiniTrendChart data={paper.heatTrend} color="#10b981" label="Heat" />}
          </div>
          <button className="mt-1 p-1.5 bg-blue-50 text-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaperCard;

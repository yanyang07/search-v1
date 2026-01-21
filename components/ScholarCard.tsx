
import React, { useState } from 'react';
import { Scholar } from '../types';
import { Mail, TrendingUp, Quote, ExternalLink, Award as AwardIcon, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import AwardTimeline from './AwardTimeline';
import MiniTrendChart from './MiniTrendChart';
import { MOCK_PAPERS } from '../data/mock';

interface ScholarCardProps {
  scholar: Scholar;
}

const ScholarCard: React.FC<ScholarCardProps> = ({ scholar }) => {
  const [showHeatTrend, setShowHeatTrend] = useState(false);
  const [showCitationTrend, setShowCitationTrend] = useState(false);
  const [isPapersExpanded, setIsPapersExpanded] = useState(false);

  // Find actual paper objects for the related papers list
  const relatedPapers = scholar.relatedPaperIds.map(id => 
    MOCK_PAPERS.find(p => p.id === id)
  ).filter(Boolean);

  return (
    <div className="group relative bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 rounded-xl overflow-hidden">
      <div className="p-4">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img src={scholar.avatar} alt={scholar.name} className="w-16 h-16 rounded-xl object-cover border-2 border-slate-50" />
            <div className="mt-2 flex flex-col items-center gap-1">
              <div 
                className="relative flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded cursor-help"
                onMouseEnter={() => setShowHeatTrend(true)}
                onMouseLeave={() => setShowHeatTrend(false)}
              >
                <TrendingUp size={10} />
                {scholar.heat}
                {showHeatTrend && <MiniTrendChart data={scholar.heatTrend} color="#10b981" label="Heat" />}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow min-w-0">
            <div className="flex justify-between items-start">
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2 truncate">
                  {scholar.name} ({scholar.nameCN})
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-40 transition-opacity flex-shrink-0" />
                </h3>
                
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[11px] text-slate-500 font-medium">
                  {/* Institution Hover */}
                  <div className="flex items-center gap-1 group/inst relative cursor-help">
                    <span className="text-blue-600">@</span>
                    <span className="truncate max-w-[150px] border-b border-dotted border-slate-300 group-hover/inst:text-blue-600 group-hover/inst:border-blue-600">
                      {scholar.affiliations[0]}
                    </span>
                    <div className="opacity-0 invisible group-hover/inst:opacity-100 group-hover/inst:visible absolute left-0 top-full mt-2 z-50 transition-all pointer-events-none group-hover/inst:pointer-events-auto">
                      <AwardTimeline awards={scholar.awards} />
                    </div>
                  </div>

                  <div 
                    className="relative flex items-center gap-1 cursor-help"
                    onMouseEnter={() => setShowCitationTrend(true)}
                    onMouseLeave={() => setShowCitationTrend(false)}
                  >
                    <Quote size={12} className="text-slate-400" />
                    <span className="border-b border-dotted border-slate-300">{scholar.citations.toLocaleString()}</span>
                    {showCitationTrend && <MiniTrendChart data={scholar.citationTrend} color="#3b82f6" label="Citations" />}
                  </div>

                  <div className="flex items-center gap-1 hover:text-blue-500 cursor-pointer">
                    <Mail size={12} />
                    <span>Contact</span>
                  </div>
                </div>
              </div>

              {/* Award Icon Hover Trigger */}
              <div className="relative group/award-icon flex-shrink-0">
                <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all">
                  <AwardIcon size={18} />
                </button>
                <div className="opacity-0 invisible group-hover/award-icon:opacity-100 group-hover/award-icon:visible absolute right-0 top-full mt-2 z-50 transition-all pointer-events-none group-hover/award-icon:pointer-events-auto">
                   <AwardTimeline awards={scholar.awards} />
                </div>
              </div>
            </div>

            {/* Research Fields */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {scholar.fields.map(field => (
                <span key={field} className="px-2 py-0.5 bg-slate-50 text-slate-600 text-[10px] font-bold rounded uppercase tracking-tighter border border-slate-100">
                  {field}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              {/* Recent Award Badge Trigger */}
              <div className="relative group/award-box inline-block cursor-help">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-100 group-hover/award-box:bg-amber-100 transition-colors">
                  <AwardIcon size={12} />
                  {scholar.recentAward}
                </div>
                <div className="opacity-0 invisible group-hover/award-box:opacity-100 group-hover/award-box:visible absolute left-0 top-full mt-2 z-50 transition-all pointer-events-none group-hover/award-box:pointer-events-auto">
                  <AwardTimeline awards={scholar.awards} />
                </div>
              </div>

              {/* Related Papers Toggle */}
              <button 
                onClick={() => setIsPapersExpanded(!isPapersExpanded)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  isPapersExpanded ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <BookOpen size={12} />
                Related Papers ({scholar.relatedPaperIds.length})
                {isPapersExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Papers Section */}
      {isPapersExpanded && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-4 animate-in slide-in-from-top-2 duration-300">
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
              Highly Relevant Publications
            </h4>
            {relatedPapers.map((paper, idx) => (
              <div key={idx} className="flex gap-3 bg-white border border-slate-200 p-3 rounded-lg hover:border-blue-300 transition-colors group/p-item cursor-pointer">
                <div className="w-1.5 h-auto bg-blue-100 group-hover/p-item:bg-blue-500 transition-colors rounded-full" />
                <div className="min-w-0 flex-1">
                  <h5 className="text-[11px] font-bold text-slate-800 line-clamp-1 group-hover/p-item:text-blue-600">{paper?.title}</h5>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded uppercase tracking-tighter">{paper?.venue}</span>
                    <span className="text-[9px] text-slate-400 flex items-center gap-1">
                      <Quote size={8} /> {paper?.citations.toLocaleString()} citations
                    </span>
                    <span className="text-[9px] text-slate-400">{paper?.year}</span>
                  </div>
                </div>
                <button className="flex-shrink-0 self-center p-1.5 text-slate-300 group-hover/p-item:text-blue-600 hover:bg-blue-50 rounded">
                  <ExternalLink size={12} />
                </button>
              </div>
            ))}
            {relatedPapers.length === 0 && <div className="text-[10px] text-slate-400 italic text-center py-2">No related papers indexed.</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScholarCard;

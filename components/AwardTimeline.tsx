
import React from 'react';
import { Award } from '../types';

interface AwardTimelineProps {
  awards: Award[];
}

const AwardTimeline: React.FC<AwardTimelineProps> = ({ awards }) => {
  return (
    <div className="award-timeline w-72 p-4 bg-white border border-slate-200 rounded-lg shadow-2xl z-50 transform transition-all duration-200 ease-out animate-in fade-in slide-in-from-top-1">
      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-50 pb-2">Academic Trajectory</h4>
      <div className="relative border-l border-slate-200 ml-2">
        {awards.map((award, idx) => (
          <div key={idx} className="mb-5 ml-4 relative">
            <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-blue-600 rounded-full border-2 border-white shadow-sm ring-4 ring-blue-50"></div>
            <div className="text-[9px] font-extrabold text-blue-600 tracking-tighter uppercase mb-0.5">{award.year}</div>
            <div className="text-[11px] font-bold text-slate-800 leading-snug">{award.title}</div>
            <div className="text-[9px] font-medium text-slate-500 mt-0.5 bg-slate-50 inline-block px-1.5 py-0.5 rounded border border-slate-100">
              {award.institution}
            </div>
          </div>
        ))}
        {awards.length === 0 && (
          <div className="text-[10px] text-slate-400 italic ml-4">No data available</div>
        )}
      </div>
    </div>
  );
};

export default AwardTimeline;

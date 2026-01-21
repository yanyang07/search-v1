
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, X, SlidersHorizontal, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { FilterItem } from '../types';
import { NESTED_FILTERS } from '../data/mock';

interface FilterNodeProps {
  node: FilterItem;
  level: number;
  activeIds: string[];
  onToggle: (id: string) => void;
}

const FilterNode: React.FC<FilterNodeProps> = ({ node, level, activeIds, onToggle }) => {
  const [isOpen, setIsOpen] = useState(level < 1);
  const hasChildren = node.children && node.children.length > 0;
  const isActive = activeIds.includes(node.id);

  return (
    <div className={`select-none ${level > 0 ? 'ml-3 border-l border-slate-100 pl-2 mt-1' : 'mb-3'}`}>
      <div className="flex items-center group">
        {hasChildren ? (
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-0.5 text-slate-400 hover:text-blue-600 transition-colors"
          >
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        ) : (
          <div className="w-[18px]" />
        )}
        
        <button
          onClick={() => onToggle(node.id)}
          className={`flex-1 text-left px-2 py-1 rounded text-xs font-medium transition-all ${
            isActive 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          {node.label}
        </button>
      </div>

      {isOpen && hasChildren && (
        <div className="flex flex-col">
          {node.children!.map(child => (
            <FilterNode 
              key={child.id} 
              node={child} 
              level={level + 1} 
              activeIds={activeIds} 
              onToggle={onToggle} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface FilterBarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const [activeFilters, setActiveFilters] = useState<string[]>(['cs', 'ai']);
  const [yearStart, setYearStart] = useState('2015');
  const [yearEnd, setYearEnd] = useState('2025');
  
  const years = Array.from({ length: 26 }, (_, i) => (2000 + i).toString());

  const toggleFilter = (id: string) => {
    setActiveFilters(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (isCollapsed) {
    return (
      <div className="w-12 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col items-center py-6 gap-6 sticky top-16 h-[calc(100vh-64px)]">
        <button onClick={() => setIsCollapsed(false)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
          <PanelLeftOpen size={20} />
        </button>
        <div className="h-px w-6 bg-slate-100"></div>
        <SlidersHorizontal size={20} className="text-slate-300" />
      </div>
    );
  }

  return (
    <div className="w-72 flex-shrink-0 bg-white border-r border-slate-200 h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar sticky top-16 transition-all duration-300">
      <div className="p-5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <SlidersHorizontal size={18} className="text-blue-600" />
            <span>Taxonomy Search</span>
          </div>
          <button 
            onClick={() => setIsCollapsed(true)}
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        {/* Level 1-3 Categories */}
        <div className="mb-8">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Research Hierarchy</h4>
          {NESTED_FILTERS.map(filter => (
            <FilterNode 
              key={filter.id} 
              node={filter} 
              level={0} 
              activeIds={activeFilters} 
              onToggle={toggleFilter} 
            />
          ))}
        </div>

        <div className="py-6 border-t border-slate-100">
          <h4 className="text-sm font-semibold text-slate-700 mb-4 tracking-tight">Publication Window</h4>
          <div className="flex items-center gap-2">
            <select 
              value={yearStart}
              onChange={(e) => setYearStart(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-2 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <span className="text-slate-300">to</span>
            <select 
              value={yearEnd}
              onChange={(e) => setYearEnd(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 px-2 py-2 rounded-lg focus:outline-none focus:border-blue-500"
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="mt-3 flex justify-between">
            {['Last 2Y', 'Last 5Y', 'Last 10Y'].map(preset => (
              <button key={preset} className="text-[10px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-1 rounded transition-colors">
                {preset}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

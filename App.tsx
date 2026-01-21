
import React, { useState } from 'react';
import Header, { SearchMode } from './components/Header';
import FilterBar from './components/FilterBar';
import ScholarCard from './components/ScholarCard';
import PaperCard from './components/PaperCard';
import { MOCK_SCHOLARS, MOCK_PAPERS } from './data/mock';
import { Download, LayoutGrid, List, ArrowUpDown, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [sortBy, setSortBy] = useState('relevance');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMode, setActiveMode] = useState<SearchMode>('comprehensive');

  const renderContent = () => {
    const isComprehensive = activeMode === 'comprehensive';
    const isScholars = activeMode === 'scholars';
    const isPapers = activeMode === 'papers';

    return (
      <div className={`grid grid-cols-1 ${isComprehensive ? (sidebarCollapsed ? 'lg:grid-cols-2' : 'xl:grid-cols-2') : 'grid-cols-1'} gap-8`}>
        {/* Scholars Section */}
        {(isComprehensive || isScholars) && (
          <section className="space-y-4">
            <div className="flex items-center justify-between sticky top-0 bg-slate-50/90 backdrop-blur pb-4 z-10 pt-2">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-widest">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                Scholars
                <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full ml-1">TOP 10</span>
              </h2>
              <button className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 group">
                View More
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className={`grid gap-4 ${isScholars ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
              {MOCK_SCHOLARS.slice(0, 10).map(scholar => (
                <ScholarCard key={scholar.id} scholar={scholar} />
              ))}
            </div>
          </section>
        )}

        {/* Papers Section */}
        {(isComprehensive || isPapers) && (
          <section className="space-y-4">
            <div className="flex items-center justify-between sticky top-0 bg-slate-50/90 backdrop-blur pb-4 z-10 pt-2">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 uppercase tracking-widest">
                <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
                Papers
                <span className="text-[10px] bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full ml-1">TOP 10</span>
              </h2>
              <button className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1 group">
                View More
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className={`grid gap-4 ${isPapers ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
              {MOCK_PAPERS.slice(0, 10).map(paper => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeMode={activeMode} onModeChange={setActiveMode} />
      
      <div className="flex flex-1 overflow-hidden">
        <FilterBar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
        
        <main className={`flex-1 bg-slate-50/50 overflow-y-auto custom-scrollbar p-6 transition-all duration-300`}>
          <div className="max-w-7xl mx-auto">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {activeMode === 'comprehensive' ? 'Comprehensive Results' : activeMode === 'scholars' ? 'Scholar Index' : 'Research Publications'}
                </h1>
                <span className="text-sm font-medium text-slate-400">Found 1,284 results in 0.42s</span>
              </div>
              
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm">
                  <ArrowUpDown size={14} className="text-slate-400" />
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-xs font-bold text-slate-600 focus:outline-none bg-transparent"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="heat">Hotness</option>
                    <option value="citations">Most Cited</option>
                    <option value="date">Newest First</option>
                  </select>
                </div>

                <div className="flex items-center border border-slate-200 rounded-lg p-1 bg-white shadow-sm">
                  <button className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                    <LayoutGrid size={16} />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md">
                    <List size={16} />
                  </button>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-200 transition-all active:scale-95">
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>

            {renderContent()}

            {/* Pagination Placeholder */}
            <div className="mt-12 mb-8 flex items-center justify-center gap-2">
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-50 disabled:opacity-50">Previous</button>
              {[1, 2, 3, '...', 12].map((p, i) => (
                <button 
                  key={i} 
                  className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                    p === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-bold rounded-lg hover:bg-slate-50">Next</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;

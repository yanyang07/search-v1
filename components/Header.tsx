
import React from 'react';
import { Search, Bell, User, Brain } from 'lucide-react';

export type SearchMode = 'comprehensive' | 'scholars' | 'papers';

interface HeaderProps {
  activeMode: SearchMode;
  onModeChange: (mode: SearchMode) => void;
}

const Header: React.FC<HeaderProps> = ({ activeMode, onModeChange }) => {
  const navItems: { id: SearchMode; label: string }[] = [
    { id: 'comprehensive', label: '综合搜索' },
    { id: 'scholars', label: '学者' },
    { id: 'papers', label: '论文' },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-[100]">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => onModeChange('comprehensive')}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform">
            <Brain size={20} />
          </div>
          <span className="text-lg font-bold text-slate-900 tracking-tight">AI Index</span>
        </div>

        <nav className="hidden lg:flex items-center gap-6 h-16">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onModeChange(item.id)}
              className={`text-sm font-semibold h-full px-1 border-b-2 transition-all duration-200 ${
                activeMode === item.id
                  ? 'text-blue-600 border-blue-600'
                  : 'text-slate-500 border-transparent hover:text-blue-500'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-grow max-w-2xl px-12">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search scholars, papers, keywords or institutions..."
            className="w-full bg-slate-100 border-transparent border focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium transition-all"
          />
          <div className="absolute inset-y-0 right-3 flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 bg-slate-200 text-[10px] font-bold text-slate-500 rounded">⌘</span>
            <span className="px-1.5 py-0.5 bg-slate-200 text-[10px] font-bold text-slate-500 rounded">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        <button className="flex items-center gap-2 p-1 pl-1 pr-3 hover:bg-slate-100 rounded-full transition-all border border-transparent hover:border-slate-200">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-md">
            <User size={16} />
          </div>
          <span className="text-sm font-bold text-slate-700">Dr. Aris</span>
        </button>
      </div>
    </header>
  );
};

export default Header;

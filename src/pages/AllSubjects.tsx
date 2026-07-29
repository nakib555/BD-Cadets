import React from 'react';
import { useRouter } from '../context/RouterContext';

export default function AllSubjects() {
  const { goBack, navigate } = useRouter();

  return (
    <div className="animate-in fade-in duration-300 bg-white dark:bg-slate-950 min-h-full pb-24 transition-colors duration-300">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
          <button onClick={goBack} className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"><i className="fa-solid fa-arrow-left text-sm"></i></button>
          <h1 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wider">All Subjects</h1>
          <div className="w-8"></div>
      </header>
      
      <div className="px-4 pb-4 pt-2">
          <div className="relative flex items-center">
              <i className="fa-solid fa-magnifying-glass absolute left-3 text-slate-400 dark:text-slate-500 text-xs"></i>
              <input type="text" placeholder="Search topics, subjects..." className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-[10px] py-2.5 pl-8 pr-10 text-[11px] font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition" />
              <i className="fa-solid fa-sliders absolute right-3 text-slate-400 dark:text-slate-500 text-xs"></i>
          </div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-4 pb-6">
          {/* Subject Cards with 10px rounded corners */}
          <button onClick={() => navigate('study')} className="bg-[#eefcf2] dark:bg-emerald-950/20 border border-[#d1fae5] dark:border-emerald-900/30 rounded-[10px] p-3 flex flex-col items-center shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0f9250] to-[#0a6637] text-white rounded-[10px] flex items-center justify-center text-sm mb-2 shadow-sm"><i className="fa-solid fa-calculator"></i></div>
              <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 text-center leading-tight">Math</span>
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-bold mt-1">26 Topics</span>
          </button>
          
          <button onClick={() => navigate('study')} className="bg-[#f5f3ff] dark:bg-purple-950/20 border border-[#ddd6fe] dark:border-purple-900/30 rounded-[10px] p-3 flex flex-col items-center shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#4338ca] text-white rounded-[10px] flex items-center justify-center text-sm mb-2 shadow-sm"><i className="fa-solid fa-book-open"></i></div>
              <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 text-center leading-tight">English</span>
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-bold mt-1">24 Topics</span>
          </button>
          
          <button onClick={() => navigate('study')} className="bg-[#eff6ff] dark:bg-blue-950/20 border border-[#dbeafe] dark:border-blue-900/30 rounded-[10px] p-3 flex flex-col items-center shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white rounded-[10px] flex items-center justify-center text-sm mb-2 shadow-sm"><i className="fa-solid fa-globe"></i></div>
              <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 text-center leading-tight">GK</span>
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-bold mt-1">30 Topics</span>
          </button>
          
          <button onClick={() => navigate('study')} className="bg-[#fffbeb] dark:bg-amber-950/20 border border-[#fef3c7] dark:border-amber-900/30 rounded-[10px] p-3 flex flex-col items-center shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
              <div className="w-10 h-10 bg-gradient-to-br from-[#f59e0b] to-[#d97706] text-white rounded-[10px] flex items-center justify-center text-sm mb-2 shadow-sm font-serif font-black">অ</div>
              <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 text-center leading-tight">Bangla</span>
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-bold mt-1">20 Topics</span>
          </button>
          
          <button onClick={() => navigate('study')} className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-[10px] p-3 flex flex-col items-center shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
              <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-400 rounded-[10px] flex items-center justify-center text-sm mb-2 shadow-sm"><i className="fa-solid fa-brain"></i></div>
              <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 text-center leading-tight">IQ Ability</span>
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-bold mt-1">18 Topics</span>
          </button>
          
          <button onClick={() => navigate('study')} className="bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/30 rounded-[10px] p-3 flex flex-col items-center shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
              <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900 text-cyan-500 dark:text-cyan-400 rounded-[10px] flex items-center justify-center text-sm mb-2 shadow-sm"><i className="fa-solid fa-flask"></i></div>
              <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 text-center leading-tight">Science</span>
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-bold mt-1">25 Topics</span>
          </button>
          
          <button onClick={() => navigate('study')} className="bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 rounded-[10px] p-3 flex flex-col items-center shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
              <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900 text-rose-500 dark:text-rose-400 rounded-[10px] flex items-center justify-center text-sm mb-2 shadow-sm"><i className="fa-solid fa-monument"></i></div>
              <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 text-center leading-tight">BD Affairs</span>
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-bold mt-1">22 Topics</span>
          </button>
          
          <button onClick={() => navigate('study')} className="bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 rounded-[10px] p-3 flex flex-col items-center shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 rounded-[10px] flex items-center justify-center text-sm mb-2 shadow-sm"><i className="fa-regular fa-newspaper"></i></div>
              <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 text-center leading-tight">Current Info</span>
              <span className="text-[8px] text-slate-500 dark:text-slate-400 font-bold mt-1">Updates</span>
          </button>
      </div>
    </div>
  );
}

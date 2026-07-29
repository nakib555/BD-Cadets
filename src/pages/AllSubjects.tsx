import React from 'react';
import { useRouter } from '../context/RouterContext';

export default function AllSubjects() {
  const { goBack, navigate } = useRouter();

  return (
    <div className="animate-in fade-in duration-300">
      <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-10">
          <button onClick={goBack} className="text-slate-800 w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center"><i className="fa-solid fa-arrow-left text-sm"></i></button>
          <h1 className="text-[13px] font-bold text-slate-900">All Subjects</h1>
          <div className="w-8"></div>
      </header>
      
      <div className="px-4 pb-4">
          <div className="relative flex items-center">
              <i className="fa-solid fa-magnifying-glass absolute left-3 text-slate-400 text-xs"></i>
              <input type="text" placeholder="Search topics, subjects..." className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-8 pr-10 text-[11px] font-medium text-slate-700 focus:outline-none focus:border-blue-400 transition" />
              <i className="fa-solid fa-sliders absolute right-3 text-slate-400 text-xs"></i>
          </div>
      </div>

      <div className="grid grid-cols-3 gap-3 px-4 pb-6">
          {/* Subject Cards */}
          <button onClick={() => navigate('interactive-map')} className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex flex-col items-center shadow-sm cursor-pointer hover:bg-blue-50 transition">
              <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-xl flex items-center justify-center text-xl mb-2"><i className="fa-solid fa-calculator"></i></div>
              <span className="text-[10px] font-bold text-slate-800">Mathematics</span>
              <span className="text-[8px] text-slate-500 font-medium mt-1">26 Topics</span>
          </button>
          <button onClick={() => navigate('interactive-map')} className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 flex flex-col items-center shadow-sm cursor-pointer hover:bg-emerald-50 transition">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-500 rounded-xl flex items-center justify-center text-xl mb-2"><i className="fa-solid fa-book-open"></i></div>
              <span className="text-[10px] font-bold text-slate-800">English</span>
              <span className="text-[8px] text-slate-500 font-medium mt-1">24 Topics</span>
          </button>
          <button onClick={() => navigate('interactive-map')} className="bg-purple-50/50 border border-purple-100 rounded-2xl p-4 flex flex-col items-center shadow-sm cursor-pointer hover:bg-purple-50 transition">
              <div className="w-12 h-12 bg-purple-100 text-purple-500 rounded-xl flex items-center justify-center text-xl mb-2"><i className="fa-solid fa-globe"></i></div>
              <span className="text-[10px] font-bold text-slate-800 text-center leading-tight">General Knowledge</span>
              <span className="text-[8px] text-slate-500 font-medium mt-1">30 Topics</span>
          </button>
          <button onClick={() => navigate('interactive-map')} className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 flex flex-col items-center shadow-sm cursor-pointer hover:bg-orange-50 transition">
              <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center text-2xl font-serif font-bold mb-2">অ</div>
              <span className="text-[10px] font-bold text-slate-800">Bangla</span>
              <span className="text-[8px] text-slate-500 font-medium mt-1">20 Topics</span>
          </button>
          <button onClick={() => navigate('interactive-map')} className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 flex flex-col items-center shadow-sm cursor-pointer hover:bg-indigo-50 transition">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-500 rounded-xl flex items-center justify-center text-xl mb-2"><i className="fa-solid fa-brain"></i></div>
              <span className="text-[10px] font-bold text-slate-800 text-center leading-tight">IQ & Mental Ability</span>
              <span className="text-[8px] text-slate-500 font-medium mt-1">18 Topics</span>
          </button>
          <button onClick={() => navigate('interactive-map')} className="bg-cyan-50/50 border border-cyan-100 rounded-2xl p-4 flex flex-col items-center shadow-sm cursor-pointer hover:bg-cyan-50 transition">
              <div className="w-12 h-12 bg-cyan-100 text-cyan-500 rounded-xl flex items-center justify-center text-xl mb-2"><i className="fa-solid fa-flask"></i></div>
              <span className="text-[10px] font-bold text-slate-800">Science</span>
              <span className="text-[8px] text-slate-500 font-medium mt-1">25 Topics</span>
          </button>
          <button onClick={() => navigate('interactive-map')} className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 flex flex-col items-center shadow-sm cursor-pointer hover:bg-rose-50 transition">
              <div className="w-12 h-12 bg-rose-100 text-rose-500 rounded-xl flex items-center justify-center text-xl mb-2"><i className="fa-solid fa-monument"></i></div>
              <span className="text-[10px] font-bold text-slate-800 text-center leading-tight">Bangladesh Affairs</span>
              <span className="text-[8px] text-slate-500 font-medium mt-1">22 Topics</span>
          </button>
          <button onClick={() => navigate('interactive-map')} className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex flex-col items-center shadow-sm cursor-pointer hover:bg-amber-50 transition">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-xl mb-2"><i className="fa-regular fa-newspaper"></i></div>
              <span className="text-[10px] font-bold text-slate-800 text-center leading-tight">Current Affairs</span>
              <span className="text-[8px] text-slate-500 font-medium mt-1">Daily Updates</span>
          </button>
      </div>
    </div>
  );
}

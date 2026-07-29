import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';

export default function Study() {
  const { goBack, navigate } = useRouter();
  const [activeTab, setActiveTab] = useState('Notes');
  const tabs = ['Notes', 'Past Papers', 'Bookmarks'];

  const notes = [
    { title: 'Algebraic Expressions - Key Formulas', subject: 'Mathematics', type: 'PDF Note', icon: 'fa-regular fa-file-pdf', color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30' },
    { title: 'Vocabulary Builder Part 1', subject: 'English', type: 'Flashcards', icon: 'fa-regular fa-copy', color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30' },
    { title: 'History of Bangladesh - Timeline', subject: 'General Knowledge', type: 'Summary', icon: 'fa-solid fa-list', color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full pb-24 transition-colors duration-300 animate-in fade-in duration-300 flex flex-col">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-100 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <button onClick={goBack} className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>
          <h1 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wider">Study Materials</h1>
          <button className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <i className="fa-solid fa-filter text-xs"></i>
          </button>
      </header>

      {/* Tabs */}
      <div className="bg-white dark:bg-slate-950 flex px-4 pt-3 pb-3 gap-2 border-b border-slate-100 dark:border-slate-800/60 sticky top-[60px] z-10 transition-colors duration-300">
          {tabs.map(tab => (
              <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1.5 rounded-[10px] text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer ${
                      activeTab === tab 
                       ? 'bg-blue-600 text-white shadow-sm' 
                       : 'bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
                  }`}
              >
                  {tab}
              </button>
          ))}
      </div>
      
      <div className="px-4 pt-4">
          <div className="relative flex items-center">
              <i className="fa-solid fa-magnifying-glass absolute left-3 text-slate-400 dark:text-slate-500 text-xs"></i>
              <input 
                type="text" 
                placeholder={`Search ${activeTab.toLowerCase()}...`} 
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-[10px] py-2.5 pl-8 pr-10 text-[11px] font-medium text-slate-700 dark:text-slate-300 bg-transparent focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 transition" 
              />
          </div>
      </div>

      <div className="p-4 space-y-3 flex-1 overflow-y-auto pb-24">
          {activeTab === 'Notes' && (
              <div className="pb-3 space-y-2.5">
                  <div className="flex justify-between items-center">
                      <h3 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-wider">Interactive Lessons</h3>
                      <span className="text-[8px] bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">New Features</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                      {/* Photosynthesis science guide card */}
                      <div 
                          onClick={() => navigate('photosynthesis')}
                          className="bg-gradient-to-br from-emerald-50/50 to-emerald-50/10 dark:from-emerald-950/20 dark:to-emerald-950/5 hover:from-emerald-50 dark:hover:from-emerald-950 border border-emerald-100 dark:border-emerald-900/30 p-3 rounded-[10px] shadow-sm hover:shadow transition cursor-pointer flex flex-col justify-between h-28 group"
                      >
                          <div className="flex justify-between items-start">
                              <div className="w-8 h-8 bg-emerald-500 rounded-[10px] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
                                  <i className="fa-solid fa-leaf text-xs"></i>
                              </div>
                              <span className="text-[7px] font-black uppercase text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-950 border border-emerald-100 dark:border-emerald-900/30 px-1.5 py-0.5 rounded-[10px]">Biology</span>
                          </div>
                          <div>
                              <h4 className="text-[10px] font-black text-slate-900 dark:text-white leading-tight">Photosynthesis</h4>
                              <p className="text-[8px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">Interactive Infographic</p>
                          </div>
                      </div>

                      {/* Interactive map card */}
                      <div 
                          onClick={() => navigate('interactive-map')}
                          className="bg-gradient-to-br from-blue-50/50 to-blue-50/10 dark:from-blue-950/20 dark:to-blue-950/5 hover:from-blue-50 dark:hover:from-blue-950 border border-blue-100 dark:border-blue-900/30 p-3 rounded-[10px] shadow-sm hover:shadow transition cursor-pointer flex flex-col justify-between h-28 group"
                      >
                          <div className="flex justify-between items-start">
                              <div className="w-8 h-8 bg-blue-500 rounded-[10px] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
                                  <i className="fa-solid fa-map-location-dot text-xs"></i>
                              </div>
                              <span className="text-[7px] font-black uppercase text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-950 border border-blue-100 dark:border-blue-900/30 px-1.5 py-0.5 rounded-[10px]">Geography</span>
                          </div>
                          <div>
                              <h4 className="text-[10px] font-black text-slate-900 dark:text-white leading-tight">Bangladesh Map</h4>
                              <p className="text-[8px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">Divisions & Landmarks</p>
                          </div>
                      </div>

                      {/* Padma Bridge card */}
                      <div 
                          onClick={() => navigate('padma-bridge')}
                          className="col-span-2 bg-gradient-to-br from-blue-50/50 to-indigo-50/10 dark:from-blue-950/20 dark:to-indigo-950/5 hover:from-blue-50 dark:hover:from-blue-950 border border-blue-100 dark:border-blue-900/30 p-3 rounded-[10px] shadow-sm hover:shadow transition cursor-pointer flex flex-col justify-between h-28 group"
                      >
                          <div className="flex justify-between items-start">
                              <div className="w-8 h-8 bg-blue-600 rounded-[10px] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
                                  <span className="text-xs">🌉</span>
                              </div>
                              <span className="text-[7px] font-black uppercase text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-950 border border-blue-100 dark:border-blue-900/30 px-1.5 py-0.5 rounded-[10px]">General GK</span>
                          </div>
                          <div>
                              <h4 className="text-[10px] font-black text-slate-900 dark:text-white leading-tight">Padma Bridge Infographic</h4>
                              <p className="text-[8px] text-slate-500 dark:text-slate-400 font-bold mt-0.5">Interactive Multi-Decker Layout & Quiz</p>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {notes.map((note, i) => (
              <div key={i} className="bg-white dark:bg-slate-950 p-3.5 rounded-[10px] border border-slate-100 dark:border-slate-800/80 shadow-sm flex items-center justify-between group cursor-pointer hover:border-blue-200 dark:hover:border-blue-500/50 transition duration-300">
                  <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${note.bg} rounded-[10px] flex items-center justify-center`}>
                          <i className={`${note.icon} ${note.color} text-lg`}></i>
                      </div>
                      <div>
                          <h3 className="text-[11px] font-black text-slate-900 dark:text-white leading-tight mb-0.5">{note.title}</h3>
                          <div className="flex gap-2 text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                              <span>{note.subject}</span>
                              <span>•</span>
                              <span>{note.type}</span>
                          </div>
                      </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition">
                      <i className="fa-solid fa-download text-[10px]"></i>
                  </button>
              </div>
          ))}
      </div>
    </div>
  );
}

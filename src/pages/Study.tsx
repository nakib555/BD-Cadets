import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';

export default function Study() {
  const { goBack, navigate } = useRouter();
  const [activeTab, setActiveTab] = useState('Notes');
  const tabs = ['Notes', 'Past Papers', 'Bookmarks'];

  const notes = [
    { title: 'Algebraic Expressions - Key Formulas', subject: 'Mathematics', type: 'PDF Note', icon: 'fa-regular fa-file-pdf', color: 'text-red-500', bg: 'bg-red-50' },
    { title: 'Vocabulary Builder Part 1', subject: 'English', type: 'Flashcards', icon: 'fa-regular fa-copy', color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'History of Bangladesh - Timeline', subject: 'General Knowledge', type: 'Summary', icon: 'fa-solid fa-list', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="bg-slate-50 animate-in fade-in duration-300 h-full flex flex-col">
      <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-10 border-b border-slate-100 shadow-sm">
          <button onClick={goBack} className="text-slate-800 w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center"><i className="fa-solid fa-arrow-left text-sm"></i></button>
          <h1 className="text-[13px] font-bold text-slate-900">Study Materials</h1>
          <button className="text-slate-800 w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center"><i className="fa-solid fa-filter text-xs"></i></button>
      </header>

      {/* Tabs */}
      <div className="bg-white flex px-4 pt-3 pb-3 gap-2 border-b border-slate-100 sticky top-[60px] z-10">
          {tabs.map(tab => (
              <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-1.5 rounded-full text-[10px] font-bold transition-colors ${
                      activeTab === tab 
                       ? 'bg-slate-900 text-white' 
                       : 'bg-slate-50 text-slate-500 border border-slate-200'
                  }`}
              >
                  {tab}
              </button>
          ))}
      </div>
      
      <div className="px-4 pt-4">
          <div className="relative flex items-center">
              <i className="fa-solid fa-magnifying-glass absolute left-3 text-slate-400 text-xs"></i>
              <input type="text" placeholder={`Search ${activeTab.toLowerCase()}...`} className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-8 pr-10 text-[11px] font-medium text-slate-700 focus:outline-none focus:border-blue-400 transition" />
          </div>
      </div>

      <div className="p-4 space-y-3 flex-1 overflow-y-auto pb-24">
          {activeTab === 'Notes' && (
              <div className="pb-3 space-y-2.5">
                  <div className="flex justify-between items-center">
                      <h3 className="text-[11px] font-black text-slate-900 uppercase tracking-wider">Interactive Lessons</h3>
                      <span className="text-[8px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">New Features</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                      {/* Photosynthesis science guide card */}
                      <div 
                          onClick={() => navigate('photosynthesis')}
                          className="bg-gradient-to-br from-emerald-50/50 to-emerald-50/10 hover:from-emerald-50 border border-emerald-100 p-3 rounded-2xl shadow-sm hover:shadow transition cursor-pointer flex flex-col justify-between h-28 group"
                      >
                          <div className="flex justify-between items-start">
                              <div className="w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
                                  <i className="fa-solid fa-leaf text-xs"></i>
                              </div>
                              <span className="text-[7px] font-black uppercase text-emerald-600 bg-white border border-emerald-100 px-1.5 py-0.5 rounded-md">Biology</span>
                          </div>
                          <div>
                              <h4 className="text-[10px] font-black text-slate-900 leading-tight">Photosynthesis</h4>
                              <p className="text-[8px] text-slate-500 font-bold mt-0.5">Interactive Infographic</p>
                          </div>
                      </div>

                      {/* Interactive map card */}
                      <div 
                          onClick={() => navigate('interactive-map')}
                          className="bg-gradient-to-br from-blue-50/50 to-blue-50/10 hover:from-blue-50 border border-blue-100 p-3 rounded-2xl shadow-sm hover:shadow transition cursor-pointer flex flex-col justify-between h-28 group"
                      >
                          <div className="flex justify-between items-start">
                              <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition">
                                  <i className="fa-solid fa-map-location-dot text-xs"></i>
                              </div>
                              <span className="text-[7px] font-black uppercase text-blue-600 bg-white border border-blue-100 px-1.5 py-0.5 rounded-md">Geography</span>
                          </div>
                          <div>
                              <h4 className="text-[10px] font-black text-slate-900 leading-tight">Bangladesh Map</h4>
                              <p className="text-[8px] text-slate-500 font-bold mt-0.5">Divisions & Landmarks</p>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {notes.map((note, i) => (
              <div key={i} className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group cursor-pointer hover:border-blue-200 transition">
                  <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${note.bg} rounded-xl flex items-center justify-center`}>
                          <i className={`${note.icon} ${note.color} text-lg`}></i>
                      </div>
                      <div>
                          <h3 className="text-[11px] font-bold text-slate-900 leading-tight mb-0.5">{note.title}</h3>
                          <div className="flex gap-2 text-[9px] text-slate-500 font-medium">
                              <span>{note.subject}</span>
                              <span>•</span>
                              <span>{note.type}</span>
                          </div>
                      </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-500 transition">
                      <i className="fa-solid fa-download text-[10px]"></i>
                  </button>
              </div>
          ))}
      </div>
    </div>
  );
}

import React from 'react';
import { useData } from '../context/DataContext';

export default function Progress() {
  const { userData } = useData();

  return (
    <div className="bg-slate-50/50 dark:bg-slate-900 min-h-full pb-24 transition-colors duration-300 animate-in fade-in duration-300">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-100 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <div className="w-8"></div>
          <h1 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wider">My Progress</h1>
          <button className="text-slate-600 dark:text-slate-400 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
              <i className="fa-regular fa-calendar text-xs"></i>
          </button>
      </header>

      <div className="bg-white dark:bg-slate-950 flex px-4 text-[10px] font-black text-slate-400 dark:text-slate-500 text-center sticky top-[60px] z-10 shadow-sm border-b border-slate-100/50 dark:border-slate-800/40 transition-colors duration-300">
          <button className="flex-1 py-3 border-b-2 border-blue-600 text-blue-600 dark:text-blue-400">Overview</button>
          <button className="flex-1 py-3 hover:text-slate-600 dark:hover:text-slate-300 transition">Subjects</button>
          <button className="flex-1 py-3 hover:text-slate-600 dark:hover:text-slate-300 transition">Tests</button>
          <button className="flex-1 py-3 hover:text-slate-600 dark:hover:text-slate-300 transition">Analytics</button>
      </div>

      <div className="p-4 space-y-4">
          <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/80 flex items-center justify-between transition-colors duration-300">
              <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wider">Overall Progress</span>
                  <div className="w-[72px] h-[72px] progress-circle flex items-center justify-center shadow-sm">
                      <div className="w-[56px] h-[56px] bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-inner">
                          <span className="font-black text-slate-900 dark:text-white text-base">{userData.avgScore}%</span>
                      </div>
                  </div>
              </div>
              
              <div className="flex-1 ml-6 flex flex-col relative h-[80px]">
                  <div className="absolute right-0 top-0 text-[8px] font-black text-slate-500 dark:text-slate-400 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 px-2.5 py-1 rounded-full border border-orange-100/20">
                      <i className="fa-solid fa-fire mr-1"></i>Great job!
                  </div>
                  {/* Line Chart using refined SVG */}
                  <div className="mt-6 flex-1 relative w-full h-full overflow-visible">
                       <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                          <path d="M0,35 L16,28 L33,35 L50,20 L66,25 L83,10 L100,0" fill="none" stroke="#22c55e" strokeWidth="2.5"></path>
                          <circle cx="0" cy="35" r="3" className="fill-white dark:fill-slate-950" stroke="#22c55e" strokeWidth="2"></circle>
                          <circle cx="16" cy="28" r="3" className="fill-white dark:fill-slate-950" stroke="#22c55e" strokeWidth="2"></circle>
                          <circle cx="33" cy="35" r="3" className="fill-white dark:fill-slate-950" stroke="#22c55e" strokeWidth="2"></circle>
                          <circle cx="50" cy="20" r="3" className="fill-white dark:fill-slate-950" stroke="#22c55e" strokeWidth="2"></circle>
                          <circle cx="66" cy="25" r="3" className="fill-white dark:fill-slate-950" stroke="#22c55e" strokeWidth="2"></circle>
                          <circle cx="83" cy="10" r="3" className="fill-white dark:fill-slate-950" stroke="#22c55e" strokeWidth="2"></circle>
                          <circle cx="100" cy="0" r="3" className="fill-white dark:fill-slate-950" stroke="#22c55e" strokeWidth="2"></circle>
                       </svg>
                  </div>
                  <div className="flex justify-between text-[7px] font-bold text-slate-400 dark:text-slate-500 mt-2 px-1">
                      <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
              </div>
          </div>

          <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/80 grid grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800/80 text-center transition-colors duration-300">
              <div><p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">Tests Taken</p><p className="text-sm font-black text-slate-900 dark:text-white">{userData.testsTaken}</p></div>
              <div><p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">Avg. Score</p><p className="text-sm font-black text-slate-900 dark:text-white">{userData.avgScore}%</p></div>
              <div><p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">Best Score</p><p className="text-sm font-black text-slate-900 dark:text-white">{userData.bestScore}%</p></div>
              <div><p className="text-[8px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">Streak</p><p className="text-sm font-black text-slate-900 dark:text-white">{userData.studyStreak} <span className="text-[8px] text-slate-500 dark:text-slate-400 font-medium">Days</span></p></div>
          </div>

          <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
              <h3 className="text-[11px] font-black text-slate-800 dark:text-white uppercase tracking-wider mb-5">Subject Wise Performance</h3>
              <div className="flex flex-col gap-4">
                  <div>
                      <div className="flex justify-between items-center mb-1.5">
                           <div className="flex items-center gap-2">
                               <div className="w-5 h-5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 dark:text-emerald-400 rounded flex items-center justify-center text-[10px]">
                                   <i className="fa-solid fa-calculator"></i>
                               </div>
                               <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Mathematics</span>
                           </div>
                           <span className="text-[10px] font-bold text-slate-900 dark:text-white">85% <i className="fa-solid fa-chevron-right text-[8px] text-slate-400 dark:text-slate-500 ml-1"></i></span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{width: '85%'}}></div>
                      </div>
                  </div>
                  
                  <div>
                      <div className="flex justify-between items-center mb-1.5">
                           <div className="flex items-center gap-2">
                               <div className="w-5 h-5 bg-purple-50 dark:bg-purple-950/40 text-purple-500 dark:text-purple-400 rounded flex items-center justify-center text-[10px]">
                                   <i className="fa-solid fa-book-open"></i>
                               </div>
                               <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">English</span>
                           </div>
                           <span className="text-[10px] font-bold text-slate-900 dark:text-white">72% <i className="fa-solid fa-chevron-right text-[8px] text-slate-400 dark:text-slate-500 ml-1"></i></span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-purple-500 h-full rounded-full" style={{width: '72%'}}></div>
                      </div>
                  </div>

                  <div>
                      <div className="flex justify-between items-center mb-1.5">
                           <div className="flex items-center gap-2">
                               <div className="w-5 h-5 bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400 rounded flex items-center justify-center text-[10px]">
                                   <i className="fa-solid fa-globe"></i>
                               </div>
                               <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">General Knowledge</span>
                           </div>
                           <span className="text-[10px] font-bold text-slate-900 dark:text-white">80% <i className="fa-solid fa-chevron-right text-[8px] text-slate-400 dark:text-slate-500 ml-1"></i></span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full rounded-full" style={{width: '80%'}}></div>
                      </div>
                  </div>

                  <div>
                      <div className="flex justify-between items-center mb-1.5">
                           <div className="flex items-center gap-2">
                               <div className="w-5 h-5 bg-blue-50 dark:bg-blue-950/40 text-blue-500 dark:text-blue-400 rounded flex items-center justify-center text-[10px]">
                                   <i className="fa-solid fa-brain"></i>
                               </div>
                               <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">IQ & Mental Ability</span>
                           </div>
                           <span className="text-[10px] font-bold text-slate-900 dark:text-white">70% <i className="fa-solid fa-chevron-right text-[8px] text-slate-400 dark:text-slate-500 ml-1"></i></span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full rounded-full" style={{width: '70%'}}></div>
                      </div>
                  </div>

                  <div>
                      <div className="flex justify-between items-center mb-1.5">
                           <div className="flex items-center gap-2">
                               <div className="w-5 h-5 bg-orange-50 dark:bg-orange-950/40 text-orange-500 dark:text-orange-400 rounded flex items-center justify-center text-[10px] font-serif font-bold">অ</div>
                               <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Bangla</span>
                           </div>
                           <span className="text-[10px] font-bold text-slate-900 dark:text-white">65% <i className="fa-solid fa-chevron-right text-[8px] text-slate-400 dark:text-slate-500 ml-1"></i></span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-orange-500 h-full rounded-full" style={{width: '65%'}}></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

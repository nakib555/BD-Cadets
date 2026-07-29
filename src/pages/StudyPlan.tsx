import React from 'react';
import { useRouter } from '../context/RouterContext';

export default function StudyPlan() {
  const { goBack } = useRouter();

  return (
    <div className="bg-slate-50/50 dark:bg-slate-900 min-h-full pb-24 transition-colors duration-300 animate-in fade-in duration-300">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-100 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <button onClick={goBack} className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"><i className="fa-solid fa-arrow-left text-sm"></i></button>
          <h1 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wider">My Study Plan</h1>
          <div className="w-8"></div>
      </header>
      
      <div className="bg-white dark:bg-slate-950 px-4 py-3 border-b border-slate-100 dark:border-slate-800/80 flex justify-between transition-colors duration-300">
          <div className="flex flex-col items-center"><span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold">Mon</span><span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">27</span></div>
          <div className="flex flex-col items-center bg-blue-600 rounded-[10px] px-3 py-1.5 shadow-sm shadow-blue-200/50 dark:shadow-none"><span className="text-[9px] text-blue-100 font-bold">Tue</span><span className="text-xs font-bold text-white mt-0.5">28</span></div>
          <div className="flex flex-col items-center"><span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold">Wed</span><span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">29</span></div>
          <div className="flex flex-col items-center"><span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold">Thu</span><span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">30</span></div>
          <div className="flex flex-col items-center"><span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold">Fri</span><span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">31</span></div>
          <div className="flex flex-col items-center"><span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold">Sat</span><span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">1</span></div>
      </div>

      <div className="p-4 relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800"></div>

          {/* Item 1 */}
          <div className="flex gap-4 mb-6 relative">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[8px] z-10 mt-1"><i className="fa-solid fa-check"></i></div>
              <div className="flex-1 bg-white dark:bg-slate-950 p-3 rounded-[10px] border border-slate-100 dark:border-slate-800/80 shadow-sm flex justify-between items-center transition-colors duration-300">
                  <div>
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold"><i className="fa-regular fa-clock mr-1"></i>06:00 AM - 07:00 AM</span>
                      <h4 className="text-[11px] font-black text-slate-900 dark:text-white mt-1">Mathematics</h4>
                      <p className="text-[9px] text-slate-500 dark:text-slate-400">Algebraic Expressions</p>
                  </div>
                  <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-full"><i className="fa-solid fa-circle-check mr-1"></i>Completed</span>
              </div>
          </div>

          {/* Item 2 */}
          <div className="flex gap-4 mb-6 relative">
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[8px] border-4 border-slate-50 dark:border-slate-900 z-10 mt-1 shadow-sm"><i className="fa-solid fa-spinner"></i></div>
              <div className="flex-1 bg-white dark:bg-slate-950 p-3 rounded-[10px] border border-blue-200 dark:border-blue-900/30 shadow-sm shadow-blue-50/50 dark:shadow-none flex justify-between items-center ring-1 ring-blue-50/50 dark:ring-0 transition-colors duration-300">
                  <div>
                      <span className="text-[9px] text-blue-500 dark:text-blue-400 font-semibold"><i className="fa-regular fa-clock mr-1"></i>07:30 AM - 08:30 AM</span>
                      <h4 className="text-[11px] font-black text-slate-900 dark:text-white mt-1">English</h4>
                      <p className="text-[9px] text-slate-500 dark:text-slate-400">Vocabulary & Grammar</p>
                  </div>
                  <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/40 px-2 py-1 rounded-full"><i className="fa-solid fa-arrows-rotate mr-1"></i>In Progress</span>
              </div>
          </div>

          {/* Item 3 */}
          <div className="flex gap-4 mb-6 relative">
              <div className="w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-orange-400 flex items-center justify-center z-10 mt-1"><div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div></div>
              <div className="flex-1 bg-white dark:bg-slate-950 p-3 rounded-[10px] border border-slate-100 dark:border-slate-800/80 shadow-sm flex justify-between items-center opacity-70 transition-colors duration-300">
                  <div>
                      <span className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold"><i className="fa-regular fa-clock mr-1"></i>09:00 AM - 10:00 AM</span>
                      <h4 className="text-[11px] font-black text-slate-900 dark:text-white mt-1">General Knowledge</h4>
                      <p className="text-[9px] text-slate-500 dark:text-slate-400">Bangladesh Affairs</p>
                  </div>
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold"><i className="fa-regular fa-circle mr-1"></i>Upcoming</span>
              </div>
          </div>
      </div>
      
      {/* Floating Target */}
      <div className="mx-4 mb-4 bg-slate-900 dark:bg-slate-950 text-white p-3 rounded-[10px] flex items-center justify-between shadow-lg border border-transparent dark:border-slate-800 transition-colors duration-300">
          <div>
              <h4 className="text-[11px] font-bold">Daily Target</h4>
              <p className="text-[10px] text-slate-300 dark:text-slate-400">8/12 <span className="font-normal">Topics</span></p>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-red-400 text-xl"><i className="fa-solid fa-bullseye"></i></div>
      </div>
    </div>
  );
}

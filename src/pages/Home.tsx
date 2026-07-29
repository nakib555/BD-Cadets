import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { Bell, Search, BookOpen, Clock, TrendingUp, Trophy, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Calculator, Globe, Languages, Target } from 'lucide-react';
import cadetsSplash from '../assets/images/cadets_splash_1785297743949.jpg';

export default function Home() {
  const { navigate } = useRouter();
  const { userData, isDark } = useData();

  const dailyGoalPercent = Math.round((userData.dailyGoalProgress / 8) * 100);

  // Dynamic banner background based on dark mode state
  const bannerBg = isDark 
    ? `linear-gradient(to right, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.45)), url(${cadetsSplash})`
    : `linear-gradient(to right, rgba(240, 249, 255, 0.95), rgba(240, 249, 255, 0.4)), url(${cadetsSplash})`;
  const bannerBorder = isDark ? '1px solid #1e293b' : '1px solid #e0f2fe';

  return (
    <div className="animate-in fade-in duration-300">
      <header className="flex justify-between items-center p-4 sticky top-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm z-20 transition-colors duration-300">
          <div className="flex items-center gap-3">
              <button className="text-slate-800 dark:text-slate-200 p-1 cursor-pointer"><i className="fa-solid fa-bars-staggered text-lg"></i></button>
              <div>
                  <h1 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">Good Morning, Cadet! <span className="text-base">👋</span></h1>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Discipline Today, Leader Tomorrow.</p>
              </div>
          </div>
          <button className="text-slate-700 dark:text-slate-300 relative p-1 bg-slate-50 dark:bg-slate-900 rounded-full w-8 h-8 flex items-center justify-center border border-slate-100 dark:border-slate-800/80 cursor-pointer">
              <i className="fa-regular fa-bell"></i>
              <span className="absolute top-1 right-1.5 bg-red-500 w-2 h-2 rounded-full border border-white dark:border-slate-950"></span>
          </button>
      </header>

      {/* Hero Banner */}
      <div className="px-4 py-1">
          <div 
            className="rounded-[10px] p-4 relative overflow-hidden h-36 flex flex-col justify-center bg-cover bg-center shadow-sm transition-all duration-300" 
            style={{ backgroundImage: bannerBg, border: bannerBorder }}
          >
              <div className="w-8 h-8 bg-blue-600 rounded-[10px] flex items-center justify-center mb-2 shadow text-white"><i className="fa-solid fa-shield-halved"></i></div>
              <h2 className="text-[15px] font-black text-slate-900 dark:text-white tracking-tight">BD CADETS</h2>
              <p className="text-[9px] text-slate-600 dark:text-blue-400 font-black mb-1 tracking-wider uppercase">PREPARE • PRACTICE • ACHIEVE</p>
              <p className="text-[10px] text-slate-600 dark:text-slate-300 w-[65%] mt-1 leading-tight font-bold">Your Complete Platform for Cadet College Admission Preparation</p>
          </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3 px-4 py-3">
          <div className="bg-blue-50/50 dark:bg-blue-950/20 flex-1 rounded-[10px] p-3 flex justify-between items-center border border-blue-100 dark:border-blue-900/30 shadow-sm transition-colors duration-300">
              <div>
                  <h3 className="text-[11px] font-black text-slate-800 dark:text-slate-200">Daily Goal</h3>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 mb-1">Your daily study target</p>
                  <p className="text-xs font-black text-blue-600 dark:text-blue-400">{userData.dailyGoalProgress}/8 <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium">Topics</span></p>
              </div>
              <div className="w-11 h-11 goal-circle flex items-center justify-center">
                  <div className="w-9 h-9 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-inner">
                      <span className="text-[10px] font-black text-slate-800 dark:text-slate-200">{dailyGoalPercent}%</span>
                  </div>
              </div>
          </div>
          <div className="bg-white dark:bg-slate-950 flex-1 rounded-[10px] p-3 shadow-sm border border-slate-100 dark:border-slate-800/80 flex flex-col justify-between transition-colors duration-300">
              <div className="flex justify-between items-start">
                  <div>
                      <h3 className="text-[11px] font-black text-slate-800 dark:text-slate-200">Study Streak</h3>
                      <p className="text-xs font-black text-slate-900 dark:text-white mt-1">{userData.studyStreak} <span className="text-[9px] font-medium text-slate-500 dark:text-slate-400">Days</span></p>
                  </div>
                  <i className="fa-solid fa-fire text-orange-500 bg-orange-50 dark:bg-orange-950/40 p-1.5 rounded-full text-[10px]"></i>
              </div>
              <div className="flex justify-between mt-2 px-1">
                  <div className="flex flex-col items-center gap-1"><span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold">M</span><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div></div>
                  <div className="flex flex-col items-center gap-1"><span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold">T</span><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div></div>
                  <div className="flex flex-col items-center gap-1"><span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold">W</span><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div></div>
                  <div className="flex flex-col items-center gap-1"><span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold">T</span><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div></div>
                  <div className="flex flex-col items-center gap-1"><span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold">F</span><div className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full"></div></div>
                  <div className="flex flex-col items-center gap-1"><span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold">S</span><div className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full"></div></div>
              </div>
          </div>
      </div>

      {/* Quick Access */}
      <div className="px-4 py-2">
          <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-black text-slate-900 dark:text-white">Quick Access</h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
              <button onClick={() => navigate('study-plan')} className="flex flex-col items-center gap-1.5 group cursor-pointer">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-[10px] flex justify-center items-center group-hover:scale-105 transition"><i className="fa-regular fa-calendar-check text-lg"></i></div>
                  <span className="text-[9px] text-slate-700 dark:text-slate-300 font-bold">Study Plan</span>
              </button>
              <button onClick={() => navigate('test')} className="flex flex-col items-center gap-1.5 group cursor-pointer">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-[10px] flex justify-center items-center group-hover:scale-105 transition"><i className="fa-solid fa-laptop-code text-lg"></i></div>
                  <span className="text-[9px] text-slate-700 dark:text-slate-300 font-bold">Mock Test</span>
              </button>
              <button onClick={() => navigate('test')} className="flex flex-col items-center gap-1.5 group cursor-pointer">
                  <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 rounded-[10px] flex justify-center items-center group-hover:scale-105 transition"><i className="fa-regular fa-file-lines text-lg"></i></div>
                  <span className="text-[9px] text-slate-700 dark:text-slate-300 font-bold">Past Papers</span>
              </button>
              <button onClick={() => navigate('study')} className="flex flex-col items-center gap-1.5 group cursor-pointer">
                  <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/30 text-orange-500 dark:text-orange-400 rounded-[10px] flex justify-center items-center group-hover:scale-105 transition"><i className="fa-regular fa-bookmark text-lg"></i></div>
                  <span className="text-[9px] text-slate-700 dark:text-slate-300 font-bold">Notes</span>
              </button>
          </div>
      </div>

      {/* Subjects Grid */}
      <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-black text-slate-900 dark:text-white">Subjects</h3>
              <button onClick={() => navigate('all-subjects')} className="text-[10px] text-blue-600 dark:text-blue-400 font-black cursor-pointer">See All</button>
          </div>
          <div className="grid grid-cols-4 gap-2.5">
              <button onClick={() => navigate('study')} className="bg-[#eefcf2] dark:bg-emerald-950/20 rounded-[10px] p-2 flex flex-col items-center border border-[#d1fae5] dark:border-emerald-900/30 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0f9250] to-[#0a6637] rounded-[8px] relative shadow-[0_4px_8px_rgba(10,102,55,0.3)] flex items-center justify-center">
                          <div className="absolute top-0.5 left-0.5 right-0.5 h-[30%] bg-white/10 rounded-[6px]"></div>
                          <span className="text-white font-black text-[13px] tracking-tighter">x²</span>
                          <div className="absolute -right-1 bottom-1 w-3 h-6 bg-[#6ee7b7] rounded-[3px] border border-[#059669]/20 shadow-sm flex items-center justify-center">
                              <div className="w-0.5 h-3 bg-[#059669]/40 rounded-full"></div>
                          </div>
                      </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-900 dark:text-slate-200 mt-2">Math</span>
              </button>
              
              <button onClick={() => navigate('study')} className="bg-[#f5f3ff] dark:bg-purple-950/20 rounded-[10px] p-2 flex flex-col items-center border border-[#ddd6fe] dark:border-purple-900/30 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#6366f1] to-[#4338ca] rounded-[8px] relative shadow-[0_4px_8px_rgba(67,56,202,0.3)] flex flex-col items-center justify-center p-1.5">
                          <div className="absolute top-0.5 left-0.5 right-0.5 h-[30%] bg-white/10 rounded-[6px]"></div>
                          <div className="w-6 h-[2px] bg-white/80 rounded-full mb-[3px]"></div>
                          <div className="w-6 h-[2px] bg-white/80 rounded-full mb-[3px]"></div>
                          <div className="w-4 h-[2px] bg-white/80 rounded-full self-start ml-0.5"></div>
                          <div className="absolute -right-1 bottom-1 w-3 h-6 bg-[#a5b4fc] rounded-[3px] border border-[#4f46e5]/20 shadow-sm flex items-center justify-center">
                              <div className="w-0.5 h-3 bg-[#4f46e5]/40 rounded-full"></div>
                          </div>
                      </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-900 dark:text-slate-200 mt-2">English</span>
              </button>

              <button onClick={() => navigate('study')} className="bg-[#fffbeb] dark:bg-amber-950/20 rounded-[10px] p-2 flex flex-col items-center border border-[#fef3c7] dark:border-amber-900/30 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-[8px] relative shadow-[0_4px_8px_rgba(217,119,6,0.3)] flex items-center justify-center">
                          <div className="absolute top-0.5 left-0.5 right-0.5 h-[30%] bg-white/10 rounded-[6px]"></div>
                          <span className="text-white font-serif font-black text-[15px] select-none leading-none">অ</span>
                          <div className="absolute -right-1 bottom-1 w-3 h-6 bg-[#fcd34d] rounded-[3px] border border-[#d97706]/20 shadow-sm flex items-center justify-center">
                              <div className="w-0.5 h-3 bg-[#d97706]/40 rounded-full"></div>
                          </div>
                      </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-900 dark:text-slate-200 mt-2">Bangla</span>
              </button>

              <button onClick={() => navigate('study')} className="bg-[#eff6ff] dark:bg-blue-950/20 rounded-[10px] p-2 flex flex-col items-center border border-[#dbeafe] dark:border-blue-900/30 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-full relative shadow-[0_4px_8px_rgba(29,78,216,0.3)] flex items-center justify-center overflow-hidden">
                          <div className="absolute top-0.5 left-0.5 right-0.5 h-[30%] bg-white/20 rounded-full"></div>
                          <div className="absolute inset-0.5 rounded-full border border-white/20 flex items-center justify-center">
                              <div className="w-6 h-6 rounded-full border border-white/30 absolute"></div>
                              <div className="w-[1px] h-full bg-white/40 absolute"></div>
                              <div className="w-full h-[1px] bg-white/40 absolute"></div>
                              <div className="w-3 h-full rounded-full border border-white/30 absolute"></div>
                          </div>
                          <i className="fa-solid fa-earth-americas text-white/90 text-[10px] z-10"></i>
                      </div>
                  </div>
                  <span className="text-[10px] font-black text-slate-900 dark:text-slate-200 mt-2">GK</span>
              </button>
          </div>
      </div>
      
      {/* Interactive Infographics Section */}
      <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/80 mt-2 pt-4 pb-4">
          <div className="mb-3">
              <span className="text-[8px] font-black tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">visual smart study</span>
              <h3 className="text-xs font-black text-slate-900 dark:text-white leading-tight">Interactive Infographics</h3>
          </div>
          
          <div className="space-y-3">
              {/* Infographic 1: Photosynthesis */}
              <div 
                  onClick={() => navigate('photosynthesis')}
                  className="bg-white dark:bg-slate-950 p-3.5 rounded-[10px] border border-slate-100 dark:border-slate-800/80 hover:border-emerald-200 dark:hover:border-emerald-800 shadow-sm hover:shadow transition cursor-pointer flex justify-between items-center group"
              >
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-[10px] flex items-center justify-center text-base group-hover:scale-105 transition">
                          <i className="fa-solid fa-leaf"></i>
                      </div>
                      <div>
                          <h4 className="text-[10px] font-black text-slate-950 dark:text-white leading-tight mb-0.5">Photosynthesis Science Infographic</h4>
                          <p className="text-[8px] text-slate-500 dark:text-slate-400 font-bold">Step-by-step leaf food synthesis visualizer</p>
                      </div>
                  </div>
                  <span className="w-6 h-6 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 rounded-full flex items-center justify-center transition">
                      <i className="fa-solid fa-chevron-right text-[8px]"></i>
                  </span>
              </div>

              {/* Infographic 2: Bangladesh Map */}
              <div 
                  onClick={() => navigate('interactive-map')}
                  className="bg-white dark:bg-slate-950 p-3.5 rounded-[10px] border border-slate-100 dark:border-slate-800/80 hover:border-blue-200 dark:hover:border-blue-800 shadow-sm hover:shadow transition cursor-pointer flex justify-between items-center group"
              >
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 rounded-[10px] flex items-center justify-center text-base group-hover:scale-105 transition">
                          <i className="fa-solid fa-map-location-dot"></i>
                      </div>
                      <div>
                          <h4 className="text-[11px] font-black text-slate-950 dark:text-white leading-tight mb-0.5">Interactive Bangladesh Map</h4>
                          <p className="text-[8px] text-slate-500 dark:text-slate-400 font-bold">Explore divisions, districts & landmarks</p>
                      </div>
                  </div>
                  <span className="w-6 h-6 bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50 group-hover:text-blue-600 dark:group-hover:text-blue-400 rounded-full flex items-center justify-center transition">
                      <i className="fa-solid fa-chevron-right text-[8px]"></i>
                  </span>
              </div>
          </div>
      </div>
      
      {/* AI Assistant FAB */}
      <button 
        onClick={() => navigate('ai-assistant')}
        className="fixed bottom-[4.5rem] right-4 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,99,235,0.4)] transition-transform hover:scale-105 z-40 flex items-center justify-center group cursor-pointer"
      >
        <Target className="w-6 h-6 animate-pulse" />
        <span className="absolute right-full mr-4 bg-gray-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)]">
          AI Assistant
        </span>
      </button>
    </div>
  );
}

import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { useLanguage, T } from '../context/LanguageContext';
import { triggerHaptic } from '../utils/haptics';
import MathIcon from '../components/MathIcon';
import EnglishIcon from '../components/EnglishIcon';
import BanglaIcon from '../components/BanglaIcon';
import GKIcon from '../components/GKIcon';
import DailyGoalTracker from '../components/DailyGoalTracker';
import cadetsSplash from '../assets/images/cadets_splash_1785297743949.jpg';
import bdCadetsLogo from '../assets/images/BD-cadets-logo.svg';

export default function Home() {
  const { navigate } = useRouter();
  const { userData, isDark } = useData();
  const { lang, setLang, t } = useLanguage();

  const toggleLang = () => {
    triggerHaptic('light');
    setLang(lang === 'bn' ? 'en' : 'bn');
  };

  // Dynamic banner background based on dark mode state
  const bannerBg = isDark 
    ? `linear-gradient(to right, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.6)), url(${cadetsSplash})`
    : `linear-gradient(to right, rgba(240, 249, 255, 0.98), rgba(240, 249, 255, 0.55)), url(${cadetsSplash})`;
  const bannerBorder = isDark ? '1px solid #1e293b' : '1px solid #e0f2fe';

  return (
    <div className="animate-in fade-in duration-300 pb-20">
      <header className="flex justify-between items-center p-4 sticky top-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md z-20 border-b border-slate-100 dark:border-slate-800/60 transition-colors duration-300">
          <div className="flex items-center gap-3">
              <img src={bdCadetsLogo} alt="BD Cadets Logo" className="w-10 h-10 object-contain rounded-xl border border-slate-200/80 dark:border-slate-800 p-1 bg-slate-50 dark:bg-slate-900 shadow-sm" />
              <div>
                  <h1 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5"><T id="greeting_morning" /> <span className="text-lg animate-bounce">👋</span></h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{lang === 'bn' ? <T>আজকের পড়াশোনা, আপনাদের সাফল্য।</T> : <T id="motto" />}</p>
              </div>
          </div>
          <div className="flex gap-2 items-center">
              <button 
                onClick={toggleLang} 
                className="text-slate-700 dark:text-slate-300 min-h-[36px] min-w-[36px] px-3 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 font-extrabold text-xs uppercase transition-all active:scale-95 animate-in fade-in"
              >
                  <T>{lang === 'bn' ? 'EN' : 'BN'}</T>
              </button>
              <button 
                onClick={() => triggerHaptic('light')}
                className="text-slate-700 dark:text-slate-300 min-h-[36px] min-w-[36px] bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-95 relative"
                aria-label="Notifications"
              >
                  <i className="fa-regular fa-bell text-sm"></i>
                  <span className="absolute top-1.5 right-1.5 bg-red-500 w-2 h-2 rounded-full border border-white dark:border-slate-950"></span>
              </button>
              <button 
                onClick={() => { triggerHaptic('light'); navigate('settings'); }}
                className="text-slate-700 dark:text-slate-300 min-h-[36px] min-w-[36px] bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center border border-slate-200 dark:border-slate-800 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-all active:scale-95"
                aria-label="Settings"
              >
                  <i className="fa-solid fa-gear text-sm"></i>
              </button>
          </div>
      </header>
 
      {/* Hero Banner matching exact video design */}
      <div className="px-4 pt-3">
          <div 
            className="rounded-3xl p-5 relative overflow-hidden flex flex-col justify-between bg-cover bg-center shadow-sm border transition-all duration-300 min-h-[160px]" 
            style={{ backgroundImage: bannerBg, border: bannerBorder }}
          >
              <div className="relative z-10 max-w-[78%]">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-8 h-8 rounded-xl bg-white p-1 border border-slate-200/80 shadow-xs flex items-center justify-center shrink-0">
                    <img src={bdCadetsLogo} alt="BD Cadets Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900 dark:text-white tracking-tight leading-tight"><T id="app_title" /></h2>
                    <div className="flex gap-1 mt-0.5">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 px-1.5 py-0.2 rounded border border-slate-200/60 dark:border-slate-700/60">
                        <T>{lang === 'bn' ? 'এইচএসসি' : 'HSC'}</T>
                      </span>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 px-1.5 py-0.2 rounded border border-slate-200/60 dark:border-slate-700/60">
                        <T>{lang === 'bn' ? 'অ্যাডমিশন' : 'Admission'}</T>
                      </span>
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 px-1.5 py-0.2 rounded border border-slate-200/60 dark:border-slate-700/60">
                        <T>{lang === 'bn' ? 'সমকক্ষ' : 'Academic'}</T>
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed font-medium">
                  {lang === 'bn' ? <T>ক্যাডেট কলেজ ভর্তি প্রস্তুতির জন্য আপনার সম্পূর্ণ নির্ভরযোগ্য প্ল্যাটফর্ম</T> : <T id="hero_desc" />}
                </p>
              </div>
          </div>
      </div>
 
      {/* Stats Section with 8px rhythm spacing */}
      <div className="flex gap-3 px-4 pt-5 pb-2">
          <DailyGoalTracker />
          <div className="bg-white dark:bg-slate-950 flex-1 rounded-2xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-colors duration-300">
              <div className="flex justify-between items-start">
                  <div>
                      <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider"><T id="study_streak" /></h3>
                      <p className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{userData.studyStreak} <span className="text-xs font-semibold text-slate-500 dark:text-slate-400"><T id="days" /></span></p>
                  </div>
                  <i className="fa-solid fa-fire text-orange-500 bg-orange-100/80 dark:bg-orange-950/50 p-2 rounded-xl text-xs animate-pulse"></i>
              </div>
              <div className="flex justify-between mt-3 px-0.5">
                  <div className="flex flex-col items-center gap-1"><span className="text-xs text-slate-400 dark:text-slate-500 font-bold"><T id="mon_short" /></span><div className="w-2 h-2 bg-emerald-500 rounded-full"></div></div>
                  <div className="flex flex-col items-center gap-1"><span className="text-xs text-slate-400 dark:text-slate-500 font-bold"><T id="tue_short" /></span><div className="w-2 h-2 bg-emerald-500 rounded-full"></div></div>
                  <div className="flex flex-col items-center gap-1"><span className="text-xs text-slate-400 dark:text-slate-500 font-bold"><T id="wed_short" /></span><div className="w-2 h-2 bg-emerald-500 rounded-full"></div></div>
                  <div className="flex flex-col items-center gap-1"><span className="text-xs text-slate-400 dark:text-slate-500 font-bold"><T id="thu_short" /></span><div className="w-2 h-2 bg-emerald-500 rounded-full"></div></div>
                  <div className="flex flex-col items-center gap-1"><span className="text-xs text-slate-400 dark:text-slate-500 font-bold"><T id="fri_short" /></span><div className="w-2 h-2 bg-slate-200 dark:bg-slate-800 rounded-full"></div></div>
                  <div className="flex flex-col items-center gap-1"><span className="text-xs text-slate-400 dark:text-slate-500 font-bold"><T id="sat_short" /></span><div className="w-2 h-2 bg-slate-200 dark:bg-slate-800 rounded-full"></div></div>
              </div>
          </div>
      </div>
 
      {/* Quick Access Grid */}
      <div className="px-4 pt-4 pb-2">
          <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider"><T id="quick_access" /></h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
              <button 
                onClick={() => { triggerHaptic('light'); navigate('study-plan'); }} 
                className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform"
              >
                  <div className="w-13 h-13 min-h-[48px] min-w-[48px] bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-900/40 rounded-2xl flex justify-center items-center shadow-sm group-hover:scale-105 transition"><i className="fa-regular fa-calendar-check text-xl"></i></div>
                  <span className="text-xs text-slate-800 dark:text-slate-200 font-bold"><T id="study_plan" /></span>
              </button>
              <button 
                onClick={() => { triggerHaptic('light'); navigate('test'); }} 
                className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform"
              >
                  <div className="w-13 h-13 min-h-[48px] min-w-[48px] bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/80 dark:border-blue-900/40 rounded-2xl flex justify-center items-center shadow-sm group-hover:scale-105 transition"><i className="fa-solid fa-laptop-code text-xl"></i></div>
                  <span className="text-xs text-slate-800 dark:text-slate-200 font-bold"><T id="mock_test" /></span>
              </button>
              <button 
                onClick={() => { triggerHaptic('light'); navigate('test'); }} 
                className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform"
              >
                  <div className="w-13 h-13 min-h-[48px] min-w-[48px] bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-200/80 dark:border-purple-900/40 rounded-2xl flex justify-center items-center shadow-sm group-hover:scale-105 transition"><i className="fa-regular fa-file-lines text-xl"></i></div>
                  <span className="text-xs text-slate-800 dark:text-slate-200 font-bold"><T id="past_papers" /></span>
              </button>
              <button 
                onClick={() => { triggerHaptic('light'); navigate('study'); }} 
                className="flex flex-col items-center gap-2 group cursor-pointer active:scale-95 transition-transform"
              >
                  <div className="w-13 h-13 min-h-[48px] min-w-[48px] bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/80 dark:border-amber-900/40 rounded-2xl flex justify-center items-center shadow-sm group-hover:scale-105 transition"><i className="fa-regular fa-bookmark text-xl"></i></div>
                  <span className="text-xs text-slate-800 dark:text-slate-200 font-bold"><T id="notes" /></span>
              </button>
          </div>
      </div>

      {/* Subjects Grid */}
      <div className="px-4 pt-5 pb-2">
          <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider"><T id="subjects" /></h3>
              <button onClick={() => { triggerHaptic('light'); navigate('all-subjects'); }} className="text-xs text-blue-600 dark:text-blue-400 font-extrabold cursor-pointer hover:underline"><T id="view_all" /></button>
          </div>
          <div className="grid grid-cols-4 gap-3">
              <button onClick={() => { triggerHaptic('light'); navigate('study'); }} className="bg-emerald-50/60 dark:bg-emerald-950/20 rounded-2xl p-2.5 flex flex-col items-center border border-emerald-200/80 dark:border-emerald-900/30 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                      <MathIcon className="w-10 h-10" />
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-slate-200 mt-2"><T id="math" /></span>
              </button>
              
              <button onClick={() => { triggerHaptic('light'); navigate('study'); }} className="bg-purple-50/60 dark:bg-purple-950/20 rounded-2xl p-2.5 flex flex-col items-center border border-purple-200/80 dark:border-purple-900/30 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                      <EnglishIcon className="w-10 h-10" />
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-slate-200 mt-2"><T id="english" /></span>
              </button>

              <button onClick={() => { triggerHaptic('light'); navigate('study'); }} className="bg-amber-50/60 dark:bg-amber-950/20 rounded-2xl p-2.5 flex flex-col items-center border border-amber-200/80 dark:border-amber-900/30 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                      <BanglaIcon className="w-10 h-10" />
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-slate-200 mt-2"><T id="bangla" /></span>
              </button>

              <button onClick={() => { triggerHaptic('light'); navigate('study'); }} className="bg-blue-50/60 dark:bg-blue-950/20 rounded-2xl p-2.5 flex flex-col items-center border border-blue-200/80 dark:border-blue-900/30 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                      <GKIcon className="w-10 h-10" />
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-slate-200 mt-2"><T id="general_knowledge" /></span>
              </button>
          </div>
      </div>
      
      {/* Interactive Infographics Section */}
      <div className="px-4 pt-5 pb-4 border-t border-slate-200/80 dark:border-slate-800/80 mt-3">
          <div className="flex justify-between items-center mb-3">
              <div>
                  <span className="text-xs font-black tracking-wider text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <T id="visual_smart_study" />
                  </span>
                  <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight mt-0.5"><T id="interactive_infographics" /></h3>
              </div>
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800"><T id="special_lessons" /></span>
          </div>
          
          <div className="space-y-3">
              {/* Infographic 1: Photosynthesis */}
              <div 
                  onClick={() => { triggerHaptic('light'); navigate('photosynthesis'); }}
                  className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group relative overflow-hidden"
              >
                  <div className="flex items-center gap-3.5 relative z-10">
                      <div className="w-12 h-12 bg-emerald-100/80 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-2xl border border-emerald-300/60 dark:border-emerald-800/60 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shrink-0">
                          <i className="fa-solid fa-leaf"></i>
                      </div>
                      <div>
                          <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="text-sm font-extrabold text-slate-950 dark:text-white leading-tight"><T id="photosynthesis_title" /></h4>
                              <span className="text-xs font-black bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded-md"><T id="smart_visual" /></span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1"><T id="photosynthesis_desc" /></p>
                      </div>
                  </div>
                  <span className="w-8 h-8 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 group-hover:bg-emerald-600 group-hover:text-white rounded-full flex items-center justify-center transition-colors shadow-sm shrink-0 ml-2">
                      <i className="fa-solid fa-chevron-right text-xs"></i>
                  </span>
              </div>

              {/* Infographic 2: Bangladesh Map */}
              <div 
                  onClick={() => { triggerHaptic('light'); navigate('interactive-map'); }}
                  className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group relative overflow-hidden"
              >
                  <div className="flex items-center gap-3.5 relative z-10">
                      <div className="w-12 h-12 bg-blue-100/80 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-300/60 dark:border-blue-800/60 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shrink-0">
                          <i className="fa-solid fa-map-location-dot"></i>
                      </div>
                      <div>
                          <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="text-sm font-extrabold text-slate-950 dark:text-white leading-tight"><T id="bd_map_title" /></h4>
                              <span className="text-xs font-black bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-2 py-0.5 rounded-md"><T id="interactive" /></span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1"><T id="bd_map_desc" /></p>
                      </div>
                  </div>
                  <span className="w-8 h-8 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-full flex items-center justify-center transition-colors shadow-sm shrink-0 ml-2">
                      <i className="fa-solid fa-chevron-right text-xs"></i>
                  </span>
              </div>

              {/* Infographic 3: Padma Bridge */}
              <div 
                  onClick={() => { triggerHaptic('light'); navigate('padma-bridge'); }}
                  className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group relative overflow-hidden"
              >
                  <div className="flex items-center gap-3.5 relative z-10">
                      <div className="w-12 h-12 bg-amber-100/80 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-300/60 dark:border-amber-800/60 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shrink-0">
                          <span className="text-xl">🌉</span>
                      </div>
                      <div>
                          <div className="flex items-center gap-2 mb-0.5">
                              <h4 className="text-sm font-extrabold text-slate-950 dark:text-white leading-tight"><T id="padma_bridge_title" /></h4>
                              <span className="text-xs font-black bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-md"><T id="simulator_quiz" /></span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium line-clamp-1"><T id="padma_bridge_desc" /></p>
                      </div>
                  </div>
                  <span className="w-8 h-8 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 group-hover:bg-amber-600 group-hover:text-white rounded-full flex items-center justify-center transition-colors shadow-sm shrink-0 ml-2">
                      <i className="fa-solid fa-chevron-right text-xs"></i>
                  </span>
              </div>
          </div>
      </div>
      
    </div>
  );
}


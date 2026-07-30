import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { Bell, Search, BookOpen, Clock, TrendingUp, Trophy, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Calculator, Globe, Languages } from 'lucide-react';
import MathIcon from '../components/MathIcon';
import EnglishIcon from '../components/EnglishIcon';
import DailyGoalTracker from '../components/DailyGoalTracker';
import cadetsSplash from '../assets/images/cadets_splash_1785297743949.jpg';
import bdCadetsLogo from '../assets/images/BD-cadets-logo.png';

export default function Home() {
  const { navigate } = useRouter();
  const { userData, isDark } = useData();
  const { lang, setLang, t } = useLanguage();

  const toggleLang = () => {
    setLang(lang === 'bn' ? 'en' : 'bn');
  };

  // Dynamic banner background based on dark mode state
  const bannerBg = isDark 
    ? `linear-gradient(to right, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.45)), url(${cadetsSplash})`
    : `linear-gradient(to right, rgba(240, 249, 255, 0.95), rgba(240, 249, 255, 0.4)), url(${cadetsSplash})`;
  const bannerBorder = isDark ? '1px solid #1e293b' : '1px solid #e0f2fe';

  return (
    <div className="animate-in fade-in duration-300">
      <header className="flex justify-between items-center p-4 sticky top-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm z-20 transition-colors duration-300">
          <div className="flex items-center gap-2.5">
              <img src={bdCadetsLogo} alt="BD Cadets Logo" className="w-9 h-9 object-contain rounded-lg border border-slate-100 dark:border-slate-800/80 p-0.5 bg-slate-50 dark:bg-slate-900 shadow-sm" />
              <div>
                  <h1 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">{t('greeting_morning')} <span className="text-base">👋</span></h1>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold font-sans">{t('motto')}</p>
              </div>
          </div>
          <div className="flex gap-2 items-center">
              <button onClick={toggleLang} className="text-slate-700 dark:text-slate-300 relative px-2.5 bg-slate-50 dark:bg-slate-900 rounded-full h-8 flex items-center justify-center border border-slate-200 dark:border-slate-800/80 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-[10px] uppercase">
                  {lang === 'bn' ? 'EN' : 'BN'}
              </button>
              <button className="text-slate-700 dark:text-slate-300 relative p-1 bg-slate-50 dark:bg-slate-900 rounded-full w-8 h-8 flex items-center justify-center border border-slate-200 dark:border-slate-800/80 cursor-pointer">
                  <i className="fa-regular fa-bell"></i>
                  <span className="absolute top-1 right-1.5 bg-red-500 w-2 h-2 rounded-full border border-white dark:border-slate-950"></span>
              </button>
          </div>
      </header>

      {/* Hero Banner */}
      <div className="px-4 py-1">
          <div 
            className="rounded-[10px] p-4 relative overflow-hidden h-36 flex flex-col justify-center bg-cover bg-center shadow-sm transition-all duration-300" 
            style={{ backgroundImage: bannerBg, border: bannerBorder }}
          >
              <img src={bdCadetsLogo} alt="BD Cadets Logo" className="w-8 h-8 object-contain mb-2 shadow-sm rounded-lg bg-white/90 p-0.5" />
              <h2 className="text-[15px] font-black text-slate-900 dark:text-white tracking-tight">{t('app_title')}</h2>
              <p className="text-[9px] text-slate-600 dark:text-blue-400 font-black mb-1 tracking-wider uppercase">{t('hero_subtitle')}</p>
              <p className="text-[10px] text-slate-600 dark:text-slate-300 w-[65%] mt-1 leading-tight font-bold">{t('hero_desc')}</p>
          </div>
      </div>

      {/* Stats */}
      <div className="flex gap-3 px-4 py-3">
          <DailyGoalTracker />
          <div className="bg-white dark:bg-slate-950 flex-1 rounded-2xl p-3.5 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-colors duration-300">
              <div className="flex justify-between items-start">
                  <div>
                      <h3 className="text-[14px] leading-[15.5px] font-black text-slate-800 dark:text-slate-200">{t('study_streak')}</h3>
                      <p className="text-xs font-black text-slate-900 dark:text-white mt-1">{userData.studyStreak} <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">{t('days')}</span></p>
                  </div>
                  <i className="fa-solid fa-fire text-orange-500 bg-orange-50 dark:bg-orange-950/40 p-1.5 rounded-full text-[10px]"></i>
              </div>
              <div className="flex justify-between mt-2 px-1">
                  <div className="flex flex-col items-center gap-1"><span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold">{t('mon_short')}</span><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div></div>
                  <div className="flex flex-col items-center gap-1"><span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold">{t('tue_short')}</span><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div></div>
                  <div className="flex flex-col items-center gap-1"><span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold">{t('wed_short')}</span><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div></div>
                  <div className="flex flex-col items-center gap-1"><span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold">{t('thu_short')}</span><div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div></div>
                  <div className="flex flex-col items-center gap-1"><span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold">{t('fri_short')}</span><div className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full"></div></div>
                  <div className="flex flex-col items-center gap-1"><span className="text-[8px] text-slate-400 dark:text-slate-500 font-bold">{t('sat_short')}</span><div className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full"></div></div>
              </div>
          </div>
      </div>

      {/* Quick Access */}
      <div className="px-4 py-2">
          <div className="flex justify-between items-center mb-3">
              <h3 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('quick_access')}</h3>
          </div>
          <div className="grid grid-cols-4 gap-3">
              <button onClick={() => navigate('study-plan')} className="flex flex-col items-center gap-1.5 group cursor-pointer">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40 rounded-[10px] flex justify-center items-center group-hover:scale-105 transition"><i className="fa-regular fa-calendar-check text-lg"></i></div>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">{t('study_plan')}</span>
              </button>
              <button onClick={() => navigate('test')} className="flex flex-col items-center gap-1.5 group cursor-pointer">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40 rounded-[10px] flex justify-center items-center group-hover:scale-105 transition"><i className="fa-solid fa-laptop-code text-lg"></i></div>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">{t('mock_test')}</span>
              </button>
              <button onClick={() => navigate('test')} className="flex flex-col items-center gap-1.5 group cursor-pointer">
                  <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900/40 rounded-[10px] flex justify-center items-center group-hover:scale-105 transition"><i className="fa-regular fa-file-lines text-lg"></i></div>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">{t('past_papers')}</span>
              </button>
              <button onClick={() => navigate('study')} className="flex flex-col items-center gap-1.5 group cursor-pointer">
                  <div className="w-12 h-12 bg-orange-50 dark:bg-orange-950/30 text-orange-500 dark:text-orange-400 border border-orange-200 dark:border-orange-900/40 rounded-[10px] flex justify-center items-center group-hover:scale-105 transition"><i className="fa-regular fa-bookmark text-lg"></i></div>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">{t('notes')}</span>
              </button>
          </div>
      </div>

      {/* Subjects Grid */}
      <div className="px-4 py-4">
          <div className="flex justify-between items-center mb-3">
              <h3 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('subjects')}</h3>
              <button onClick={() => navigate('all-subjects')} className="text-xs text-blue-600 dark:text-blue-400 font-black cursor-pointer">{t('view_all')}</button>
          </div>
          <div className="grid grid-cols-4 gap-2.5">
              <button onClick={() => navigate('study')} className="bg-[#eefcf2] dark:bg-emerald-950/20 rounded-[10px] p-2 flex flex-col items-center border border-[#c4ded1] dark:border-emerald-900/30 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                      <div className="w-10 h-10 flex items-center justify-center relative">
                          <div className="absolute top-0.5 left-0.5 right-0.5 h-[30%] bg-white/10 rounded-[6px]"></div>
                          <MathIcon className="w-10 h-10" />
                          <div className="absolute -right-1 bottom-1 w-3 h-6 bg-[#6ee7b7] rounded-[3px] border border-[#059669]/20 shadow-sm hidden flex items-center justify-center">
                              <div className="w-0.5 h-3 bg-[#059669]/40 rounded-full"></div>
                          </div>
                      </div>
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-slate-200 mt-2">{t('math')}</span>
              </button>
              
              <button onClick={() => navigate('study')} className="bg-[#f5f3ff] dark:bg-purple-950/20 rounded-[10px] p-2 flex flex-col items-center border border-[#ddd6fe] dark:border-purple-900/30 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                      <div className="w-10 h-10 flex items-center justify-center relative">
                          <div className="absolute top-0.5 left-0.5 right-0.5 h-[30%] bg-white/10 rounded-[6px]"></div>
                          <EnglishIcon className="w-10 h-10" />
                          <div className="absolute -right-1 bottom-1 w-3 h-6 bg-[#a5b4fc] rounded-[3px] border border-[#4f46e5]/20 shadow-sm hidden flex items-center justify-center">
                              <div className="w-0.5 h-3 bg-[#4f46e5]/40 rounded-full"></div>
                          </div>
                      </div>
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-slate-200 mt-2">{t('english')}</span>
              </button>

              <button onClick={() => navigate('study')} className="bg-[#fffbeb] dark:bg-amber-950/20 rounded-[10px] p-2 flex flex-col items-center border border-[#ded4aa] dark:border-amber-900/30 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-[8px] relative shadow-[0_4px_8px_rgba(217,119,6,0.3)] flex items-center justify-center">
                          <div className="absolute top-0.5 left-0.5 right-0.5 h-[30%] bg-white/10 rounded-[6px]"></div>
                          <span className="text-white font-sans font-black text-[15px] select-none leading-none">{t('bangla_icon_char')}</span>
                          <div className="absolute -right-1 bottom-1 w-3 h-6 bg-[#fcd34d] rounded-[3px] border border-[#d97706]/20 shadow-sm flex items-center justify-center">
                              <div className="w-0.5 h-3 bg-[#d97706]/40 rounded-full"></div>
                          </div>
                      </div>
                  </div>
                  <span className="text-xs font-black text-slate-900 dark:text-slate-200 mt-2">{t('bangla')}</span>
              </button>

              <button onClick={() => navigate('study')} className="bg-[#eff6ff] dark:bg-blue-950/20 rounded-[10px] p-2 flex flex-col items-center border border-[#cad9ee] dark:border-blue-900/30 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition">
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
                  <span className="text-xs font-black text-slate-900 dark:text-slate-200 mt-2">{t('general_knowledge')}</span>
              </button>
          </div>
      </div>
      
      {/* Interactive Infographics Section */}
      <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-800/80 mt-2 pt-4 pb-4">
          <div className="flex justify-between items-center mb-3">
              <div>
                  <span className="text-[9px] font-black tracking-wider text-emerald-600 dark:text-emerald-400 uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {t('visual_smart_study')}
                  </span>
                  <h3 className="text-[14px] font-black text-slate-900 dark:text-white leading-tight">{t('interactive_infographics')}</h3>
              </div>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">{t('special_lessons')}</span>
          </div>
          
          <div className="space-y-3">
              {/* Infographic 1: Photosynthesis */}
              <div 
                  onClick={() => navigate('photosynthesis')}
                  className="bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group relative overflow-hidden"
              >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full -mr-6 -mt-6"></div>
                  <div className="flex items-center gap-3 relative z-10">
                      <div className="w-11 h-11 bg-emerald-100/80 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-xl border border-emerald-300/60 dark:border-emerald-800/60 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                          <i className="fa-solid fa-leaf"></i>
                      </div>
                      <div>
                          <div className="flex items-center gap-1.5 mb-0.5">
                              <h4 className="text-[13px] font-black text-slate-950 dark:text-white leading-tight">{t('photosynthesis_title')}</h4>
                              <span className="text-[8px] font-black bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 px-1.5 py-0.2 rounded-md">{t('smart_visual')}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">{t('photosynthesis_desc')}</p>
                      </div>
                  </div>
                  <span className="w-7 h-7 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 group-hover:bg-emerald-600 group-hover:text-white rounded-full flex items-center justify-center transition-colors shadow-sm">
                      <i className="fa-solid fa-chevron-right text-[10px]"></i>
                  </span>
              </div>

              {/* Infographic 2: Bangladesh Map */}
              <div 
                  onClick={() => navigate('interactive-map')}
                  className="bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800/80 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group relative overflow-hidden"
              >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full -mr-6 -mt-6"></div>
                  <div className="flex items-center gap-3 relative z-10">
                      <div className="w-11 h-11 bg-blue-100/80 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-xl border border-blue-300/60 dark:border-blue-800/60 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                          <i className="fa-solid fa-map-location-dot"></i>
                      </div>
                      <div>
                          <div className="flex items-center gap-1.5 mb-0.5">
                              <h4 className="text-[13px] font-black text-slate-950 dark:text-white leading-tight">{t('bd_map_title')}</h4>
                              <span className="text-[8px] font-black bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 px-1.5 py-0.2 rounded-md">{t('interactive')}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">{t('bd_map_desc')}</p>
                      </div>
                  </div>
                  <span className="w-7 h-7 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 group-hover:bg-blue-600 group-hover:text-white rounded-full flex items-center justify-center transition-colors shadow-sm">
                      <i className="fa-solid fa-chevron-right text-[10px]"></i>
                  </span>
              </div>

              {/* Infographic 3: Padma Bridge */}
              <div 
                  onClick={() => navigate('padma-bridge')}
                  className="bg-white dark:bg-slate-950 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800/80 hover:border-amber-500 dark:hover:border-amber-500 shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center group relative overflow-hidden"
              >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full -mr-6 -mt-6"></div>
                  <div className="flex items-center gap-3 relative z-10">
                      <div className="w-11 h-11 bg-amber-100/80 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl border border-amber-300/60 dark:border-amber-800/60 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                          <span className="text-lg">🌉</span>
                      </div>
                      <div>
                          <div className="flex items-center gap-1.5 mb-0.5">
                              <h4 className="text-[13px] font-black text-slate-950 dark:text-white leading-tight">{t('padma_bridge_title')}</h4>
                              <span className="text-[8px] font-black bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 px-1.5 py-0.2 rounded-md">{t('simulator_quiz')}</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">{t('padma_bridge_desc')}</p>
                      </div>
                  </div>
                  <span className="w-7 h-7 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 group-hover:bg-amber-600 group-hover:text-white rounded-full flex items-center justify-center transition-colors shadow-sm">
                      <i className="fa-solid fa-chevron-right text-[10px]"></i>
                  </span>
              </div>
          </div>
      </div>
      
    </div>
  );
}

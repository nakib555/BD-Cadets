import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import MathIcon from '../components/MathIcon';
import BanglaIcon from '../components/BanglaIcon';
import { useLanguage } from '../context/LanguageContext';
import { triggerHaptic } from '../utils/haptics';

export default function Progress() {
  const { userData } = useData();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('summary');

  const handleTabClick = (tabKey: string) => {
    triggerHaptic('selection');
    setActiveTab(tabKey);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full pb-8 transition-colors duration-300 animate-in fade-in duration-300">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <div className="w-10"></div>
          <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('my_progress')}</h1>
          <button className="text-slate-600 dark:text-slate-400 min-w-[44px] min-h-[44px] bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95">
              <i className="fa-regular fa-calendar text-sm"></i>
          </button>
      </header>

      <div className="bg-white dark:bg-slate-950 flex px-2 text-xs font-black text-slate-400 dark:text-slate-500 text-center sticky top-[60px] z-10 shadow-sm border-b border-slate-200/50 dark:border-slate-800/40 transition-colors duration-300">
          {[
            { key: 'summary', label: t('summary_tab') },
            { key: 'subjects', label: t('subjects_tab') },
            { key: 'tests', label: t('tests_tab') },
            { key: 'analytics', label: t('analytics_tab') }
          ].map(tab => (
            <button 
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`flex-1 min-h-[48px] py-3 uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.key 
                  ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 font-extrabold' 
                  : 'hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
      </div>

      <div className="p-4 sm:p-6 space-y-6">
          <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between transition-colors duration-300">
              <div className="flex flex-col items-center">
                  <span className="text-xs font-black text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wider">{t('overall_progress')}</span>
                  <div className="w-20 h-20 progress-circle flex items-center justify-center shadow-sm">
                      <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-inner">
                          <span className="font-extrabold text-slate-900 dark:text-white text-lg">{userData.avgScore}%</span>
                      </div>
                  </div>
              </div>
                  
              <div className="flex-1 ml-6 flex flex-col relative h-[88px]">
                  <div className="absolute right-0 top-0 text-[10px] font-black text-slate-500 dark:text-slate-400 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full border border-orange-200 dark:border-orange-900/40">
                      <i className="fa-solid fa-fire mr-1 text-xs"></i>{t('excellent_job')}
                  </div>
                  {/* Line Chart using refined SVG */}
                  <div className="mt-7 flex-1 relative w-full h-full overflow-visible">
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
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-2 px-1">
                      <span>{t('mon')}</span><span>{t('tue')}</span><span>{t('wed')}</span><span>{t('thu')}</span><span>{t('fri')}</span><span>{t('sat')}</span><span>{t('sun')}</span>
                  </div>
              </div>
          </div>

          <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 grid grid-cols-4 divide-x divide-slate-100 dark:divide-slate-800/80 text-center transition-colors duration-300">
              <div className="px-1"><p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">{t('total_tests')}</p><p className="text-base font-extrabold text-slate-900 dark:text-white">{userData.testsTaken}</p></div>
              <div className="px-1"><p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">{t('avg_score')}</p><p className="text-base font-extrabold text-slate-900 dark:text-white">{userData.avgScore}%</p></div>
              <div className="px-1"><p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">{t('best_score')}</p><p className="text-base font-extrabold text-slate-900 dark:text-white">{userData.bestScore}%</p></div>
              <div className="px-1"><p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-wider">{t('consistency')}</p><p className="text-base font-extrabold text-slate-900 dark:text-white">{userData.studyStreak} <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t('days')}</span></p></div>
          </div>

          <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
              <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider mb-5">{t('subject_performance')}</h3>
              <div className="flex flex-col gap-4">
                  <div>
                      <div className="flex justify-between items-center mb-2">
                           <div className="flex items-center gap-2.5">
                               <div className="w-6 h-6 flex items-center justify-center">
                                   <MathIcon className="w-5 h-5" />
                               </div>
                               <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('math')}</span>
                           </div>
                           <span className="text-sm font-extrabold text-slate-900 dark:text-white">৮৫% <i className="fa-solid fa-chevron-right text-xs text-slate-400 dark:text-slate-500 ml-1"></i></span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{width: '85%'}}></div>
                      </div>
                  </div>
                  
                  <div>
                      <div className="flex justify-between items-center mb-2">
                           <div className="flex items-center gap-2.5">
                               <div className="w-6 h-6 bg-purple-50 dark:bg-purple-950/40 text-purple-500 dark:text-purple-400 rounded-lg flex items-center justify-center text-xs">
                                   <i className="fa-solid fa-book-open"></i>
                               </div>
                               <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('english')}</span>
                           </div>
                           <span className="text-sm font-extrabold text-slate-900 dark:text-white">৭২% <i className="fa-solid fa-chevron-right text-xs text-slate-400 dark:text-slate-500 ml-1"></i></span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-purple-500 h-full rounded-full" style={{width: '72%'}}></div>
                      </div>
                  </div>

                  <div>
                      <div className="flex justify-between items-center mb-2">
                           <div className="flex items-center gap-2.5">
                               <div className="w-6 h-6 bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400 rounded-lg flex items-center justify-center text-xs">
                                   <i className="fa-solid fa-globe"></i>
                               </div>
                               <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('gk')}</span>
                           </div>
                           <span className="text-sm font-extrabold text-slate-900 dark:text-white">৮০% <i className="fa-solid fa-chevron-right text-xs text-slate-400 dark:text-slate-500 ml-1"></i></span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full rounded-full" style={{width: '80%'}}></div>
                      </div>
                  </div>

                  <div>
                      <div className="flex justify-between items-center mb-2">
                           <div className="flex items-center gap-2.5">
                               <div className="w-6 h-6 bg-blue-50 dark:bg-blue-950/40 text-blue-500 dark:text-blue-400 rounded-lg flex items-center justify-center text-xs">
                                   <i className="fa-solid fa-brain"></i>
                               </div>
                               <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('iq_and_mental_ability')}</span>
                           </div>
                           <span className="text-sm font-extrabold text-slate-900 dark:text-white">৭০% <i className="fa-solid fa-chevron-right text-xs text-slate-400 dark:text-slate-500 ml-1"></i></span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full rounded-full" style={{width: '70%'}}></div>
                      </div>
                  </div>

                  <div>
                      <div className="flex justify-between items-center mb-2">
                           <div className="flex items-center gap-2.5">
                               <div className="w-6 h-6 flex items-center justify-center"><BanglaIcon className="w-6 h-6" /></div>
                               <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('bangla')}</span>
                           </div>
                           <span className="text-sm font-extrabold text-slate-900 dark:text-white">৬৫% <i className="fa-solid fa-chevron-right text-xs text-slate-400 dark:text-slate-500 ml-1"></i></span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-orange-500 h-full rounded-full" style={{width: '65%'}}></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

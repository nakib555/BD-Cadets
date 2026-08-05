import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';

export default function StudyPlan() {
  const { goBack } = useRouter();
  const { t } = useLanguage();

  return (
    <div className="bg-slate-50/50 dark:bg-slate-900 min-h-full pb-6 transition-colors duration-300 animate-in fade-in duration-300">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <button onClick={goBack} className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"><i className="fa-solid fa-arrow-left text-sm"></i></button>
          <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('my_study_plan')}</h1>
          <div className="w-8"></div>
      </header>
      
      <div className="bg-white dark:bg-slate-950 px-4 py-3 border-b border-slate-200 dark:border-slate-800/80 flex justify-between transition-colors duration-300">
          <div className="flex flex-col items-center"><span className="text-xs text-slate-400 dark:text-slate-500 font-bold">{t('mon_short')}</span><span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">27</span></div>
          <div className="flex flex-col items-center bg-blue-600 rounded-xl px-3 py-1.5 shadow-sm shadow-blue-200/50 dark:shadow-none"><span className="text-xs text-blue-100 font-bold">{t('tue_short')}</span><span className="text-xs font-bold text-white mt-0.5">28</span></div>
          <div className="flex flex-col items-center"><span className="text-xs text-slate-400 dark:text-slate-500 font-bold">{t('wed_short')}</span><span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">29</span></div>
          <div className="flex flex-col items-center"><span className="text-xs text-slate-400 dark:text-slate-500 font-bold">{t('thu_short')}</span><span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">30</span></div>
          <div className="flex flex-col items-center"><span className="text-xs text-slate-400 dark:text-slate-500 font-bold">{t('fri_short')}</span><span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">31</span></div>
          <div className="flex flex-col items-center"><span className="text-xs text-slate-400 dark:text-slate-500 font-bold">{t('sat_short')}</span><span className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">1</span></div>
      </div>

      <div className="p-4 relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800"></div>

          {/* Item 1 */}
          <div className="flex gap-4 mb-6 relative">
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs z-10 mt-1"><i className="fa-solid fa-check"></i></div>
              <div className="flex-1 bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex justify-between items-center transition-colors duration-300">
                  <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold"><i className="fa-regular fa-clock mr-1 text-xs"></i>{t('morning')} 06:00 - 07:00</span>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white mt-1">{t('math')}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t('algebraic_expressions')}</p>
                  </div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-full"><i className="fa-solid fa-circle-check mr-1 text-xs"></i>{t('completed_task')}</span>
              </div>
          </div>

          {/* Item 2 */}
          <div className="flex gap-4 mb-6 relative">
              <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs border-4 border-slate-50 dark:border-slate-900 z-10 mt-1 shadow-sm"><i className="fa-solid fa-spinner"></i></div>
              <div className="flex-1 bg-white dark:bg-slate-950 p-3 rounded-xl border border-blue-200 dark:border-blue-900/30 shadow-sm shadow-blue-50/50 dark:shadow-none flex justify-between items-center ring-1 ring-blue-50/50 dark:ring-0 transition-colors duration-300">
                  <div>
                      <span className="text-xs text-blue-500 dark:text-blue-400 font-semibold"><i className="fa-regular fa-clock mr-1 text-xs"></i>{t('morning')} 07:30 - 08:30</span>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white mt-1">{t('english')}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t('vocab_grammar')}</p>
                  </div>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/40 px-2 py-1 rounded-full"><i className="fa-solid fa-arrows-rotate mr-1 text-xs"></i>{t('ongoing_task')}</span>
              </div>
          </div>

          {/* Item 3 */}
          <div className="flex gap-4 mb-6 relative">
              <div className="w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-orange-400 flex items-center justify-center z-10 mt-1"><div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div></div>
              <div className="flex-1 bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200 dark:border-slate-800/80 shadow-sm flex justify-between items-center opacity-70 transition-colors duration-300">
                  <div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold"><i className="fa-regular fa-clock mr-1 text-xs"></i>{t('morning')} 09:00 - 10:00</span>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white mt-1">{t('gk')}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t('bangladesh_affairs')}</p>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-bold"><i className="fa-regular fa-circle mr-1 text-xs"></i>{t('upcoming_task')}</span>
              </div>
          </div>
      </div>
      
      {/* Floating Target */}
      <div className="mx-4 mb-4 bg-slate-900 dark:bg-slate-950 text-white p-3 rounded-xl flex items-center justify-between shadow-lg border border-transparent dark:border-slate-800 transition-colors duration-300">
          <div>
              <h4 className="text-xs font-bold">{t('daily_goal')}</h4>
              <p className="text-xs text-slate-300 dark:text-slate-400">8/12 <span className="font-normal">{t('topics_lower')}</span></p>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-red-400 text-xl"><i className="fa-solid fa-bullseye"></i></div>
      </div>
    </div>
  );
}

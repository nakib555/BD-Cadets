import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { triggerHaptic } from '../utils/haptics';
import { useData } from '../context/DataContext';

export default function Settings() {
  const { goBack } = useRouter();
  const { t, lang, setLang } = useLanguage();
  const { resetAttemptedQuestions, userData, isDark, setIsDark } = useData();

  const [soundEnabled, setSoundEnabled] = useState(() => localStorage.getItem('sound_enabled') !== 'false');

  const handleSoundToggle = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    localStorage.setItem('sound_enabled', String(nextVal));
  };

  const subjects = [
    { key: 'Mathematics', label: t('math'), icon: 'fa-solid fa-calculator', color: 'text-blue-500' },
    { key: 'English', label: t('english'), icon: 'fa-solid fa-book', color: 'text-purple-500' },
    { key: 'Bangla', label: t('bangla'), icon: 'fa-solid fa-language', color: 'text-orange-500' },
    { key: 'GK', label: t('gk'), icon: 'fa-solid fa-globe', color: 'text-emerald-500' },
  ];

  const getAttemptedCount = (subjectKey: string) => {
    return userData.attemptedQuestions?.[subjectKey.toLowerCase()]?.length || 0;
  };

  const handleReset = (subjectKey: string) => {
    triggerHaptic('medium');
    const confirmMsg = lang === 'bn' 
      ? 'আপনি কি নিশ্চিত যে আপনি এই বিষয়ের অনুশীলন ডেটা মুছে ফেলতে চান?' 
      : 'Are you sure you want to reset your practice progress for this subject?';
    if (window.confirm(confirmMsg)) {
      resetAttemptedQuestions(subjectKey);
      triggerHaptic('success');
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full pb-6 transition-colors duration-300 animate-in fade-in duration-300">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <button 
            onClick={() => { triggerHaptic('light'); goBack(); }} 
            className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95"
          >
              <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>
          <h1 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
            {lang === 'bn' ? 'সেটিংস' : 'Settings'}
          </h1>
          <div className="w-8"></div>
      </header>

      <div className="p-4 space-y-4">
          {/* Theme Settings */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 transition-colors duration-300 shadow-sm">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/60 mb-3">
                  <i className="fa-solid fa-palette text-blue-600 dark:text-blue-400 text-sm"></i>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('appearance_theme')}</h3>
              </div>
              
              <div className="flex justify-between items-center py-2">
                  <div className="space-y-1 pr-4">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{t('global_dark_mode')}</span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{t('enable_dark_mode_desc')}</p>
                  </div>
                  
                  <button 
                    onClick={() => { triggerHaptic('light'); setIsDark(!isDark); }}
                    className={`shrink-0 w-14 h-7 rounded-full p-1 transition-all duration-300 flex items-center cursor-pointer ${
                      isDark 
                        ? 'bg-emerald-500 justify-end shadow-inner shadow-emerald-700/20' 
                        : 'bg-slate-200 dark:bg-slate-800 justify-start'
                    }`}
                  >
                      <div className="w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center text-xs transition-all duration-300">
                          {isDark ? '🌙' : '☀️'}
                      </div>
                  </button>
              </div>

              <div className={`mt-3 p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-emerald-400' 
                  : 'bg-emerald-50/50 border-emerald-100/40 text-emerald-800'
              }`}>
                  {isDark 
                    ? t('midnight_theme_active') 
                    : t('classic_theme_active')}
              </div>
          </div>

          {/* Localization Preferences */}
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 transition-colors duration-300 shadow-sm">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/60 mb-3">
                  <i className="fa-solid fa-globe text-blue-600 dark:text-blue-400 text-sm"></i>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">{t('language_and_sound')}</h3>
              </div>
              
              <div className="flex justify-between items-center py-2">
                  <div className="space-y-1">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{t('study_language')}</span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{t('study_language_desc')}</p>
                  </div>
                  
                  <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200/50 dark:border-slate-800/40">
                      <button 
                        onClick={() => { triggerHaptic('light'); setLang('en'); }}
                        className={`px-3 py-1.5 text-xs font-black uppercase rounded-lg transition cursor-pointer ${
                          lang === 'en' 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                        }`}
                      >
                          EN
                      </button>
                      <button 
                        onClick={() => { triggerHaptic('light'); setLang('bn'); }}
                        className={`px-3 py-1.5 text-xs font-black uppercase rounded-lg transition cursor-pointer ${
                          lang === 'bn' 
                            ? 'bg-blue-600 text-white shadow-sm' 
                            : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                        }`}
                      >
                          বাং
                      </button>
                  </div>
              </div>

              <div className="flex justify-between items-center py-3 mt-1 border-t border-slate-100 dark:border-slate-800/50">
                  <div className="space-y-1">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{t('sound_effects')}</span>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{t('sound_effects_desc')}</p>
                  </div>
                  
                  <button 
                    onClick={() => { triggerHaptic('light'); handleSoundToggle(); }}
                    className={`shrink-0 w-12 h-6 rounded-full p-0.5 transition-colors duration-300 flex items-center cursor-pointer ${
                      soundEnabled ? 'bg-blue-600 justify-end' : 'bg-slate-200 dark:bg-slate-800 justify-start'
                    }`}
                  >
                      <div className="w-5 h-5 rounded-full bg-white shadow-md"></div>
                  </button>
              </div>
          </div>

        <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-red-50 dark:bg-red-950/40 text-red-500 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-rotate-left"></i>
            </div>
            <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
              {lang === 'bn' ? 'অনুশীলন রিসেট করুন' : 'Reset Practice Progress'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-5 leading-relaxed">
            {lang === 'bn' 
              ? 'এখানে আপনি নির্দিষ্ট বিষয়ের এমসিকিউ সমাধানের ইতিহাস মুছে ফেলতে পারবেন, যাতে ওই বিষয়ের প্রশ্নগুলো নতুন করে অনুশীলনের জন্য আবার আসে।' 
              : 'Clear your MCQ history for specific subjects to start fresh. This allows questions from these subjects to appear again in practice mode.'}
          </p>
          <div className="space-y-3">
            {subjects.map(sub => {
              const count = getAttemptedCount(sub.key);
              return (
                <div key={sub.key} className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl transition-colors duration-300">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                      <i className={`${sub.icon} ${sub.color}`}></i> {sub.label}
                    </span>
                    <span className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
                      {count} {lang === 'bn' ? 'টি প্রশ্ন সমাধান করা হয়েছে' : 'Questions Attempted'}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleReset(sub.key)}
                    disabled={count === 0}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                      count === 0 
                        ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed' 
                        : 'bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-950/50 dark:hover:bg-red-900/60 dark:text-red-400 border border-red-200 dark:border-red-900/50 active:scale-95'
                    }`}
                  >
                    {lang === 'bn' ? 'রিসেট' : 'Reset'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Academic Info & Terms */}
        <div className="bg-slate-100/50 dark:bg-slate-950/40 border border-slate-200/20 dark:border-slate-800/40 p-4 rounded-2xl text-xs text-slate-500 dark:text-slate-400 space-y-2 text-center mt-6 mx-2 shadow-sm">
            <p className="font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-widest text-center">Cadet Applet Metadata</p>
            <div className="grid grid-cols-2 gap-y-2 pt-2 border-t border-slate-200/50 dark:border-slate-800/40 text-left">
                <span className="font-bold">App Version</span>
                <span className="text-right font-mono font-bold text-slate-700 dark:text-slate-300">1.2.5-prod</span>
                
                <span className="font-bold">Database Mode</span>
                <span className="text-right font-mono font-bold text-emerald-600 dark:text-emerald-400">Offline Sync</span>
                
                <span className="font-bold">Security Grade</span>
                <span className="text-right font-mono font-bold text-blue-600 dark:text-blue-400">Cadet Secure</span>
            </div>
        </div>
      </div>
    </div>
  );
}

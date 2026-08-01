import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { triggerHaptic } from '../utils/haptics';
import { useData } from '../context/DataContext';

export default function Settings() {
  const { goBack } = useRouter();
  const { t, lang } = useLanguage();
  const { resetAttemptedQuestions, userData } = useData();

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
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full pb-6 transition-colors duration-300">
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <button 
            onClick={() => { triggerHaptic('light'); goBack(); }} 
            className="text-slate-800 dark:text-slate-200 w-8 h-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95"
          >
              <i className="fa-solid fa-arrow-left text-sm"></i>
          </button>
          <h1 className="text-[13px] font-black text-slate-900 dark:text-white uppercase tracking-wider">
            {lang === 'bn' ? 'সেটিংস' : 'Settings'}
          </h1>
          <div className="w-8"></div>
      </header>

      <div className="p-4 space-y-6">
        <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-red-50 dark:bg-red-950/40 text-red-500 rounded-lg flex items-center justify-center">
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
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">
                      {count} {lang === 'bn' ? 'টি প্রশ্ন সমাধান করা হয়েছে' : 'Questions Attempted'}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleReset(sub.key)}
                    disabled={count === 0}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
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
      </div>
    </div>
  );
}

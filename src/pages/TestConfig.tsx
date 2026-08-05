import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { triggerHaptic } from '../utils/haptics';

export default function TestConfig() {
  const { currentRoute, goBack, navigate } = useRouter();
  const { t, lang } = useLanguage();

  const test = currentRoute.params?.test;

  // Local configuration states
  const [qCount, setQCount] = useState(10);
  const [timeLimit, setTimeLimit] = useState(600); // 10 minutes (600s)
  const [difficulty, setDifficulty] = useState('All');
  const [isConfigLoading, setIsConfigLoading] = useState(true);

  // Redirect back if no test configuration context was provided
  useEffect(() => {
    if (!test) {
      goBack();
    } else {
      // Sensible defaults based on test selected
      let initialCount = test.qns > 20 ? 15 : 5;
      if (initialCount > test.qns) initialCount = test.qns;
      setQCount(initialCount);
      
      const timer = setTimeout(() => {
        setIsConfigLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [test, goBack]);

  if (!test) {
    return null;
  }

  // State for unfinished session warning
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [targetSessionId, setTargetSessionId] = useState('');

  const proceedWithLaunch = (sid: string, isNew: boolean) => {
    navigate('test-active', {
      testTitle: test.title,
      questionCount: qCount,
      timeLimit: timeLimit,
      subject: test.subject,
      difficulty: difficulty,
      isNewTest: isNew,
      sessionId: sid
    });
  };

  const handleResumePrevious = () => {
    triggerHaptic('medium');
    setShowWarningModal(false);
    proceedWithLaunch(targetSessionId, false);
  };

  const handleStartFresh = () => {
    triggerHaptic('medium');
    setShowWarningModal(false);
    // Overwrite the previous saved test session
    try {
      const stored = localStorage.getItem('cadet_saved_tests_v1');
      if (stored) {
        const savedTests = JSON.parse(stored);
        delete savedTests[targetSessionId];
        localStorage.setItem('cadet_saved_tests_v1', JSON.stringify(savedTests));
      }
    } catch (e) {
      console.error(e);
    }
    proceedWithLaunch(targetSessionId, true);
  };

  const handleLaunchTest = () => {
    triggerHaptic('medium');
    const stableSessionId = `test_${test.id || test.title}_${test.subject}_${difficulty}`.replace(/[^a-zA-Z0-9]/g, '_');
    
    // Check if an unsubmitted session with this stableSessionId exists
    try {
      const stored = localStorage.getItem('cadet_saved_tests_v1');
      if (stored) {
        const savedTests = JSON.parse(stored);
        if (savedTests[stableSessionId]) {
          // Found an unfinished test session of the exact same configuration
          setTargetSessionId(stableSessionId);
          setShowWarningModal(true);
          return;
        }
      }
    } catch (e) {
      console.error('Failed to look up stored progress', e);
    }

    proceedWithLaunch(stableSessionId, true);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 shadow-sm shrink-0 transition-colors duration-300">
        <button 
          onClick={() => { triggerHaptic('light'); goBack(); }} 
          className="text-slate-800 dark:text-slate-200 w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <i className="fa-solid fa-arrow-left text-sm"></i>
        </button>
        <h1 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
          {lang === 'bn' ? 'টেস্ট কনফিগারেশন' : 'Test Setup'}
        </h1>
        <div className="w-10"></div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* Test Summary Info */}
        <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300 space-y-3">
          <span className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50/80 dark:bg-blue-950/40 px-2.5 py-1 rounded-full border border-blue-200/50 dark:border-blue-900/30">
            {test.type}
          </span>
          <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
            {test.title}
          </h2>
          <div className="flex gap-4 text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider pt-1">
            <span className="flex items-center gap-1">
              <i className="fa-solid fa-list-check text-blue-500"></i> 
              {test.qns} {t('questions_count')}
            </span>
            <span className="flex items-center gap-1">
              <i className="fa-regular fa-clock text-blue-500"></i> 
              {test.time}
            </span>
          </div>
        </div>

        {/* Number of Questions Selection */}
        <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              {lang === 'bn' ? 'প্রশ্নের সংখ্যা নির্ধারণ করুন' : 'Select Number of Questions'}
            </label>
            <span className="text-xs font-black text-blue-600 dark:text-blue-400 font-mono bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-lg border border-blue-200/50 dark:border-blue-900/30">
              {qCount} {lang === 'bn' ? 'টি' : 'MCQs'}
            </span>
          </div>

          {isConfigLoading ? (
            <div className="h-[46px] w-full bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
          ) : (
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <i className="fa-solid fa-pen-fancy text-slate-400 text-xs pl-1"></i>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                {lang === 'bn' ? 'কাস্টম সংখ্যা:' : 'Custom Amount:'}
              </span>
              <input
                type="number"
                min={1}
                max={test.qns || 200}
                value={qCount}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  const maxQns = test.qns || 200;
                  if (!isNaN(val) && val > 0) {
                    setQCount(Math.min(val, maxQns));
                  } else if (e.target.value === '') {
                    setQCount(1);
                  }
                }}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-xs font-black text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                placeholder={`Max ${test.qns || 200}`}
              />
            </div>
          )}
        </div>

        {/* Time Limit Selection */}
        <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300 space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              {lang === 'bn' ? 'সময় নির্ধারণ করুন' : 'Select Time Limit'}
            </label>
            <span className="text-xs font-black text-blue-600 dark:text-blue-400 font-mono bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-lg border border-blue-200/50 dark:border-blue-900/30">
              {timeLimit === 0 ? (lang === 'bn' ? 'অসীম সময়' : 'Unlimited Time') : `${Math.floor(timeLimit / 60)} ${lang === 'bn' ? 'মিনিট' : 'Mins'}`}
            </span>
          </div>

          {isConfigLoading ? (
            <div className="h-[46px] w-full bg-slate-200 dark:bg-slate-800 rounded-xl animate-pulse"></div>
          ) : (
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <i className="fa-regular fa-clock text-slate-400 text-xs pl-1"></i>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                {lang === 'bn' ? 'কাস্টম মিনিট:' : 'Custom Mins:'}
              </span>
              <input
                type="number"
                min={0}
                max={300}
                value={timeLimit > 0 ? Math.floor(timeLimit / 60) : 0}
                onChange={(e) => {
                  const mins = parseInt(e.target.value, 10);
                  if (!isNaN(mins) && mins >= 0) {
                    setTimeLimit(Math.min(mins, 300) * 60);
                  } else if (e.target.value === '') {
                    setTimeLimit(0);
                  }
                }}
                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-xs font-black text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                placeholder="0 for unlimited"
              />
            </div>
          )}
        </div>

        {/* Difficulty Selection */}
        <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm transition-colors duration-300 space-y-4">
          <label className="text-xs font-black uppercase text-slate-500 dark:text-slate-400 tracking-wider block">
            {lang === 'bn' ? 'কঠিনতার মাত্রা নির্ধারণ করুন' : 'Select Difficulty'}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: lang === 'bn' ? 'সব' : 'All', val: 'All' },
              { label: lang === 'bn' ? 'সহজ' : 'Easy', val: 'Easy' },
              { label: lang === 'bn' ? 'মধ্যম' : 'Medium', val: 'Medium' },
              { label: lang === 'bn' ? 'কঠিন' : 'Hard', val: 'Hard' }
            ].map((item) => (
              <button
                key={item.val}
                onClick={() => { triggerHaptic('light'); setDifficulty(item.val); }}
                className={`py-3 rounded-xl text-xs font-black transition cursor-pointer border ${
                  difficulty === item.val
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-amber-50 dark:bg-amber-950/25 border border-amber-200/50 dark:border-amber-900/30 rounded-2xl p-4 flex items-start gap-3">
          <span className="text-amber-500 text-lg mt-0.5">⚡</span>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === 'bn' 
              ? 'আপনার প্রস্তুতির সুবিধার্থে র্যান্ডম উপায়ে প্রশ্ন নির্বাচন করা হবে। প্রতিটি প্রশ্নের জন্য যথাযথ ব্যাখ্যা শেষ পাতায় প্রদর্শন করা হবে।' 
              : 'Questions will be dynamically selected. Detailed explanations will be shown upon submission for review.'}
          </p>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 flex gap-3 shrink-0 transition-colors duration-300 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
        <button
          onClick={() => { triggerHaptic('light'); goBack(); }}
          className="flex-1 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-black uppercase text-xs tracking-wider hover:bg-slate-50 dark:hover:bg-slate-900 transition cursor-pointer"
        >
          {t('cancel')}
        </button>
        <button
          onClick={handleLaunchTest}
          className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-wider shadow-md shadow-blue-500/15 transition cursor-pointer flex items-center justify-center gap-1.5"
        >
          {t('start_study')} <i className="fa-solid fa-chevron-right text-xs"></i>
        </button>
      </div>

      {/* Unfinished Test Warning Modal */}
      {showWarningModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-sm w-full space-y-4 text-center animate-in zoom-in duration-200">
            <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto text-xl">
              <i className="fa-solid fa-triangle-exclamation animate-bounce"></i>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
                {lang === 'bn' ? 'অসমাপ্ত পরীক্ষা রয়েছে!' : 'Unfinished Test Found!'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
                {lang === 'bn' 
                  ? 'আপনার কাছে ইতিমধ্যে এই পরীক্ষার একটি অসমাপ্ত সেশন রয়েছে। পূর্ববর্তী পরীক্ষাটি সম্পূর্ণ বা জমা না দিয়ে একই পরীক্ষার নতুন সেশন খোলা বা সংরক্ষণ করা সম্ভব নয়। চলমান অগ্রগতি সংরক্ষণ করতে আপনি কি আগের পরীক্ষাটি চালিয়ে যেতে চান নাকি নতুন করে শুরু করতে চান?' 
                  : 'You already have an unfinished practice session with these exact configurations. Since multiple concurrent unfinished sessions for the same test are not allowed, you must either resume your previous attempt or start a fresh one (which will discard your previous progress).'}
              </p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleResumePrevious}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs uppercase shadow-md transition cursor-pointer flex items-center justify-center gap-1"
              >
                <i className="fa-solid fa-play text-xs"></i> {lang === 'bn' ? 'আগের পরীক্ষাটি চালিয়ে যান' : 'Resume Previous Session'}
              </button>
              <button
                onClick={handleStartFresh}
                className="w-full py-2.5 rounded-xl border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 font-black text-xs uppercase transition cursor-pointer"
              >
                {lang === 'bn' ? 'নতুন করে শুরু করুন (আগেরটি মুছুন)' : 'Start Fresh (Discard Previous)'}
              </button>
              <button
                onClick={() => { triggerHaptic('light'); setShowWarningModal(false); }}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold text-xs uppercase hover:bg-slate-50 dark:hover:bg-slate-900 transition cursor-pointer"
              >
                {lang === 'bn' ? 'ফিরে যান' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

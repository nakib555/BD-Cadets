import React from 'react';
import { useData } from '../context/DataContext';
import { useLanguage, T } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { triggerHaptic } from '../utils/haptics';
import { 
  Target, 
  BookOpen, 
  FileCheck, 
  Award, 
  Plus, 
  Minus, 
  ChevronLeft, 
  Sparkles,
  Zap,
  Flame,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function DailyGoal() {
  const { userData, updateDailyGoalTarget } = useData();
  const { goBack, navigate } = useRouter();
  const { t, lang } = useLanguage();

  const target = userData.dailyGoalTarget || 8;
  const progress = userData.dailyGoalProgress || 0;
  const notesCount = userData.completedNotesToday || 0;
  const testsCount = userData.completedTestsToday || 0;

  const rawPercent = Math.round((progress / target) * 100);
  const percent = Math.min(100, Math.max(0, rawPercent));
  const isGoalReached = rawPercent >= 100;

  // Circular gauge calculation (larger version for full page)
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  const handleAdjustGoal = (amount: number) => {
    triggerHaptic('light');
    const newTarget = Math.max(1, Math.min(50, target + amount));
    updateDailyGoalTarget(newTarget);
  };

  const handlePresetSelect = (num: number) => {
    triggerHaptic('medium');
    updateDailyGoalTarget(num);
  };

  const handleBack = () => {
    triggerHaptic('light');
    goBack();
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-full flex flex-col transition-colors duration-300">
      {/* Page Header */}
      <header className="flex justify-between items-center p-4 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800/80 shadow-sm shrink-0 transition-colors duration-300">
        <button 
          onClick={handleBack} 
          className="text-slate-800 dark:text-slate-200 w-10 h-10 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
          <T id="daily_goal_tracker" />
        </h1>
        <div className="w-10"></div>
      </header>

      {/* Scrollable Main Layout */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 max-w-[480px] mx-auto w-full">
        {/* Main Circular Dashboard Card */}
        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col items-center text-center space-y-5 transition-colors duration-300">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-40 h-40 transform -rotate-90">
              <defs>
                <linearGradient id="goalPageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={isGoalReached ? "#10b981" : "#2563eb"} />
                  <stop offset="100%" stopColor={isGoalReached ? "#059669" : "#4f46e5"} />
                </linearGradient>
              </defs>
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-100 dark:stroke-slate-800"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="url(#goalPageGradient)"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-slate-900 dark:text-white leading-none">
                {percent}%
              </span>
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wider">
                {progress} / {target} <T id="topics" />
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {isGoalReached ? (
              <div className="inline-flex bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300 px-4 py-2 rounded-2xl text-xs font-black items-center gap-1.5 shadow-xs">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-bounce" />
                <T id="goal_reached_msg" />
              </div>
            ) : (
              <div className="text-xs font-bold text-slate-600 dark:text-slate-300 leading-relaxed px-2">
                <T id="goal_remaining_msg_1" />
                <span className="text-blue-600 dark:text-blue-400 font-black text-sm bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-lg mx-1 border border-blue-100/50 dark:border-blue-900/30">
                  {target - progress}
                </span>
                <T id="goal_remaining_msg_2" />
              </div>
            )}
          </div>
        </div>

        {/* Adjust Target Card */}
        <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4 transition-colors duration-300">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              <T id="set_daily_goal" />
            </h3>
            <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-lg border border-blue-100 dark:border-blue-900/30">
              {target} <T id="topics_per_day" />
            </span>
          </div>

          {/* Granular adjustment controls */}
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => handleAdjustGoal(-1)}
              className="w-10 h-10 rounded-lg bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-95 flex items-center justify-center transition cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-sm font-black text-slate-800 dark:text-white select-none">
              {target} <T id="topics" />
            </span>
            <button
              onClick={() => handleAdjustGoal(1)}
              className="w-10 h-10 rounded-lg bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-95 flex items-center justify-center transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Quick presets */}
          <div className="grid grid-cols-4 gap-2">
            {[5, 8, 10, 12].map((num) => (
              <button
                key={num}
                onClick={() => handlePresetSelect(num)}
                className={`py-2.5 text-xs font-black rounded-xl border transition cursor-pointer ${
                  target === num
                    ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {num} <T id="topics" />
              </button>
            ))}
          </div>
        </div>

        {/* Today's Activity Breakdown */}
        <div className="bg-white dark:bg-slate-950 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4 transition-colors duration-300">
          <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            <T id="activity_breakdown" />
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {/* Notes Completed Stats Card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between h-28 relative">
              <div className="flex justify-between items-start">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                {notesCount > 0 && (
                  <span className="text-xs bg-blue-500 text-white font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <CheckCircle className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <T id="read_notes" />
                </p>
                <p className="text-base font-black text-slate-800 dark:text-white mt-0.5">
                  {notesCount} <T id="completed_count" />
                </p>
              </div>
            </div>

            {/* Tests Taken Stats Card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between h-28 relative">
              <div className="flex justify-between items-start">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <FileCheck className="w-4 h-4" />
                </div>
                {testsCount > 0 && (
                  <span className="text-xs bg-indigo-500 text-white font-black px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <CheckCircle className="w-2.5 h-2.5" />
                  </span>
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <T id="taken_tests" />
                </p>
                <p className="text-base font-black text-slate-800 dark:text-white mt-0.5">
                  {testsCount} <T id="completed_count" />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Study Advice & Motivational Box */}
        <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/40 dark:border-amber-900/30 rounded-2xl p-4 flex gap-3.5 transition-colors duration-300">
          <div className="text-amber-500 text-xl shrink-0 mt-0.5">
            <Flame className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-black text-amber-800 dark:text-amber-400 uppercase tracking-wider">
              <T>{lang === 'bn' ? 'ক্যাডেট টিপস!' : 'Cadet Study Tip!'}</T>
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-bold leading-relaxed">
              <T>
                {isGoalReached 
                  ? (lang === 'bn' 
                    ? 'আজকের জন্য দারুণ কাজ করেছ! প্রতিদিনের এই শৃঙ্খলা তোমাকে ভর্তি পরীক্ষায় সফল হতে সবচেয়ে বেশি সাহায্য করবে।' 
                    : 'Great job for today! Maintaining this daily level of discipline is the single most important factor for success.')
                  : (lang === 'bn'
                    ? 'প্রতিদিনের পড়ার অভ্যাস তৈরি করুন। একটি নোট পড়ুন বা একটি ছোট মক টেস্ট দিয়ে আপনার প্রস্তুতি আরও নিখুঁত করুন।'
                    : 'Consistency is key. Read one revision note or take a subject quiz to make steady progress today.')
                }
              </T>
            </p>
          </div>
        </div>
      </div>

      {/* Persistent Bottom Action Bar */}
      <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 flex gap-3 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] transition-colors duration-300">
        <button
          onClick={() => { triggerHaptic('light'); navigate('study'); }}
          className="flex-1 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 font-black uppercase text-xs tracking-wider hover:bg-slate-50 dark:hover:bg-slate-900 transition cursor-pointer flex items-center justify-center gap-1.5"
        >
          <BookOpen className="w-4 h-4" /> <T id="start_study" />
        </button>
        <button
          onClick={() => { triggerHaptic('light'); navigate('test'); }}
          className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black uppercase text-xs tracking-wider shadow-sm transition cursor-pointer flex items-center justify-center gap-1.5"
        >
          <FileCheck className="w-4 h-4" /> <T id="take_test" />
        </button>
      </div>
    </div>
  );
}

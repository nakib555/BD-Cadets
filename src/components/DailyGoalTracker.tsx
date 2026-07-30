import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { CheckCircle2, Target, BookOpen, FileCheck, ChevronRight, Award, Plus, Minus, X, Sparkles } from 'lucide-react';

export default function DailyGoalTracker() {
  const { userData, updateDailyGoalTarget, markNoteCompleted } = useData();
  const { navigate } = useRouter();
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  const target = userData.dailyGoalTarget || 8;
  const progress = userData.dailyGoalProgress || 0;
  const notesCount = userData.completedNotesToday || 0;
  const testsCount = userData.completedTestsToday || 0;

  const rawPercent = Math.round((progress / target) * 100);
  const percent = Math.min(100, Math.max(0, rawPercent));
  const isGoalReached = rawPercent >= 100;

  // SVG circular calculation
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <>
      {/* Home Screen Daily Goal Card */}
      <div 
        onClick={() => setShowModal(true)}
        className="bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/30 flex-1 rounded-2xl p-3.5 border border-blue-200/80 dark:border-blue-900/40 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-20 h-20 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-[13px] leading-tight font-black text-slate-900 dark:text-slate-100">
                {t('daily_goal')}
              </h3>
              {isGoalReached && (
                <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[8px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-1 animate-bounce">
                  <Sparkles className="w-2.5 h-2.5" /> {t('achieved')}
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mb-2">
              {t('todays_cadet_prep')}
            </p>

            {/* Fraction & breakdown */}
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-black text-blue-600 dark:text-blue-400">
                {progress}/{target}
              </span>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 font-bold">
                {t('topic_completed')}
              </span>
            </div>

            <div className="flex gap-2 mt-2">
              <span className="text-[9px] font-bold bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1">
                <BookOpen className="w-2.5 h-2.5 text-blue-500" /> {notesCount} {t('notes_count')}
              </span>
              <span className="text-[9px] font-bold bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 px-1.5 py-0.5 rounded-md border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-1">
                <FileCheck className="w-2.5 h-2.5 text-indigo-500" /> {testsCount} {t('tests_count')}
              </span>
            </div>
          </div>

          {/* Dynamic Circular Progress Indicator */}
          <div className="flex flex-col items-center">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-14 h-14 transform -rotate-90">
                <defs>
                  <linearGradient id="goalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={isGoalReached ? "#10b981" : "#2563eb"} />
                    <stop offset="100%" stopColor={isGoalReached ? "#34d399" : "#6366f1"} />
                  </linearGradient>
                </defs>
                <circle
                  cx="28"
                  cy="28"
                  r={radius}
                  className="stroke-slate-200 dark:stroke-slate-800"
                  strokeWidth="4.5"
                  fill="transparent"
                />
                <circle
                  cx="28"
                  cy="28"
                  r={radius}
                  stroke="url(#goalGradient)"
                  strokeWidth="4.5"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className={`text-[11px] font-black leading-none ${isGoalReached ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-100'}`}>
                  {percent}%
                </span>
              </div>
            </div>
            <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold mt-1 group-hover:underline flex items-center gap-0.5">
              {t('view_details')} <ChevronRight className="w-2.5 h-2.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Daily Goal Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-950 w-full max-w-md rounded-t-2xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">{t('daily_goal_tracker')}</h3>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{t('daily_goal_tracker_desc')}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-5 overflow-y-auto">
              {/* Circular Gauge Display */}
              <div className="flex flex-col items-center bg-gradient-to-b from-blue-50/60 to-transparent dark:from-blue-950/20 dark:to-transparent p-5 rounded-2xl border border-blue-100 dark:border-blue-900/30 text-center relative">
                <div className="relative w-28 h-28 flex items-center justify-center mb-3">
                  <svg className="w-28 h-28 transform -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="46"
                      className="stroke-slate-200 dark:stroke-slate-800"
                      strokeWidth="8"
                      fill="transparent"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="46"
                      stroke="url(#modalGoalGradient)"
                      strokeWidth="8"
                      strokeDasharray={2 * Math.PI * 46}
                      strokeDashoffset={2 * Math.PI * 46 - (percent / 100) * (2 * Math.PI * 46)}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-700 ease-out"
                    />
                    <defs>
                      <linearGradient id="modalGoalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={isGoalReached ? "#10b981" : "#2563eb"} />
                        <stop offset="100%" stopColor={isGoalReached ? "#059669" : "#4f46e5"} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-slate-900 dark:text-white">{percent}%</span>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{progress}/{target} {t('topics')}</span>
                  </div>
                </div>

                {isGoalReached ? (
                  <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs">
                    <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    {t('goal_reached_msg')}
                  </div>
                ) : (
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {t('goal_remaining_msg_1')}<span className="text-blue-600 dark:text-blue-400 font-black">{target - progress}</span>{t('goal_remaining_msg_2')}
                  </p>
                )}
              </div>

              {/* Goal Target Customization */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    {t('set_daily_goal')}
                  </label>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                    {target} {t('topics_per_day')}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[5, 8, 10, 12].map((num) => (
                    <button
                      key={num}
                      onClick={() => updateDailyGoalTarget(num)}
                      className={`py-2 text-xs font-black rounded-xl border transition cursor-pointer ${
                        target === num
                          ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      {num} {t('topics')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Activity Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {t('activity_breakdown')}
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{t('read_notes')}</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white">{notesCount}{t('completed_count')}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{t('taken_tests')}</p>
                      <p className="text-sm font-black text-slate-900 dark:text-white">{testsCount}{t('completed_count')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Navigation buttons inside modal */}
              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    navigate('study');
                  }}
                  className="flex-1 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-sm flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  <BookOpen className="w-4 h-4" />
                  {t('start_study')}
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    navigate('test');
                  }}
                  className="flex-1 py-2.5 px-3 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-black shadow-sm flex items-center justify-center gap-2 cursor-pointer transition"
                >
                  <FileCheck className="w-4 h-4" />
                  {t('take_test')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

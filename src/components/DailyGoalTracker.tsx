import React from 'react';
import { useData } from '../context/DataContext';
import { useLanguage, T } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { triggerHaptic } from '../utils/haptics';
import { Target, ChevronRight, Sparkles } from 'lucide-react';

export default function DailyGoalTracker() {
  const { userData } = useData();
  const { navigate } = useRouter();
  const { t, lang } = useLanguage();

  const target = userData.dailyGoalTarget || 8;
  const progress = userData.dailyGoalProgress || 0;

  const rawPercent = Math.round((progress / target) * 100);
  const percent = Math.min(100, Math.max(0, rawPercent));
  const isGoalReached = rawPercent >= 100;

  // SVG circular calculation
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  const handleClick = () => {
    triggerHaptic('light');
    navigate('daily-goal');
  };

  return (
    <div 
      onClick={handleClick}
      id="daily-goal-card"
      className="bg-white dark:bg-slate-950 flex-1 rounded-2xl p-3.5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow transition-all duration-200 cursor-pointer relative overflow-hidden group flex flex-col justify-between"
    >
      <div className="flex items-center gap-1.5 mb-1">
        <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
          <T id="daily_goal" />
        </h3>
        {isGoalReached && (
          <span className="bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-[8px] font-black px-1.5 py-0.5 rounded-full flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> <T id="achieved" />
          </span>
        )}
      </div>

      {/* Circular Progress & Fraction side-by-side */}
      <div className="flex items-center justify-between my-2">
        <div>
          <span className="text-xs font-black text-slate-900 dark:text-slate-100 block">
            {progress}/{target} <T id="daily_goal" />
          </span>
        </div>

        <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
          <svg className="w-12 h-12 transform -rotate-90">
            <defs>
              <linearGradient id="goalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={isGoalReached ? "#10b981" : "#2563eb"} />
                <stop offset="100%" stopColor={isGoalReached ? "#34d399" : "#6366f1"} />
              </linearGradient>
            </defs>
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-slate-100 dark:stroke-slate-800"
              strokeWidth="4"
              fill="transparent"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="url(#goalGradient)"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <span className={`text-[10px] font-black ${isGoalReached ? 'text-emerald-600' : 'text-blue-600 dark:text-blue-400'}`}>
              {percent}%
            </span>
          </div>
        </div>
      </div>

      {/* Bottom stats row matching video */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[9px] font-bold text-slate-500 dark:text-slate-400">
        <div className="flex gap-2">
          <span>0 <T>{lang === 'bn' ? 'অর্জিত' : 'Earned'}</T></span>
          <span>0 <T id="pts" /></span>
        </div>
        <span className="text-blue-600 dark:text-blue-400 flex items-center group-hover:underline">
          <T id="view_details" /> <ChevronRight className="w-2.5 h-2.5" />
        </span>
      </div>
    </div>
  );
}

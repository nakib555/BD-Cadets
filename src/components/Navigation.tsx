import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage, T } from '../context/LanguageContext';
import { triggerHaptic } from '../utils/haptics';

export default function Navigation() {
  const { currentRoute, navigate, isMainTab } = useRouter();
  
  if (!isMainTab(currentRoute.path)) {
      return null;
  }

  const activeTab = currentRoute.path;

  const navItems = [
    { id: 'home', iconClass: 'fa-solid fa-house', labelId: 'home' },
    { id: 'study', iconClass: 'fa-solid fa-book-open-reader', labelId: 'study' },
    { id: 'test', iconClass: 'fa-regular fa-pen-to-square', labelId: 'test' },
    { id: 'progress', iconClass: 'fa-solid fa-chart-simple', labelId: 'progress' },
    { id: 'profile', iconClass: 'fa-regular fa-user', labelId: 'profile' },
  ];

  return (
    <nav className="absolute bottom-0 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 flex justify-evenly items-center py-1 px-1 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              triggerHaptic('light');
              navigate(item.id);
            }}
            className={`flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl transition-all duration-200 relative group cursor-pointer active:scale-95 ${
              isActive
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-900/50'
            }`}
          >
            {isActive && (
              <span className="absolute top-0 w-6 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
            )}
            <i 
              className={`${item.iconClass} text-base mb-0.5 transition-transform duration-200 ${isActive ? 'scale-110 text-blue-600 dark:text-blue-400' : 'group-hover:scale-105'}`}
            ></i>
            <span className={`text-[10px] leading-tight tracking-tight whitespace-nowrap ${isActive ? 'font-black' : 'font-semibold'}`}>
              <T id={item.labelId} />
            </span>
          </button>
        );
      })}
    </nav>
  );
}


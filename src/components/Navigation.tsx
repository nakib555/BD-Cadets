import React from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';

export default function Navigation() {
  const { currentRoute, navigate, isMainTab } = useRouter();
  const { t } = useLanguage();
  
  if (!isMainTab(currentRoute.path) && currentRoute.path !== 'test-active') {
      return null;
  }

  const activeTab = currentRoute.path === 'test-active' ? 'test' : currentRoute.path;

  const navItems = [
    { id: 'home', iconClass: 'fa-solid fa-house', label: t('home') },
    { id: 'study', iconClass: 'fa-solid fa-book-open-reader', label: t('study') },
    { id: 'test', iconClass: 'fa-regular fa-pen-to-square', label: t('test') },
    { id: 'progress', iconClass: 'fa-solid fa-chart-simple', label: t('progress') },
    { id: 'profile', iconClass: 'fa-regular fa-user', label: t('profile') },
  ];

  return (
    <nav className="absolute bottom-0 w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex justify-around items-center py-2 px-3 z-50 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 relative group cursor-pointer ${
              isActive
                ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40 font-bold'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            {isActive && (
              <span className="absolute -top-2 w-6 h-1 bg-blue-600 dark:bg-blue-400 rounded-full shadow-sm"></span>
            )}
            <i className={`${item.iconClass} text-[17px] mb-0.5 group-hover:scale-110 transition-transform duration-200`}></i>
            <span className={`text-[10px] leading-tight ${isActive ? 'font-black' : 'font-bold'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

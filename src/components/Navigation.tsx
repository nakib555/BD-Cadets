import React from 'react';
import { useRouter } from '../context/RouterContext';

export default function Navigation() {
  const { currentRoute, navigate, isMainTab } = useRouter();
  
  if (!isMainTab(currentRoute.path)) {
      return null;
  }

  const activeTab = currentRoute.path;

  const navItems = [
    { id: 'home', iconClass: 'fa-solid fa-house', label: 'Home' },
    { id: 'study', iconClass: 'fa-solid fa-book-open-reader', label: 'Study' },
    { id: 'test', iconClass: 'fa-regular fa-pen-to-square', label: 'Test' },
    { id: 'progress', iconClass: 'fa-solid fa-chart-simple', label: 'Progress' },
    { id: 'profile', iconClass: 'fa-regular fa-user', label: 'Profile' },
  ];

  return (
    <nav className="absolute bottom-0 w-full bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/80 flex justify-around items-center py-3 px-2 z-50 shadow-[0_-5px_15px_-3px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className={`flex flex-col items-center group transition-colors ${
              isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-slate-400 hover:text-blue-500 dark:text-slate-500 dark:hover:text-blue-400'
            }`}
          >
            <i className={`${item.iconClass} text-[17px] mb-1 group-hover:scale-110 transition`}></i>
            <span className={`text-[9px] ${isActive ? 'font-bold' : 'font-semibold group-hover:font-bold'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

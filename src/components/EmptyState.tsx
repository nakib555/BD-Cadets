import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export function EmptyState({ title, description, icon, children }: EmptyStateProps) {
  const { lang } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm m-4">
      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-500 rounded-full flex items-center justify-center mb-4 border border-slate-200 dark:border-slate-800">
        {icon || <AlertCircle className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-200 mb-2">
        {title || (lang === 'bn' ? 'কোনো তথ্য পাওয়া যায়নি' : 'No Data Found')}
      </h3>
      {description && (
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-sm">
          {description}
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}

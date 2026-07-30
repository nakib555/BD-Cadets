import React from 'react';

export default function PageSkeleton() {
  return (
    <div className="w-full h-full p-4 space-y-6 animate-pulse bg-white dark:bg-slate-900">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        <div className="flex-1 px-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-24 mx-auto"></div>
        </div>
        <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
      </div>

      {/* Hero / Banner Skeleton */}
      <div className="w-full h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>

      {/* Stats Cards Skeleton */}
      <div className="flex gap-4">
        <div className="flex-1 h-24 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        <div className="flex-1 h-24 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      </div>

      {/* List Items Skeleton */}
      <div className="space-y-4 mt-8">
        <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-1/3 mb-4"></div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-xl shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4"></div>
              <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

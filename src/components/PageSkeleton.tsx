import React from 'react';

export default function PageSkeleton({ path = '' }: { path?: string }) {
  if (path === 'home') {
    return (
      <div className="w-full h-full animate-pulse bg-slate-50 dark:bg-slate-900 pb-20">
        {/* Header (Top Nav) */}
        <div className="px-4 pt-6 pb-2 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            <div className="space-y-2">
              <div className="w-24 h-4 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
              <div className="w-16 h-3 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            </div>
          </div>
          <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>
        
        {/* Daily Progress Card */}
        <div className="px-4 mt-4">
          <div className="w-full h-40 bg-slate-200 dark:bg-slate-800 rounded-[2rem]"></div>
        </div>
        
        {/* Quick Subjects Grid */}
        <div className="px-4 mt-6">
          <div className="flex justify-between items-center mb-4">
             <div className="w-32 h-4 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
             <div className="w-16 h-4 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-14 h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-2"></div>
                <div className="w-10 h-2 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Infographics Section */}
        <div className="px-4 mt-6 space-y-3">
          <div className="w-40 h-4 bg-slate-200 dark:bg-slate-800 rounded-full mb-3"></div>
          {[1, 2].map(i => (
            <div key={i} className="w-full h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (path === 'study' || path === 'all-subjects') {
    return (
      <div className="w-full h-full p-4 space-y-6 animate-pulse bg-slate-50 dark:bg-slate-900 pb-20">
        <div className="flex items-center gap-4 mb-6 pt-4">
           <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
           <div className="w-32 h-6 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        </div>
        <div className="w-full h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="w-full h-24 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (path === 'test' || path === 'test-active' || path === 'test-list') {
    return (
      <div className="w-full h-full p-4 space-y-6 animate-pulse bg-slate-50 dark:bg-slate-900 pb-20">
        <div className="flex justify-between items-center mb-6 pt-4">
           <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
           <div className="w-24 h-6 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
           <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>
        
        {/* Test tabs */}
        <div className="flex gap-2 mb-6">
           <div className="flex-1 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
           <div className="flex-1 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-full h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (path === 'progress') {
    return (
      <div className="w-full h-full p-4 space-y-6 animate-pulse bg-slate-50 dark:bg-slate-900 pb-20">
        <div className="flex justify-center mb-6 pt-4">
           <div className="w-32 h-6 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
          <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl"></div>
        </div>

        {/* Big Chart Skeleton */}
        <div className="w-full h-64 bg-slate-200 dark:bg-slate-800 rounded-[2rem]"></div>
        
        <div className="w-full h-32 bg-slate-200 dark:bg-slate-800 rounded-[2rem]"></div>
      </div>
    );
  }

  if (path === 'profile') {
    return (
      <div className="w-full h-full p-4 space-y-6 animate-pulse bg-slate-50 dark:bg-slate-900 pb-20">
        <div className="flex justify-between items-center mb-6 pt-4">
           <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
           <div className="w-24 h-6 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
           <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
        </div>
        
        <div className="flex flex-col items-center mt-8">
           <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-full mb-4"></div>
           <div className="w-32 h-6 bg-slate-200 dark:bg-slate-800 rounded-full mb-2"></div>
           <div className="w-48 h-4 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        </div>

        <div className="w-full h-24 bg-slate-200 dark:bg-slate-800 rounded-[2rem] mt-6"></div>
        
        <div className="mt-8 space-y-4">
           <div className="w-40 h-5 bg-slate-200 dark:bg-slate-800 rounded-full mb-4"></div>
           {[1, 2, 3].map(i => (
             <div key={i} className="flex gap-4 items-center">
               <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl shrink-0"></div>
               <div className="flex-1 space-y-2">
                 <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-3/4"></div>
                 <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-full w-1/2"></div>
               </div>
             </div>
           ))}
        </div>
      </div>
    );
  }

  // Fallback generic skeleton
  return (
    <div className="w-full h-full p-4 space-y-6 animate-pulse bg-white dark:bg-slate-900 pb-20">
      <div className="flex items-center justify-between mb-8 pt-4">
        <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
        <div className="flex-1 px-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-24 mx-auto"></div>
        </div>
        <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
      </div>
      <div className="w-full h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      <div className="flex gap-4">
        <div className="flex-1 h-24 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
        <div className="flex-1 h-24 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      </div>
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

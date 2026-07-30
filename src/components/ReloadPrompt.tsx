import React from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function ReloadPrompt() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered: ' + r);
    },
    onRegisterError(error) {
      console.log('SW registration error', error);
    },
  });

  const close = () => {
    setOfflineReady(false);
    setNeedRefresh(false);
  };

  if (!offlineReady && !needRefresh) {
    return null;
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 p-4 z-50 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl flex flex-col gap-3">
      <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
        {offlineReady
          ? <span>App ready to work offline</span>
          : <span>New content available, click on reload button to update.</span>}
      </div>
      <div className="flex gap-2">
        {needRefresh && (
          <button
            className="flex-1 bg-blue-600 text-white font-bold py-2 rounded-xl text-xs"
            onClick={() => updateServiceWorker(true)}
          >
            Reload
          </button>
        )}
        <button
          className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold py-2 rounded-xl text-xs"
          onClick={() => close()}
        >
          Close
        </button>
      </div>
    </div>
  );
}

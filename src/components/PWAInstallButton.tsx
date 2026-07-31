import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import bdCadetsLogo from '../assets/images/BD-cadets-logo.svg';

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    // 1. Check if running in standalone mode (already installed)
    const checkStandalone = () => {
      const isStandaloneMode = 
        window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true;
      setIsStandalone(isStandaloneMode);
      return isStandaloneMode;
    };

    const standalone = checkStandalone();

    // 2. Detect iOS device
    const detectIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      const isIphoneOrIpad = /iphone|ipad|ipod/.test(userAgent);
      setIsIOS(isIphoneOrIpad);
    };
    detectIOS();

    // 3. Listen for browser install prompt (Android, Chrome, desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // If not standalone and not recently dismissed, trigger prompt
      if (!standalone) {
        checkAndShowPrompt();
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // If on iOS and not standalone, we can also check and show our guide
    if (!standalone) {
      // Delay prompt slightly for better UX
      const timer = setTimeout(() => {
        checkAndShowPrompt();
      }, 4000);
      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        clearTimeout(timer);
      };
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isStandalone]);

  const checkAndShowPrompt = () => {
    const lastDismissed = localStorage.getItem('pwa_prompt_dismissed_at');
    if (lastDismissed) {
      const dismissedTime = parseInt(lastDismissed, 10);
      const now = Date.now();
      // Show again after 24 hours
      if (now - dismissedTime < 24 * 60 * 60 * 1000) {
        return;
      }
    }
    setShowPrompt(true);
  };

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback guide if deferredPrompt is not available (e.g. general instructions)
      alert(lang === 'bn' ? 'অনুগ্রহ করে ব্রাউজার মেনু থেকে "ইনস্টল" বা "হোম স্ক্রিনে যুক্ত করুন" নির্বাচন করুন।' : 'Please use your browser menu to "Install" or "Add to Home Screen".');
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa_prompt_dismissed_at', Date.now().toString());
  };

  // If already running inside installed app, don't show prompt or floating button
  if (isStandalone) return null;

  return (
    <>
      {/* Floating Backup Button (Shows up only if prompt is closed and browser is installable) */}
      {!showPrompt && (deferredPrompt || isIOS) && (
        <button
          onClick={() => setShowPrompt(true)}
          className="absolute bottom-24 right-4 z-40 bg-blue-600 hover:bg-blue-700 text-white shadow-lg px-4 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 animate-bounce hover:scale-105 active:scale-95 transition-all"
          id="pwa-floating-install-btn"
        >
          <i className="fa-solid fa-circle-arrow-down text-lg"></i>
          {lang === 'bn' ? 'অ্যাপ ইনস্টল করুন' : 'Install App'}
        </button>
      )}

      {/* Modern Bottom Sheet / Modal Prompt */}
      {showPrompt && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center transition-all duration-300" id="pwa-prompt-overlay">
          {/* Bottom Sheet Container */}
          <div 
            className="w-full bg-white dark:bg-slate-900 rounded-t-[2rem] shadow-2xl p-6 flex flex-col relative animate-in slide-in-from-bottom duration-300 max-h-[85%] overflow-y-auto"
            id="pwa-bottom-sheet"
          >
            {/* Drag Handle to look native */}
            <div className="w-12 h-1 bg-gray-200 dark:bg-slate-700 rounded-full mx-auto mb-4" />

            {/* Close Button */}
            <button 
              onClick={dismissPrompt}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 rounded-full hover:bg-gray-150 dark:hover:bg-slate-800 transition-all"
              id="pwa-prompt-close"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>

            {/* Header / Logo */}
            <div className="flex items-center gap-4 mb-5 mt-2">
              <div className="w-14 h-14 bg-white border border-gray-100 dark:border-slate-800 rounded-2xl flex items-center justify-center p-2 shadow-sm shrink-0">
                <img src={bdCadetsLogo} alt="BD Cadets Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-gray-900 dark:text-white leading-tight">
                  {lang === 'bn' ? 'বিডি ক্যাডেট ডাউনলোড করুন' : 'Download BD Cadets'}
                </h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider mt-0.5">
                  {lang === 'bn' ? 'ক্যাডেট ভর্তি প্রস্তুতি অ্যাপ' : 'Cadet Admission Prep App'}
                </p>
              </div>
            </div>

            {/* Subtitle / Description */}
            <p className="text-sm text-gray-600 dark:text-slate-300 mb-5 leading-relaxed">
              {lang === 'bn' 
                ? 'অনুপম গতি এবং পূর্ণাঙ্গ অফলাইন ফিচারের সাথে পড়াশোনা করতে অ্যাপটি আজই আপনার হোম স্ক্রিনে যোগ করুন।' 
                : 'Add the app to your home screen for full offline prep and a distraction-free experience.'}
            </p>

            {/* Key Features List */}
            <div className="space-y-3 mb-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0 mt-0.5">
                  <i className="fa-solid fa-bolt text-xs text-blue-600 dark:text-blue-400"></i>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200">
                    {lang === 'bn' ? '১ সেকেন্ডেই লোড হবে' : 'Launches instantly'}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400">
                    {lang === 'bn' ? 'কোনো লোডিং সময় ছাড়াই সঙ্গে সঙ্গে ওপেন হবে।' : 'Zero loading time, opens immediately like a native app.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0 mt-0.5">
                  <i className="fa-solid fa-wifi text-xs text-emerald-600 dark:text-emerald-400"></i>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200">
                    {lang === 'bn' ? 'অফলাইন প্রস্তুতি' : 'Offline Access'}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400">
                    {lang === 'bn' ? 'ইন্টারনেট ছাড়াই সব সিলেবাস ও বিষয় পড়া যাবে।' : 'Access interactive study plans without any internet connection.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 mt-0.5">
                  <i className="fa-solid fa-arrows-to-eye text-xs text-indigo-600 dark:text-indigo-400"></i>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 dark:text-slate-200">
                    {lang === 'bn' ? 'সম্পূর্ণ ফুল স্ক্রিন' : 'Immersive Full Screen'}
                  </h4>
                  <p className="text-[11px] text-gray-500 dark:text-slate-400">
                    {lang === 'bn' ? 'ব্রাউজারের অ্যাড্রেস বার ছাড়া মনোযোগ দিয়ে পড়ার সুযোগ।' : 'No browser tabs or URL bars, completely focused on study.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Instruction Guides per Platform */}
            {isIOS ? (
              <div className="mb-6 bg-amber-50 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-100 dark:border-amber-900/30 text-xs">
                <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-2 flex items-center gap-1.5">
                  <i className="fa-brands fa-apple text-sm"></i>
                  {lang === 'bn' ? 'আইফোনে যুক্ত করার সহজ নিয়ম:' : 'How to Add on iPhone/iPad:'}
                </h4>
                <ol className="space-y-1.5 text-slate-600 dark:text-slate-300 font-medium">
                  <li className="flex gap-1">
                    <span>১.</span>
                    <span>
                      {lang === 'bn' ? 'Safari ব্রাউজারের নিচে শেয়ার ' : 'Tap the Share button '}
                      <i className="fa-solid fa-share-nodes text-blue-500 mx-0.5"></i>
                      {lang === 'bn' ? 'বোতামটি চাপুন।' : 'at the bottom.'}
                    </span>
                  </li>
                  <li className="flex gap-1">
                    <span>২.</span>
                    <span>
                      {lang === 'bn' ? 'মেনুটি একটু নিচে নামিয়ে ' : 'Scroll down and select '}
                      <strong className="text-slate-800 dark:text-white font-semibold">
                        {lang === 'bn' ? '"Add to Home Screen"' : '"Add to Home Screen"'}
                      </strong>
                      <i className="fa-regular fa-square-plus text-blue-500 mx-0.5"></i>
                      {lang === 'bn' ? 'বিকল্পটি বেছে নিন।' : 'option.'}
                    </span>
                  </li>
                  <li className="flex gap-1">
                    <span>৩.</span>
                    <span>
                      {lang === 'bn' ? 'উপরে ডানদিকের "Add" বাটন ট্যাপ করে যুক্ত করুন।' : 'Tap "Add" in the top right corner to complete.'}
                    </span>
                  </li>
                </ol>
              </div>
            ) : null}

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 mt-auto">
              {!isIOS && (
                <button
                  onClick={handleInstallClick}
                  className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2.5 transition-all text-sm active:scale-[0.98]"
                  id="pwa-prompt-install-btn"
                >
                  <i className="fa-solid fa-circle-down text-base"></i>
                  {lang === 'bn' ? 'এখনই ইনস্টল করুন' : 'Install App Now'}
                </button>
              )}

              <button
                onClick={dismissPrompt}
                className={`w-full py-3 px-4 font-semibold rounded-xl text-xs transition-all text-center ${
                  isIOS 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md py-3.5 font-bold text-sm' 
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
                id="pwa-prompt-dismiss-btn"
              >
                {isIOS 
                  ? (lang === 'bn' ? 'বুঝেছি (বন্ধ করুন)' : 'Got it (Close)')
                  : (lang === 'bn' ? 'পরে করব' : 'Maybe Later')
                }
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
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

    // 3. Listen for native browser install prompt (Android, Chrome, desktop)
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isStandalone]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Direct call to native browser install prompt ("Install and create shortcut")
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (isIOS) {
      alert(
        lang === 'bn' 
          ? 'আইফোনে ইনস্টল করতে Safari-র Share (শেয়ার) আইকনে চাপ দিয়ে "Add to Home Screen" নির্বাচন করুন।' 
          : 'To install on iOS, tap the Safari Share icon and select "Add to Home Screen".'
      );
    } else {
      alert(
        lang === 'bn' 
          ? 'অনুগ্রহ করে ব্রাউজার মেনু (৩ ডট) থেকে "ইনস্টল অ্যাপ" বা "হোম স্ক্রিনে যোগ করুন" নির্বাচন করুন।' 
          : 'Please tap your browser menu (3 dots) and select "Install app" or "Add to Home screen".'
      );
    }
  };

  // If already running inside installed standalone app, hide button
  if (isStandalone) return null;

  // Render floating button when native prompt is ready or on iOS
  if (!deferredPrompt && !isIOS) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="absolute bottom-24 right-4 z-40 bg-blue-600 hover:bg-blue-700 text-white shadow-lg px-4 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 animate-bounce hover:scale-105 active:scale-95 transition-all"
      id="pwa-floating-install-btn"
    >
      <i className="fa-solid fa-circle-arrow-down text-lg"></i>
      {lang === 'bn' ? 'অ্যাপ ইনস্টল করুন' : 'Install App'}
    </button>
  );
}


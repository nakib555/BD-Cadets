import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  if (!isInstallable) return null;

  return (
    <button
      onClick={handleInstallClick}
      className="fixed bottom-24 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white shadow-lg px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 animate-bounce transition-colors"
    >
      <i className="fa-solid fa-download"></i>
      {lang === 'bn' ? 'অ্যাপ ইনস্টল করুন' : 'Install App'}
    </button>
  );
}

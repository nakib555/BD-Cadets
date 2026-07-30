import React, { useState, useEffect, useRef } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { RouterProvider, useRouter, MAIN_TABS } from './context/RouterContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import Navigation from './components/Navigation';
import MetadataManager from './components/MetadataManager';
import PageSkeleton from './components/PageSkeleton';
import ReloadPrompt from './components/ReloadPrompt';
import PWAInstallButton from './components/PWAInstallButton';
import Home from './pages/Home';
import Study from './pages/Study';
import Test from './pages/Test';
import Progress from './pages/Progress';
import StudyPlan from './pages/StudyPlan';
import AllSubjects from './pages/AllSubjects';
import Achievements from './pages/Achievements';
import TestList from './pages/TestList';
import InteractiveMap from './pages/InteractiveMap';
import Photosynthesis from './pages/Photosynthesis';
import PadmaBridge from './pages/PadmaBridge';
import cadetsSplash from './assets/images/cadets_splash_1785297743949.jpg';
import bdCadetsLogo from './assets/images/BD-cadets-logo.png';

function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const { lang } = useLanguage();

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000); // 2 seconds of showing splash screen

    const timer2 = setTimeout(() => {
      onComplete();
    }, 2500); // 500ms for fade out animation

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ease-in-out ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className="w-full max-w-md px-8 flex flex-col items-center">
        <div className="relative w-full aspect-square max-w-[280px] mb-8 rounded-[2.5rem] overflow-hidden ">
          <img 
            src={cadetsSplash} 
            alt="Cadets Splash" 
            className="w-full h-full object-cover animate-in zoom-in duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        <div className="flex items-center gap-3 mb-2 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-100">
          <div className="w-12 h-12 bg-white border border-gray-150 rounded-2xl flex items-center justify-center p-1.5 shadow-sm">
            <img src={bdCadetsLogo} alt="BD Cadets Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{lang === 'bn' ? 'বিডি ক্যাডেট' : 'BD Cadet'}</h1>
        </div>
        <p className="text-sm text-gray-500 font-medium tracking-widest uppercase mb-8 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-200">
          {lang === 'bn' ? 'প্রস্তুতি • অনুশীলন • সাফল্য' : 'Prep • Practice • Success'}
        </p>
        <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden animate-in fade-in duration-700 delay-300">
          <div className="h-full bg-blue-500 w-1/2 animate-[bounce_1s_infinite]"></div>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const { currentRoute, isRouteLoading, isMainTab, navigate } = useRouter();
  const { isDark } = useData();
  
  const showNav = isMainTab(currentRoute.path) || currentRoute.path === 'test-active';
  const resolvedPath = currentRoute.path === 'test-active' ? 'test' : currentRoute.path;
  const [activeTabIdx, setActiveTabIdx] = useState(() => MAIN_TABS.indexOf(resolvedPath));
  const [dir, setDir] = useState<number>(0);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const rPath = currentRoute.path === 'test-active' ? 'test' : currentRoute.path;
    const newIdx = MAIN_TABS.indexOf(rPath);
    if (newIdx !== -1) {
      if (activeTabIdx !== -1 && activeTabIdx !== newIdx) {
        setDir(newIdx > activeTabIdx ? 1 : -1);
      }
      setActiveTabIdx(newIdx);
    }
  }, [currentRoute.path, activeTabIdx]);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [currentRoute.path]);

  return (
    <div className={`flex justify-center items-center h-[100dvh] overflow-hidden bg-slate-100 transition-colors duration-300 ${isDark ? 'dark bg-slate-900' : ''}`}>
      <MetadataManager />
      <ReloadPrompt />
      <PWAInstallButton />
      <div className="w-full max-w-[414px] h-full bg-white dark:bg-slate-950 relative shadow-[0_0_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden transition-colors duration-300">
        
        {/* Main Content Area */}
        <main 
          ref={mainRef}
          className={`flex-1 h-full overflow-y-auto overflow-x-hidden custom-scrollbar bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 ${showNav ? 'pb-20' : ''}`}
        >
          {isRouteLoading ? (
             <PageSkeleton />
          ) : (
            <AnimatePresence mode="wait" initial={false}>
              {showNav ? (
                <motion.div
                  key={currentRoute.path}
                  initial={{ opacity: 0, x: dir === 1 ? 40 : dir === -1 ? -40 : 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir === 1 ? -40 : dir === -1 ? 40 : 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  drag={currentRoute.path === 'test-active' ? false : "x"}
                  dragDirectionLock
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(event, info) => {
                    const threshold = 60;
                    const swipe = info.offset.x;
                    
                    if (swipe < -threshold && activeTabIdx < MAIN_TABS.length - 1) {
                      setDir(1);
                      navigate(MAIN_TABS[activeTabIdx + 1]);
                    } else if (swipe > threshold && activeTabIdx > 0) {
                      setDir(-1);
                      navigate(MAIN_TABS[activeTabIdx - 1]);
                    }
                  }}
                  className="w-full min-h-full flex flex-col cursor-grab active:cursor-grabbing"
                >
                   {currentRoute.path === 'home' && <Home />}
                   {currentRoute.path === 'study' && <Study />}
                   {currentRoute.path === 'test' && <TestList />}
                   {currentRoute.path === 'test-active' && <Test />}
                   {currentRoute.path === 'progress' && <Progress />}
                   {currentRoute.path === 'profile' && <Achievements />}
                </motion.div>
              ) : (
                <motion.div
                  key={currentRoute.path}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="w-full h-full flex flex-col"
                >
                   {currentRoute.path === 'study-plan' && <StudyPlan />}
                   {currentRoute.path === 'all-subjects' && <AllSubjects />}
                   {currentRoute.path === 'achievements' && <Achievements />}
                   {currentRoute.path === 'interactive-map' && <InteractiveMap />}
                   {currentRoute.path === 'photosynthesis' && <Photosynthesis />}
                   {currentRoute.path === 'padma-bridge' && <PadmaBridge />}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </main>
        
        <Navigation />
      </div>
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <LanguageProvider>
      <DataProvider>
        <RouterProvider>
          {showSplash ? (
            <SplashScreen onComplete={() => setShowSplash(false)} />
          ) : (
            <AppContent />
          )}
        </RouterProvider>
      </DataProvider>
    </LanguageProvider>
  );
}

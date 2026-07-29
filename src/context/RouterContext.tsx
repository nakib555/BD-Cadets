import React, { createContext, useContext, useState, useCallback } from 'react';

export type Route = {
  path: string;
  params?: any;
};

interface RouterContextType {
  currentRoute: Route;
  navigate: (path: string, params?: any) => void;
  goBack: () => void;
  isMainTab: (path: string) => boolean;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

const MAIN_TABS = ['home', 'study', 'test', 'progress', 'profile'];

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<Route[]>([{ path: 'home' }]);

  const currentRoute = history[history.length - 1];

  const navigate = useCallback((path: string, params?: any) => {
    setHistory((prev) => {
      // If navigating to a main tab, reset history to just that tab
      if (MAIN_TABS.includes(path)) {
        return [{ path, params }];
      }
      return [...prev, { path, params }];
    });
  }, []);

  const goBack = useCallback(() => {
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const isMainTab = useCallback((path: string) => MAIN_TABS.includes(path), []);

  return (
    <RouterContext.Provider value={{ currentRoute, navigate, goBack, isMainTab }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within a RouterProvider');
  return context;
}

import React, { createContext, useContext, useState, useCallback } from 'react';

export type Route = {
  path: string;
  params?: any;
};

interface RouterContextType {
  currentRoute: Route;
  isRouteLoading: boolean;
  navigate: (path: string, params?: any) => void;
  goBack: () => void;
  isMainTab: (path: string) => boolean;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const MAIN_TABS = ['home', 'study', 'test', 'saved', 'progress', 'profile'];

export function RouterProvider({ children }: { children: React.ReactNode }) {
  const [history, setHistory] = useState<Route[]>([{ path: 'home' }]);
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  const currentRoute = history[history.length - 1];

  const navigate = useCallback((path: string, params?: any) => {
    setIsRouteLoading(true);
    setHistory((prev) => {
      if (MAIN_TABS.includes(path)) {
        return [{ path, params }];
      }
      return [...prev, { path, params }];
    });
    
    // Simulate network/rendering delay for skeleton loading
    setTimeout(() => {
      setIsRouteLoading(false);
    }, 600);
  }, []);

  const goBack = useCallback(() => {
    setIsRouteLoading(true);
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
    setTimeout(() => {
      setIsRouteLoading(false);
    }, 600);
  }, []);

  const isMainTab = useCallback((path: string) => MAIN_TABS.includes(path), []);

  return (
    <RouterContext.Provider value={{ currentRoute, isRouteLoading, navigate, goBack, isMainTab }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) throw new Error('useRouter must be used within a RouterProvider');
  return context;
}

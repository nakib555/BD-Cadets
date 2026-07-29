import React, { createContext, useContext } from 'react';
import { useOfflineData } from '../hooks/useOfflineData';
import { useDarkMode } from '../hooks/useDarkMode';

interface UserData {
  dailyGoalProgress: number;
  studyStreak: number;
  testsTaken: number;
  avgScore: number;
  bestScore: number;
}

const defaultUserData: UserData = {
  dailyGoalProgress: 6,
  studyStreak: 12,
  testsTaken: 48,
  avgScore: 82,
  bestScore: 96,
};

interface DataContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  isLoading: boolean;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useOfflineData<UserData>('cadet_user_data', defaultUserData);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDark, setIsDark] = useDarkMode();

  React.useEffect(() => {
    // Simulate network latency for data fetching
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <DataContext.Provider value={{ userData, setUserData, isLoading, isDark, setIsDark }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

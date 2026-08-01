import React, { createContext, useContext } from 'react';
import { useOfflineData } from '../hooks/useOfflineData';
import { useDarkMode } from '../hooks/useDarkMode';
import { Question } from '../types';

export interface UserData {
  dailyGoalProgress: number;
  dailyGoalTarget: number;
  completedNotesToday: number;
  completedTestsToday: number;
  readNoteIdsToday: string[];
  completedTestIdsToday: string[];
  lastActiveDate: string;
  studyStreak: number;
  testsTaken: number;
  avgScore: number;
  bestScore: number;
}

const todayStr = new Date().toISOString().split('T')[0];

const defaultUserData: UserData = {
  dailyGoalProgress: 6,
  dailyGoalTarget: 8,
  completedNotesToday: 3,
  completedTestsToday: 3,
  readNoteIdsToday: ['note-alg', 'photosynthesis', 'bangladesh-map'],
  completedTestIdsToday: ['mock-test-1', 'mock-test-2', 'mock-test-3'],
  lastActiveDate: todayStr,
  studyStreak: 12,
  testsTaken: 48,
  avgScore: 82,
  bestScore: 96,
};

interface DataContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  markNoteCompleted: (noteId: string) => void;
  markTestCompleted: (testId: string, scorePercentage: number) => void;
  updateDailyGoalTarget: (newTarget: number) => void;
  isLoading: boolean;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  savedQuestions: Question[];
  toggleBookmark: (question: Question) => void;
  isBookmarked: (questionId: number) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useOfflineData<UserData>('cadet_user_data', defaultUserData);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isDark, setIsDark] = useDarkMode();

  const [savedQuestions, setSavedQuestions] = React.useState<Question[]>(() => {
    try {
      const stored = localStorage.getItem('cadet_global_bookmarks_v1');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleBookmark = (question: Question) => {
    setSavedQuestions(prev => {
      const exists = prev.some(q => q.id === question.id);
      let updated;
      if (exists) {
        updated = prev.filter(q => q.id !== question.id);
      } else {
        updated = [...prev, question];
      }
      localStorage.setItem('cadet_global_bookmarks_v1', JSON.stringify(updated));
      return updated;
    });
  };

  const isBookmarked = (questionId: number) => {
    return savedQuestions.some(q => q.id === questionId);
  };

  React.useEffect(() => {
    // Check for day rollover
    const currentToday = new Date().toISOString().split('T')[0];
    if (userData.lastActiveDate && userData.lastActiveDate !== currentToday) {
      setUserData(prev => ({
        ...prev,
        lastActiveDate: currentToday,
        completedNotesToday: 0,
        completedTestsToday: 0,
        readNoteIdsToday: [],
        completedTestIdsToday: [],
        dailyGoalProgress: 0,
      }));
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const markNoteCompleted = (noteId: string) => {
    setUserData(prev => {
      const currentToday = new Date().toISOString().split('T')[0];
      const isNewDay = prev.lastActiveDate !== currentToday;

      const readIds = isNewDay ? [] : (prev.readNoteIdsToday || []);
      if (readIds.includes(noteId)) {
        return prev;
      }

      const newReadIds = [...readIds, noteId];
      const newNotesCount = isNewDay ? 1 : (prev.completedNotesToday || 0) + 1;
      const testsCount = isNewDay ? 0 : (prev.completedTestsToday || 0);
      const newProgress = newNotesCount + testsCount;

      return {
        ...prev,
        lastActiveDate: currentToday,
        readNoteIdsToday: newReadIds,
        completedNotesToday: newNotesCount,
        completedTestsToday: testsCount,
        completedTestIdsToday: isNewDay ? [] : (prev.completedTestIdsToday || []),
        dailyGoalProgress: newProgress,
      };
    });
  };

  const markTestCompleted = (testId: string, scorePercentage: number) => {
    setUserData(prev => {
      const currentToday = new Date().toISOString().split('T')[0];
      const isNewDay = prev.lastActiveDate !== currentToday;

      const testIds = isNewDay ? [] : (prev.completedTestIdsToday || []);
      const newTestIds = testIds.includes(testId) ? testIds : [...testIds, testId];

      const newNotesCount = isNewDay ? 0 : (prev.completedNotesToday || 0);
      const newTestsCount = isNewDay ? 1 : (prev.completedTestsToday || 0) + 1;
      const newProgress = newNotesCount + newTestsCount;

      const newTestsTaken = (prev.testsTaken || 0) + 1;
      const prevAvg = prev.avgScore || 0;
      const prevTaken = prev.testsTaken || 0;
      const newAvgScore = Math.round((prevAvg * prevTaken + scorePercentage) / newTestsTaken);
      const newBestScore = Math.max(prev.bestScore || 0, scorePercentage);

      return {
        ...prev,
        lastActiveDate: currentToday,
        completedTestIdsToday: newTestIds,
        completedNotesToday: newNotesCount,
        completedTestsToday: newTestsCount,
        readNoteIdsToday: isNewDay ? [] : (prev.readNoteIdsToday || []),
        dailyGoalProgress: newProgress,
        testsTaken: newTestsTaken,
        avgScore: newAvgScore,
        bestScore: newBestScore,
      };
    });
  };

  const updateDailyGoalTarget = (newTarget: number) => {
    setUserData(prev => ({
      ...prev,
      dailyGoalTarget: Math.max(1, newTarget),
    }));
  };

  return (
    <DataContext.Provider
      value={{
        userData,
        setUserData,
        markNoteCompleted,
        markTestCompleted,
        updateDailyGoalTarget,
        isLoading,
        isDark,
        setIsDark,
        savedQuestions,
        toggleBookmark,
        isBookmarked,
      }}
    >
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


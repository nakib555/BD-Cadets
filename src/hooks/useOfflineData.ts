import { useState, useEffect } from 'react';

export function useOfflineData<T>(key: string, initialValue: T) {
  const [data, setData] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn('Error reading localStorage', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.warn('Error setting localStorage', error);
    }
  }, [key, data]);

  return [data, setData] as const;
}

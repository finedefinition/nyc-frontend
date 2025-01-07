import { useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue =
        typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
      setState(valueToStore);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  };

  return [state, setValue] as const;
};

export default useLocalStorage;

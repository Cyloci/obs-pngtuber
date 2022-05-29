import { useEffect, useState } from "react";

const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState("");
  const setLocalStoredValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };
  useEffect(() => {
    const localStoredValue = localStorage.getItem(key);
    if (localStoredValue === null) {
      setLocalStoredValue(defaultValue);
    } else {
      setValue(localStoredValue);
    }
  }, [key]);
  return [value, setLocalStoredValue] as const;
};

export default useLocalStorage;

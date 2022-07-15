import { useState } from "react";

export const useTrimmed = (initialState: string | (() => string)) => {
  const [originalValue, setOriginalValue] = useState(initialState);

  const [trimmedValue, setTrimmedValue] = useState(() => {
    const valueToStore =
      initialState instanceof Function ? initialState() : initialState;

    return valueToStore.trim().replace(/\s\s+/g, " ");
  });

  const setValue = (value: string | ((val: string) => string)) => {
    const valueToStore =
      value instanceof Function ? value(originalValue) : value;

    setOriginalValue(valueToStore);
    setTrimmedValue(valueToStore.trim().replace(/\s\s+/g, " "));
  };

  return [originalValue, trimmedValue, setValue] as const;
};

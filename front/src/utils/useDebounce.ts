import { useEffect, useRef, useState } from 'react';

export const useDebounce = <T>(value: T, delay: number = 1000) => {
  const timeoutId = useRef<number | null>(null);
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (timeoutId.current != null)
    {
      window.clearTimeout(timeoutId.current);
    }

    const timeoutCallback = () => {
      setDebouncedValue(value);
    };

    timeoutId.current = window.setTimeout(timeoutCallback, delay);

  }, [value, delay, timeoutId]);

  return debouncedValue;
};
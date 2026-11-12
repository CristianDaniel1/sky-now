import { useEffect, useState } from 'react';

/**
 * Returns a value only after it stops changing for a while.
 *
 * @param value - Value that changes often, e.g. an input text.
 * @param delayMs - Time without changes before updating, in milliseconds.
 * @returns The last value that stayed unchanged for `delayMs`.
 */
export const useDebouncedValue = <T>(value: T, delayMs: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debouncedValue;
};

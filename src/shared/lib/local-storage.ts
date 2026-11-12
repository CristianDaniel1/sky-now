import { reportError } from '@/shared/lib/report-error';

/**
 * Gets the browser `localStorage`, which throws when site data is blocked.
 *
 * @returns The storage, or undefined when it cannot be used.
 */
export const getLocalStorage = () => {
  try {
    return window.localStorage;
  } catch (error) {
    reportError('storage: access', error);
    return undefined;
  }
};

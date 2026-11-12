import type { StateStorage } from 'zustand/middleware';
import { reportError } from '@/shared/lib/report-error';

/** `localStorage` wrapper that ignores failures (private mode, blocked site data). */
export const safeStorage: StateStorage = {
  getItem: (name) => {
    try {
      return localStorage.getItem(name);
    } catch (error) {
      reportError('storage: read', error);
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value);
    } catch (error) {
      reportError('storage: write', error);
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch (error) {
      reportError('storage: remove', error);
    }
  },
};

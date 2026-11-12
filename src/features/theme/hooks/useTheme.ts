import { useEffect, useSyncExternalStore } from 'react';
import { getSystemTheme, subscribeToSystemTheme } from '../lib/system-theme';
import { useThemeStore } from '../store/theme.store';

/**
 * Resolves the active color theme, applies it to the page and offers a toggle.
 *
 * @returns The active theme and the action that switches to the other one.
 */
export const useTheme = () => {
  const preference = useThemeStore((store) => store.preference);
  const setPreference = useThemeStore((store) => store.setPreference);
  const systemTheme = useSyncExternalStore(subscribeToSystemTheme, getSystemTheme);

  const theme = preference === 'system' ? systemTheme : preference;

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => setPreference(theme === 'dark' ? 'light' : 'dark');

  return { theme, toggleTheme };
};

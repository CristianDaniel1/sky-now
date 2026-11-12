import { DARK_SCHEME_QUERY } from '../constants/theme';
import type { Theme } from '../interfaces/theme';

/**
 * Reads the color theme the operating system prefers.
 *
 * @returns `dark` when the system prefers dark colors, otherwise `light`.
 */
export const getSystemTheme = (): Theme =>
  window.matchMedia(DARK_SCHEME_QUERY).matches ? 'dark' : 'light';

/**
 * Listens to changes of the system color theme.
 *
 * @param onChange - Called whenever the system theme changes.
 * @returns A function that stops listening.
 */
export const subscribeToSystemTheme = (onChange: () => void) => {
  const query = window.matchMedia(DARK_SCHEME_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};

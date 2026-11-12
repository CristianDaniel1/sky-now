export type Theme = 'light' | 'dark';

export type ThemePreference = Theme | 'system';

export interface ThemeState {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
}

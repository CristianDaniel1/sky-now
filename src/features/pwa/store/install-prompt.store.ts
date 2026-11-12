import { create } from 'zustand';
import type { InstallPromptState } from '../interfaces/pwa';

/** Install prompt offered by the browser, kept until it is used or the app is installed. */
export const useInstallPromptStore = create<InstallPromptState>()((set) => ({
  promptEvent: null,
  setPromptEvent: (promptEvent) => set({ promptEvent }),
}));

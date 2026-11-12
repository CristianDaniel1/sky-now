import { useInstallPromptStore } from '../store/install-prompt.store';

/** Keeps the browser install prompt to show it from the app's own button instead. */
export const listenForInstallPrompt = () => {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    useInstallPromptStore.getState().setPromptEvent(event);
  });
  window.addEventListener('appinstalled', () => {
    useInstallPromptStore.getState().setPromptEvent(null);
  });
};

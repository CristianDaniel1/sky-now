import { reportError } from '@/shared/lib/report-error';
import { useInstallPromptStore } from '../store/install-prompt.store';

/**
 * Offers the browser install prompt kept by the app.
 *
 * @returns Whether the app can be installed now and the action that opens the prompt.
 */
export const useInstallApp = () => {
  const promptEvent = useInstallPromptStore((store) => store.promptEvent);
  const setPromptEvent = useInstallPromptStore((store) => store.setPromptEvent);

  const install = async () => {
    if (!promptEvent) return;

    try {
      await promptEvent.prompt();
      await promptEvent.userChoice;
    } catch (error) {
      reportError('pwa: install app', error);
    } finally {
      setPromptEvent(null);
    }
  };

  return { canInstall: !!promptEvent, install };
};

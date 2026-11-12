import { useRegisterSW } from 'virtual:pwa-register/react';
import { reportError } from '@/shared/lib/report-error';
import { scheduleUpdateChecks } from '../lib/app-update';

/**
 * Registers the service worker and tells when a new version of the app is waiting.
 *
 * @returns Whether an update is waiting, and the actions that apply or postpone it.
 */
export const useAppUpdate = () => {
  const {
    needRefresh: [hasUpdate, setHasUpdate],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    onRegisteredSW: (_scriptUrl, registration) => {
      if (registration) scheduleUpdateChecks(registration);
    },
    onRegisterError: (error: unknown) => reportError('pwa: register service worker', error),
  });

  const update = async () => {
    try {
      await updateServiceWorker(true);
    } catch (error) {
      reportError('pwa: apply update', error);
    }
  };

  const postpone = () => setHasUpdate(false);

  return { hasUpdate, update, postpone };
};

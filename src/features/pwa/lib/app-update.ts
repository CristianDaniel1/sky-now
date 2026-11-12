import { reportError } from '@/shared/lib/report-error';
import { APP_UPDATE_CHECK_INTERVAL_MS } from '../constants/pwa';

const checkForUpdate = async (registration: ServiceWorkerRegistration) => {
  if (!navigator.onLine) return;

  try {
    await registration.update();
  } catch (error) {
    reportError('pwa: check for update', error);
  }
};

/**
 * Checks for a new version of the app periodically, for tabs that stay open for long.
 *
 * @param registration - Registration of the app's service worker.
 */
export const scheduleUpdateChecks = (registration: ServiceWorkerRegistration) => {
  window.setInterval(() => void checkForUpdate(registration), APP_UPDATE_CHECK_INTERVAL_MS);
};

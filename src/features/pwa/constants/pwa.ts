/** Time between checks for a new version of the app, in milliseconds (1 hour). */
export const APP_UPDATE_CHECK_INTERVAL_MS = 60 * 60 * 1000;

/** `localStorage` key of when the install offer was dismissed. */
export const INSTALL_OFFER_STORAGE_KEY = 'sky-now:install-offer';

/** Time the install offer stays hidden after "Agora não", in milliseconds (30 days). */
export const INSTALL_OFFER_SNOOZE_MS = 30 * 24 * 60 * 60 * 1000;

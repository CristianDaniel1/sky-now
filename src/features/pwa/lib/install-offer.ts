import { INSTALL_OFFER_SNOOZE_MS } from '../constants/pwa';

/**
 * Checks whether the install offer is still postponed.
 *
 * @param dismissedAt - When the offer was postponed, in milliseconds, or null if never.
 * @param now - Current time, in milliseconds.
 * @returns Whether the offer should stay hidden.
 */
export const isInstallOfferSnoozed = (dismissedAt: number | null, now: number) =>
  dismissedAt !== null && now - dismissedAt < INSTALL_OFFER_SNOOZE_MS;

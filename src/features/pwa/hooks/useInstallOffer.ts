import { useState } from 'react';
import { isInstallOfferSnoozed } from '../lib/install-offer';
import { useInstallOfferStore } from '../store/install-offer.store';
import { useInstallApp } from './useInstallApp';

/**
 * Decides whether to invite the user to install the app.
 *
 * @returns Whether to show the invitation, and the actions that install or postpone it.
 */
export const useInstallOffer = () => {
  const { canInstall, install } = useInstallApp();
  const dismissedAt = useInstallOfferStore((store) => store.dismissedAt);
  const dismiss = useInstallOfferStore((store) => store.dismiss);
  const [openedAt] = useState(Date.now);

  return {
    shouldOffer: canInstall && !isInstallOfferSnoozed(dismissedAt, openedAt),
    install,
    dismiss,
  };
};

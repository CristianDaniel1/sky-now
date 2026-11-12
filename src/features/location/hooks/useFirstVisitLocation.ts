import { useEffect, useEffectEvent, useState } from 'react';
import { getGeolocationPermission } from '../lib/geolocation';
import { useLocationStore } from '../store/location.store';
import { useCurrentPosition } from './useCurrentPosition';

/**
 * On the first visit, opens the user's own place when the browser already allows it,
 * or tells when the user should be asked.
 *
 * @returns Whether to offer the current position, its locating state and the actions of the offer.
 */
export const useFirstVisitLocation = () => {
  const isFirstVisit = useLocationStore((store) => store.isFirstVisit);
  const dismissFirstVisit = useLocationStore((store) => store.dismissFirstVisit);
  const { locate, isLocating, errorMessage } = useCurrentPosition();
  const [permission, setPermission] = useState<PermissionState | null>(null);

  const locateAutomatically = useEffectEvent(() => {
    void locate();
  });

  useEffect(() => {
    if (!isFirstVisit || !('geolocation' in navigator)) return;
    let isCurrent = true;

    const checkPermission = async () => {
      const state = await getGeolocationPermission();
      if (!isCurrent) return;

      setPermission(state);
      if (state === 'granted') locateAutomatically();
    };

    void checkPermission();

    return () => {
      isCurrent = false;
    };
  }, [isFirstVisit]);

  return {
    shouldOffer: isFirstVisit && permission === 'prompt',
    isLocating,
    errorMessage,
    locate,
    dismiss: dismissFirstVisit,
  };
};

import { useState } from 'react';
import type { Coordinates } from '@/shared/interfaces/coordinates';
import { reportError } from '@/shared/lib/report-error';
import { reverseGeocode } from '../api/geo';
import {
  CURRENT_POSITION_LABEL,
  GEOLOCATION_MAX_AGE_MS,
  GEOLOCATION_TIMEOUT_MS,
  REVERSE_GEOCODE_TIMEOUT_MS,
} from '../constants/location';
import {
  GEOLOCATION_DEFAULT_ERROR_MESSAGE,
  GEOLOCATION_UNSUPPORTED_MESSAGE,
} from '../data/geolocation-errors';
import { getCurrentPosition, getGeolocationErrorMessage } from '../lib/geolocation';
import { toLocationLabel } from '../lib/location';
import { useLocationStore } from '../store/location.store';

const findPlaceLabel = async (coords: Coordinates) => {
  try {
    const signal = AbortSignal.timeout(REVERSE_GEOCODE_TIMEOUT_MS);
    const [place] = await reverseGeocode({ ...coords, signal });
    return place ? toLocationLabel(place) : CURRENT_POSITION_LABEL;
  } catch (error) {
    reportError('location: reverse geocode', error);
    return CURRENT_POSITION_LABEL;
  }
};

/**
 * Selects the browser position as the current place, named by reverse geocoding.
 *
 * @returns The action that starts locating, whether it is running and the error to show.
 */
export const useCurrentPosition = () => {
  const selectLocation = useLocationStore((store) => store.selectLocation);
  const [isLocating, setIsLocating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const locate = async () => {
    if (!('geolocation' in navigator)) {
      setErrorMessage(GEOLOCATION_UNSUPPORTED_MESSAGE);
      return;
    }

    setErrorMessage(null);
    setIsLocating(true);

    try {
      const position = await getCurrentPosition({
        timeout: GEOLOCATION_TIMEOUT_MS,
        maximumAge: GEOLOCATION_MAX_AGE_MS,
      });
      const coords = { lat: position.coords.latitude, lon: position.coords.longitude };
      const label = await findPlaceLabel(coords);
      selectLocation(coords, label);
    } catch (error) {
      reportError('location: get current position', error);
      const message =
        error instanceof GeolocationPositionError
          ? getGeolocationErrorMessage(error.code)
          : GEOLOCATION_DEFAULT_ERROR_MESSAGE;
      setErrorMessage(message);
    } finally {
      setIsLocating(false);
    }
  };

  const dismissError = () => setErrorMessage(null);

  return { locate, isLocating, errorMessage, dismissError };
};

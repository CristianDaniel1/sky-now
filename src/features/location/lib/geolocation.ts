import {
  GEOLOCATION_DEFAULT_ERROR_MESSAGE,
  GEOLOCATION_ERROR_MESSAGES,
} from '../data/geolocation-errors';

/**
 * Gets the message shown for a browser geolocation failure.
 *
 * @param code - `GeolocationPositionError` code.
 * @returns The message for the user.
 */
export const getGeolocationErrorMessage = (code: number) =>
  GEOLOCATION_ERROR_MESSAGES[code] ?? GEOLOCATION_DEFAULT_ERROR_MESSAGE;

/**
 * Reads the browser position as a promise.
 *
 * @param options - Accuracy, timeout and cache options of the request.
 * @returns The current position.
 */
export const getCurrentPosition = (options: PositionOptions) =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });

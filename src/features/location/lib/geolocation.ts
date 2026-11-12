import { reportError } from '@/shared/lib/report-error';
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

/**
 * Reads whether the site may use the browser position, without asking the user.
 *
 * @returns The permission state; "prompt" when the browser cannot tell.
 */
export const getGeolocationPermission = async (): Promise<PermissionState> => {
  try {
    const status = await navigator.permissions.query({ name: 'geolocation' });
    return status.state;
  } catch (error) {
    reportError('location: read geolocation permission', error);
    return 'prompt';
  }
};

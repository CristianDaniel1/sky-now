/** Message shown when the browser has no geolocation support. */
export const GEOLOCATION_UNSUPPORTED_MESSAGE = 'Seu navegador não permite obter a localização.';

/** Message shown for geolocation failures without a specific message. */
export const GEOLOCATION_DEFAULT_ERROR_MESSAGE = 'Não foi possível obter a sua localização.';

/** Messages for each `GeolocationPositionError` code. */
export const GEOLOCATION_ERROR_MESSAGES: Record<number, string> = {
  1: 'Permita o acesso à localização no navegador para usar esta opção.',
  2: 'Não foi possível determinar a sua localização.',
  3: 'A localização demorou para responder. Tente novamente.',
};

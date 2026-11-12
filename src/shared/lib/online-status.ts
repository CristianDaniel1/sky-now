/**
 * Listens for the browser going online or offline.
 *
 * @param onChange - Called when the connection status changes.
 * @returns The function that stops listening.
 */
export const subscribeToOnlineStatus = (onChange: () => void) => {
  window.addEventListener('online', onChange);
  window.addEventListener('offline', onChange);

  return () => {
    window.removeEventListener('online', onChange);
    window.removeEventListener('offline', onChange);
  };
};

/**
 * Reads whether the browser has a network connection.
 *
 * @returns Whether the browser is online.
 */
export const getOnlineStatus = () => navigator.onLine;

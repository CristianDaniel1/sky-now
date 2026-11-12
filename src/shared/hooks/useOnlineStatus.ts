import { useSyncExternalStore } from 'react';
import { getOnlineStatus, subscribeToOnlineStatus } from '@/shared/lib/online-status';

/**
 * Follows whether the browser has a network connection.
 *
 * @returns Whether the browser is online.
 */
export const useOnlineStatus = () => useSyncExternalStore(subscribeToOnlineStatus, getOnlineStatus);

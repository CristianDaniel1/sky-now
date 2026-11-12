/** `localStorage` key of the saved server data, used to open the app offline. */
export const QUERY_CACHE_STORAGE_KEY = 'sky-now:query-cache';

/** Time the saved server data can still be shown, in milliseconds (24 hours). */
export const QUERY_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

/** Version of the saved server data; changing it discards data saved by older builds. */
export const QUERY_CACHE_VERSION = '1';

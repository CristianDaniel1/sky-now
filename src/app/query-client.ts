import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient, type Query } from '@tanstack/react-query';
import type { PersistQueryClientOptions } from '@tanstack/react-query-persist-client';
import { getLocalStorage } from '@/shared/lib/local-storage';
import {
  QUERY_CACHE_MAX_AGE_MS,
  QUERY_CACHE_STORAGE_KEY,
  QUERY_CACHE_VERSION,
} from './constants/query-cache';

const shouldPersistQuery = (query: Query) =>
  query.state.status === 'success' && !!query.meta?.persist;

/**
 * Creates the client that caches the server data of the app.
 *
 * @returns A new query client that keeps unused data as long as it can be saved.
 */
export const createQueryClient = () =>
  new QueryClient({ defaultOptions: { queries: { gcTime: QUERY_CACHE_MAX_AGE_MS } } });

/**
 * Builds the options that save the queries marked with `meta.persist` in `localStorage`.
 *
 * @returns The persister and the rules of what is saved and for how long.
 */
export const createQueryPersistOptions = (): Omit<PersistQueryClientOptions, 'queryClient'> => ({
  persister: createAsyncStoragePersister({
    storage: getLocalStorage(),
    key: QUERY_CACHE_STORAGE_KEY,
  }),
  maxAge: QUERY_CACHE_MAX_AGE_MS,
  buster: QUERY_CACHE_VERSION,
  dehydrateOptions: { shouldDehydrateQuery: shouldPersistQuery },
});

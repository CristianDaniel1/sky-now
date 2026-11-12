import { QueryClient } from '@tanstack/react-query';

/**
 * Creates the client that caches the server data of the app.
 *
 * @returns A new query client.
 */
export const createQueryClient = () => new QueryClient();

import type { z } from 'zod';
import { reportError } from '@/shared/lib/report-error';

/** Failed HTTP request; `status` is `0` for network failures. */
export class HttpError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
  }
}

interface FetchJsonInput<T> {
  url: URL;
  schema: z.ZodType<T>;
  signal: AbortSignal;
  errorMessage: string;
}

/**
 * Fetches a JSON resource and validates it against a schema.
 *
 * @param input - URL, response schema, abort signal and the message shown on failure.
 * @returns The validated response body.
 */
export const fetchJson = async <T>({ url, schema, signal, errorMessage }: FetchJsonInput<T>) => {
  let body: unknown;

  try {
    const response = await fetch(url, { signal });
    if (!response.ok) throw new HttpError(errorMessage, response.status);
    body = await response.json();
  } catch (error) {
    if (signal.aborted || error instanceof HttpError) throw error;
    throw new HttpError(errorMessage, 0);
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    reportError(`http: invalid response from ${url.pathname}`, result.error);
    throw new HttpError(errorMessage, 200);
  }

  return result.data;
};

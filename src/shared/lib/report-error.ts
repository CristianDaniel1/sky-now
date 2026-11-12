/**
 * Reports an unexpected error with the place where it happened.
 *
 * @param context - Where the error happened, e.g. `location: search`.
 * @param error - The caught error.
 */
export const reportError = (context: string, error: unknown) => {
  console.error(`[${context}]`, error);
};

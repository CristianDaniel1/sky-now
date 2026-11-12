/**
 * Moves the highlighted suggestion, wrapping around the ends of the list.
 *
 * @param currentIndex - Highlighted position, or -1 when none is highlighted.
 * @param step - Positions to move: 1 for down, -1 for up.
 * @param count - Number of suggestions.
 * @returns The new highlighted position.
 */
export const getNextSuggestionIndex = (currentIndex: number, step: number, count: number) => {
  if (currentIndex < 0) return step > 0 ? 0 : count - 1;
  return (currentIndex + step + count) % count;
};

/**
 * Builds the DOM id of a suggestion, referenced by the search input.
 *
 * @param listId - Id of the suggestions list.
 * @param index - Position of the suggestion.
 * @returns The suggestion id.
 */
export const getSuggestionId = (listId: string, index: number) => `${listId}-option-${index}`;

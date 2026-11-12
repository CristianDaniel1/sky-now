import { useState, type KeyboardEvent } from 'react';
import { SUGGESTION_KEY_STEPS } from '../data/suggestion-keys';
import type { GeoLocation } from '../interfaces/location';
import { getNextSuggestionIndex } from '../lib/suggestions';

/**
 * Controls the open state and the keyboard highlight of the search suggestions.
 *
 * @param locations - Suggestions currently listed.
 * @returns Whether the list is open, the highlighted suggestion and the handlers of the input.
 */
export const useSuggestionNavigation = (locations: GeoLocation[]) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const open = () => {
    setIsOpen(true);
    setActiveIndex(-1);
  };

  const close = () => {
    setIsOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      close();
      return;
    }

    const step = SUGGESTION_KEY_STEPS[event.key];
    if (!step || !locations.length) return;

    event.preventDefault();
    setIsOpen(true);
    setActiveIndex((current) => getNextSuggestionIndex(current, step, locations.length));
  };

  return {
    isOpen,
    activeIndex,
    activeLocation: locations[activeIndex],
    open,
    close,
    handleKeyDown,
  };
};

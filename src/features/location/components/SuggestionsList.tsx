import { SEARCH_POPOVER_CLASSES } from '../constants/styles';
import type { GeoLocation } from '../interfaces/location';
import { getSuggestionId } from '../lib/suggestions';
import { SuggestionItem } from './SuggestionItem';

interface SuggestionsListProps {
  id: string;
  locations: GeoLocation[];
  activeIndex: number;
  onSelect: (location: GeoLocation) => void;
}

export const SuggestionsList = ({ id, locations, activeIndex, onSelect }: SuggestionsListProps) => (
  <ul id={id} role="listbox" aria-label="Locais encontrados" className={SEARCH_POPOVER_CLASSES}>
    {locations.map((location, index) => (
      <SuggestionItem
        key={`${location.lat},${location.lon}`}
        id={getSuggestionId(id, index)}
        location={location}
        isActive={index === activeIndex}
        onSelect={onSelect}
      />
    ))}
  </ul>
);

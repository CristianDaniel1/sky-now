import { SEARCH_POPOVER_CLASSES } from '../constants/styles';
import type { GeoLocation } from '../interfaces/location';
import { SuggestionItem } from './SuggestionItem';

interface SuggestionsListProps {
  locations: GeoLocation[];
  onSelect: (location: GeoLocation) => void;
}

export const SuggestionsList = ({ locations, onSelect }: SuggestionsListProps) => (
  <ul className={SEARCH_POPOVER_CLASSES}>
    {locations.map((location) => (
      <SuggestionItem
        key={`${location.lat},${location.lon}`}
        location={location}
        onSelect={onSelect}
      />
    ))}
  </ul>
);

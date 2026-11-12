import { SEARCH_POPOVER_CLASSES } from '../constants/styles';
import type { Place, PlaceGroup } from '../interfaces/location';
import { SuggestionGroup } from './SuggestionGroup';

interface SuggestionsListProps {
  id: string;
  label: string;
  groups: PlaceGroup[];
  activeIndex: number;
  onSelect: (place: Place) => void;
}

export const SuggestionsList = ({
  id,
  label,
  groups,
  activeIndex,
  onSelect,
}: SuggestionsListProps) => (
  <ul id={id} role="listbox" aria-label={label} className={SEARCH_POPOVER_CLASSES}>
    {groups.map((group) => (
      <SuggestionGroup
        key={group.kind}
        listId={id}
        group={group}
        activeIndex={activeIndex}
        onSelect={onSelect}
      />
    ))}
  </ul>
);

import { PLACE_GROUP_DETAILS } from '../data/place-groups';
import type { Place, PlaceGroup } from '../interfaces/location';
import { getPlaceKey } from '../lib/places';
import { getSuggestionId } from '../lib/suggestions';
import { SuggestionItem } from './SuggestionItem';

interface SuggestionGroupProps {
  listId: string;
  group: PlaceGroup;
  activeIndex: number;
  onSelect: (place: Place) => void;
}

export const SuggestionGroup = ({ listId, group, activeIndex, onSelect }: SuggestionGroupProps) => {
  const { title, icon } = PLACE_GROUP_DETAILS[group.kind];
  const titleId = `${listId}-${group.kind}`;

  const items = group.places.map((place, position) => {
    const index = group.startIndex + position;
    return (
      <SuggestionItem
        key={getPlaceKey(place.coords)}
        id={getSuggestionId(listId, index)}
        place={place}
        icon={icon}
        isActive={index === activeIndex}
        onSelect={onSelect}
      />
    );
  });

  if (!title) return items;

  return (
    <li role="presentation" className="not-first:mt-2">
      <p id={titleId} className="px-2 pb-1 text-xs font-medium text-muted">
        {title}
      </p>
      <ul role="group" aria-labelledby={titleId}>
        {items}
      </ul>
    </li>
  );
};

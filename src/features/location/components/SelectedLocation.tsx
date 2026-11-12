import { formatLocationLabel } from '../lib/location';
import { useLocationStore } from '../store/location.store';

interface SelectedLocationProps {
  className?: string | undefined;
}

export const SelectedLocation = ({ className }: SelectedLocationProps) => {
  const label = useLocationStore((store) => store.label);

  return <p className={className}>{formatLocationLabel(label)}</p>;
};

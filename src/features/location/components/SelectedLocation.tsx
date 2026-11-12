import { formatLocationLabel } from '../lib/location';
import { useLocationStore } from '../store/location.store';

export const SelectedLocation = () => {
  const label = useLocationStore((store) => store.label);

  return (
    <div className="px-5 py-3 text-2xl font-semibold text-balance text-primary sm:px-10 sm:py-6">
      {formatLocationLabel(label)}
    </div>
  );
};

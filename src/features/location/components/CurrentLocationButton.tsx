import { GpsIcon } from '@/shared/components/icons/GpsIcon';
import { Button } from '@/shared/components/ui/Button';
import { reportError } from '@/shared/lib/report-error';
import { CURRENT_POSITION_LABEL } from '../constants/location';
import { useLocationStore } from '../store/location.store';

export const CurrentLocationButton = () => {
  const selectLocation = useLocationStore((store) => store.selectLocation);

  const handleClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lon } = position.coords;
        selectLocation({ lat, lon }, CURRENT_POSITION_LABEL);
      },
      (error) => {
        reportError('location: get current position', error);
        alert('Não foi possível obter a sua localização.');
      },
    );
  };

  return (
    <Button
      className="order-2 flex items-center gap-2 rounded-full px-2 py-2 md:px-6 md:py-3"
      onClick={handleClick}
    >
      <GpsIcon />
      <span className="hidden md:block">Local Atual</span>
    </Button>
  );
};

import { useForecast } from '../../hooks/useForecast';
import { getNext24Hours } from '../../lib/forecast';
import { TodayAtItem } from './TodayAtItem';

export const TodayAt = () => {
  const { data: forecast } = useForecast();

  return (
    <ol className="grid grid-cols-hourly gap-4 overflow-auto">
      {forecast &&
        getNext24Hours(forecast.list).map((slot) => <TodayAtItem key={slot.dt} slot={slot} />)}
    </ol>
  );
};

import { useForecast } from '../../hooks/useForecast.ts';
import { TodayAtItem } from './TodayAtItem.tsx';
import { type ListItem } from '../../types.ts';
import { useCoordsStore } from '../../store/weatherStore.ts';

export const TodayAt = () => {
  const coords = useCoordsStore(state => state.coords);
  const { data } = useForecast(coords.lat, coords.lon);

  const todayHours: ListItem[] = [];

  if (data) {
    const todayForecast = data.list.slice(0, 8);

    for (let i = 0; i < todayForecast.length; i++)
      todayHours.push(todayForecast[i]);
  }

  return (
    <ol className="grid grid-cols-hourly overflow-auto gap-4">
      {data &&
        todayHours.map(hour => (
          <TodayAtItem key={hour.dt} weatherInfo={hour} />
        ))}
    </ol>
  );
};

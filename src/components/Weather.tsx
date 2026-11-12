import { Forecast } from './forecast/Forecast.tsx';
import { Today } from './today/Today.tsx';
import { TodayAt } from './today/TodayAt.tsx';

export const Weather = () => {
  return (
    <main className="max-base px-2 pb-12 lg:max-w-5xl lg:px-0">
      <Today />
      <TodayAt />
      <Forecast />
    </main>
  );
};

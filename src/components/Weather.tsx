import { Forecast } from './forecast/Forecast.tsx';
import { Today } from './today/Today.tsx';
import { TodayAt } from './today/TodayAt.tsx';

export const Weather = () => {
  return (
    <main className="max-base lg:max-w-5xl pb-12 px-2 lg:px-0">
      <Today />
      <TodayAt />
      <Forecast />
    </main>
  );
};

import { Forecast } from './forecast/Forecast';
import { Today } from './today/Today';
import { TodayAt } from './today/TodayAt';

export const Weather = () => (
  <main className="max-base px-2 pb-12 lg:max-w-5xl lg:px-0">
    <Today />
    <TodayAt />
    <Forecast />
  </main>
);

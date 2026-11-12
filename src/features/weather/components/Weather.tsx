import { PAGE_CONTAINER_CLASSES } from '@/shared/constants/styles';
import { cn } from '@/shared/lib/cn';
import { Forecast } from './forecast/Forecast';
import { Next24Hours } from './hourly/Next24Hours';
import { Today } from './today/Today';

export const Weather = () => (
  <main className={cn(PAGE_CONTAINER_CLASSES, 'pb-12')}>
    <Today />
    <Next24Hours />
    <Forecast />
  </main>
);

import { Clock } from 'lucide-react';
import { SectionTitle } from '../SectionTitle';
import { HourlyForecast } from './HourlyForecast';
import { TemperatureChartSlot } from './TemperatureChartSlot';

export const Next24Hours = () => (
  <section className="pt-4">
    <SectionTitle title="Temperatura" subtitle="Próximas 24 horas" icon={Clock} />
    <figure className="mb-4 rounded-xl bg-surface p-3 shadow-sm sm:p-6">
      <figcaption className="sr-only">Gráfico da temperatura nas próximas 24 horas</figcaption>
      <div className="h-56 sm:h-64">
        <TemperatureChartSlot />
      </div>
    </figure>
    <HourlyForecast />
  </section>
);

import { SelectedLocation } from '@/features/location';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { LoadingMessage } from '@/shared/components/LoadingMessage';
import { useCurrentWeather } from '../../hooks/useCurrentWeather';
import { SectionTitle } from '../SectionTitle';
import { CurrentConditions } from './CurrentConditions';

export const Today = () => {
  const { data: weather, isPending, isError, error } = useCurrentWeather();

  return (
    <section className="my-4">
      <div className="flex flex-wrap items-center justify-between pt-4">
        <SectionTitle title="Tempo" subtitle="Hoje" className="py-3 sm:py-6" />
        <SelectedLocation />
      </div>
      <div className="min-h-96 gap-10 rounded-xl bg-secundary px-5 py-8 shadow-sm sm:p-10 md:flex">
        {isPending && <LoadingMessage message="Carregando dados do tempo..." />}
        {isError && (
          <ErrorMessage
            title="Ops! Ocorreu um erro"
            message={error.message || 'Erro ao carregar dados do clima'}
          />
        )}
        {weather && <CurrentConditions weather={weather} />}
      </div>
    </section>
  );
};

import {
  FavoriteButton,
  FavoritePlaces,
  LocationOffer,
  SelectedLocation,
} from '@/features/location';
import { ErrorMessage } from '@/shared/components/ErrorMessage';
import { useCurrentWeather } from '../../hooks/useCurrentWeather';
import { SectionTitle } from '../SectionTitle';
import { CurrentConditions } from './CurrentConditions';
import { TodaySkeleton } from './TodaySkeleton';

export const Today = () => {
  const { data: weather, dataUpdatedAt, isPending, isError, error, refetch } = useCurrentWeather();

  return (
    <section className="my-4">
      <LocationOffer />
      <FavoritePlaces />
      <div className="flex flex-wrap items-center justify-between gap-x-6 pt-4">
        <SectionTitle title="Tempo" subtitle="Hoje" className="py-3 sm:py-6" />
        <div className="flex items-center gap-1 pb-4 sm:py-6">
          <SelectedLocation className="text-2xl font-semibold text-balance text-primary" />
          <FavoriteButton />
        </div>
      </div>
      <div className="rounded-xl bg-surface px-5 py-8 shadow-sm sm:p-10">
        {isPending && <TodaySkeleton />}
        {isError && (
          <ErrorMessage
            title="Ops! Ocorreu um erro"
            message={`Não foi possível carregar o clima. ${error.message}`}
            onRetry={() => void refetch()}
            className="m-auto"
          />
        )}
        {weather && <CurrentConditions weather={weather} updatedAt={dataUpdatedAt} />}
      </div>
    </section>
  );
};

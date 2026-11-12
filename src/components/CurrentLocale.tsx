import { useCoordsStore } from '../store/weatherStore.ts';

export const CurrentLocale = () => {
  const currentLocale = useCoordsStore((state) => state.currentLocale);
  const { city, state, country } = currentLocale;

  return (
    <div className="px-5 py-3 text-2xl font-semibold text-balance text-primary sm:px-10 sm:py-6">
      {`${city ? city + ',' : ''} ${state ? state + ',' : ''} ${country ? country : ''}`}
    </div>
  );
};

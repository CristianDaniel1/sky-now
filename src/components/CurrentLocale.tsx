import { useCoordsStore } from '../store/weatherStore.ts';

export const CurrentLocale = () => {
  const currentLocale = useCoordsStore(state => state.currentLocale);
  const { city, state, country } = currentLocale;

  return (
    <div className="text-primary font-semibold px-5 sm:px-10 text-2xl text-balance py-3 sm:py-6">
      {`${city ? city + ',' : ''} ${state ? state + ',' : ''} ${
        country ? country : ''
      }`}
    </div>
  );
};

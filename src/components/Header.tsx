import { useCoordsStore } from '../store/weatherStore.ts';
import { GpsIcon } from './icons/GpsIcon.tsx';
import { SearchBar } from './SearchBar.tsx';
import { Button } from './ui/Button.tsx';
import logoImg from '../assets/img/logo.png';

export const Header = () => {
  const changeCoords = useCoordsStore((state) => state.changeCoords);
  const changeLocale = useCoordsStore((state) => state.changeLocale);

  function handleGetPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lon } = position.coords;
          changeCoords(lat, lon);
          changeLocale({ city: '', state: '', country: 'Local Atual' });
        },
        () => {
          alert('Não foi possível obter a sua localização.');
        },
      );
    }
  }

  return (
    <header className="bg-secundary shadow-xs">
      <div className="max-base flex flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-6 lg:max-w-5xl">
        <h1 className="flex items-center gap-2 text-xl font-bold text-primary sm:text-2xl">
          <img
            src={logoImg}
            alt="Logo de SkyNow, uma nuvem com óculos de sol"
            width={40}
            height={40}
            className="w-9 sm:w-10"
          />
          <div>
            Sky<span className="text-orange-400">Now</span>
          </div>
        </h1>
        <SearchBar />
        <Button
          className="order-2 flex items-center gap-2 rounded-full px-2 py-2 md:px-6 md:py-3"
          onClick={handleGetPosition}
        >
          <GpsIcon />
          <div className="hidden md:block">Local Atual</div>
        </Button>
      </div>
    </header>
  );
};

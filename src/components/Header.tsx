import { useCoordsStore } from '../store/weatherStore.ts';
import { GpsIcon } from './icons/GpsIcon.tsx';
import { SearchBar } from './SearchBar.tsx';
import { Button } from './ui/Button.tsx';
import logoImg from '../assets/img/logo.png';

export const Header = () => {
  const changeCoords = useCoordsStore(state => state.changeCoords);

  function handleGetPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude: lat, longitude: lon } = position.coords;
          changeCoords(lat, lon);
        },
        () => {
          alert('Não foi possível obter a sua localização.');
        }
      );
    }
  }

  return (
    <header className="bg-secundary shadow-sm">
      <div className="flex items-center justify-between max-base lg:max-w-5xl px-4 py-3 sm:px-8 sm:py-6 flex-wrap gap-4">
        <h1 className="font-bold text-xl sm:text-2xl text-primary flex items-center gap-2">
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
          className="rounded-full flex gap-2 items-center px-2 py-2 md:px-6 md:py-3 order-2"
          onClick={handleGetPosition}
        >
          <GpsIcon />
          <div className="hidden md:block">Local Atual</div>
        </Button>
      </div>
    </header>
  );
};

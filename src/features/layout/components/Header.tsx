import logoImage from '@/assets/img/logo.png';
import { CurrentLocationButton, SearchBar } from '@/features/location';

export const Header = () => (
  <header className="bg-secundary shadow-xs">
    <div className="max-base flex flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-8 sm:py-6 lg:max-w-5xl">
      <h1 className="flex items-center gap-2 text-xl font-bold text-primary sm:text-2xl">
        <img
          src={logoImage}
          alt="Logo de SkyNow, uma nuvem com óculos de sol"
          width={40}
          height={40}
          className="w-9 sm:w-10"
        />
        <span>
          Sky<span className="text-orange-400">Now</span>
        </span>
      </h1>
      <SearchBar />
      <CurrentLocationButton />
    </div>
  </header>
);

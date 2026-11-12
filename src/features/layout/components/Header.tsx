import logoImage from '@/assets/img/logo.png';
import { CurrentLocationButton, SearchBar } from '@/features/location';
import { InstallAppButton, OfflineNotice } from '@/features/pwa';
import { ThemeToggle } from '@/features/theme';
import { UnitToggle } from '@/features/units';
import { PAGE_CONTAINER_CLASSES } from '@/shared/constants/styles';
import { cn } from '@/shared/lib/cn';

export const Header = () => (
  <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur-md">
    <div
      className={cn(
        PAGE_CONTAINER_CLASSES,
        'flex flex-wrap items-center gap-x-6 gap-y-3 py-3 sm:flex-nowrap sm:py-4',
      )}
    >
      <a href="/" className="flex shrink-0 items-center gap-2 rounded-md">
        <img src={logoImage} alt="" width={40} height={40} className="w-9 sm:w-10" />
        <h1 className="text-xl font-bold text-primary sm:text-2xl">
          Sky<span className="text-accent">Now</span>
        </h1>
      </a>
      <SearchBar />
      <div className="ml-auto flex shrink-0 items-center gap-2">
        <InstallAppButton
          className="hidden size-11 rounded-full bg-accent/15 text-accent-strong transition-colors hover:bg-accent/25 md:flex lg:w-auto lg:px-4"
          labelClassName="hidden lg:inline"
        />
        <UnitToggle />
        <ThemeToggle />
        <CurrentLocationButton />
      </div>
    </div>
    <OfflineNotice />
  </header>
);

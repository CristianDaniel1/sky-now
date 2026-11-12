import logoImage from '@/assets/img/logo.png';
import { InstallAppButton } from '@/features/pwa';
import { PAGE_CONTAINER_CLASSES } from '@/shared/constants/styles';
import { cn } from '@/shared/lib/cn';
import { OPEN_WEATHER_URL } from '../constants/links';
import { SOCIAL_LINKS } from '../data/social-links';

export const Footer = () => (
  <footer className="border-t border-line bg-surface">
    <div
      className={cn(
        PAGE_CONTAINER_CLASSES,
        'flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between',
      )}
    >
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-2 text-lg font-bold text-primary">
          <img src={logoImage} alt="" width={28} height={28} className="w-7" />
          <span>
            Sky<span className="text-accent">Now</span>
          </span>
        </p>
        <p className="text-sm text-muted">
          Desenvolvido por <span className="font-medium text-accent-strong">Cristian Daniel</span>.
          Dados meteorológicos da{' '}
          <a
            href={OPEN_WEATHER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            OpenWeather
          </a>
          .
        </p>
        <InstallAppButton className="mt-2 w-fit rounded-full bg-accent/15 px-4 py-2 text-accent-strong transition-colors hover:bg-accent/25 md:hidden" />
      </div>
      <ul className="flex flex-wrap gap-2">
        {SOCIAL_LINKS.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target={link.isExternal ? '_blank' : undefined}
              rel={link.isExternal ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-subtle"
            >
              <img
                src={link.icon}
                alt=""
                width={18}
                height={18}
                className={cn('size-[18px]', link.invertOnDark && 'dark:invert')}
              />
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);

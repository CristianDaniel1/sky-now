const iconModules = import.meta.glob<string>('@/assets/weatherIcons/*.png', {
  eager: true,
  import: 'default',
});

const toIconCode = (path: string) => path.slice(path.lastIndexOf('/') + 1, -'.png'.length);

/** Weather condition images by OpenWeatherMap icon code (`01d`, `10n`…). */
export const WEATHER_ICONS: Record<string, string> = Object.fromEntries(
  Object.entries(iconModules).map(([path, url]) => [toIconCode(path), url]),
);

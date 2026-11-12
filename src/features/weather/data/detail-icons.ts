import eyeIcon from '@/assets/img/eye.svg';
import humidityIcon from '@/assets/img/humidity.png';
import thermometerIcon from '@/assets/img/thermometer.png';
import windIcon from '@/assets/img/wind.png';
import type { ImageAsset } from '@/shared/interfaces/image';

/** Icons shown next to each weather reading. */
export const WEATHER_DETAIL_ICONS = {
  thermometer: { src: thermometerIcon, alt: 'Ícone de termômetro' },
  humidity: { src: humidityIcon, alt: 'Ícone de umidade' },
  wind: { src: windIcon, alt: 'Ícone do vento' },
  visibility: { src: eyeIcon, alt: 'Ícone de olhos', invertOnDark: true },
} satisfies Record<string, ImageAsset>;

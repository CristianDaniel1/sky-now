import thermometerImg from './assets/img/thermometer.png';
import humidityImg from './assets/img/humidity.png';
import windImg from './assets/img/wind.png';
import visibilityImg from './assets/img/eye.svg';

import github from './assets/img/github-icon.svg';
import linkedin from './assets/img/linkedin.svg';
import email from './assets/img/email.png';

import day1 from './assets/weatherIcons/01d.png';
import day2 from './assets/weatherIcons/02d.png';
import day3 from './assets/weatherIcons/03d.png';
import day4 from './assets/weatherIcons/04d.png';
import day9 from './assets/weatherIcons/09d.png';
import day10 from './assets/weatherIcons/10d.png';
import day11 from './assets/weatherIcons/11d.png';
import day13 from './assets/weatherIcons/13d.png';
import day50 from './assets/weatherIcons/50d.png';

import night1 from './assets/weatherIcons/01n.png';
import night2 from './assets/weatherIcons/02n.png';
import night3 from './assets/weatherIcons/03n.png';
import night4 from './assets/weatherIcons/04n.png';
import night9 from './assets/weatherIcons/09n.png';
import night10 from './assets/weatherIcons/10n.png';
import night11 from './assets/weatherIcons/11n.png';
import night13 from './assets/weatherIcons/13n.png';
import night50 from './assets/weatherIcons/50n.png';

export const links = [
  {
    img: linkedin,
    url: 'https://www.linkedin.com/in/cristiandaniel1',
    alt: 'Icone de linkedin',
  },
  {
    img: github,
    url: 'https://github.com/CristianDaniel1',
    alt: 'Icone de github',
  },
  {
    img: email,
    url: 'mailto:cristiandaniel.1050@gmail.com',
    alt: 'Icone de email',
  },
];

export const thermometer = {
  img: thermometerImg,
  alt: 'Icone de termometro',
};

export const humidity = {
  img: humidityImg,
  alt: 'Icone de umidade',
};

export const wind = {
  img: windImg,
  alt: 'Icone do vento',
};

export const visibility = {
  img: visibilityImg,
  alt: 'Icone de olhos',
};

export const weatherIcons = [
  {
    id: '01d',
    img: day1,
  },
  {
    id: '01n',
    img: night1,
  },
  {
    id: '02d',
    img: day2,
  },
  {
    id: '02n',
    img: night2,
  },
  {
    id: '03d',
    img: day3,
  },
  {
    id: '03n',
    img: night3,
  },
  {
    id: '04d',
    img: day4,
  },
  {
    id: '04n',
    img: night4,
  },
  {
    id: '09d',
    img: day9,
  },
  {
    id: '09n',
    img: night9,
  },
  {
    id: '10d',
    img: day10,
  },
  {
    id: '10n',
    img: night10,
  },
  {
    id: '11d',
    img: day11,
  },
  {
    id: '11n',
    img: night11,
  },
  {
    id: '13d',
    img: day13,
  },
  {
    id: '13n',
    img: night13,
  },
  {
    id: '50d',
    img: day50,
  },
  {
    id: '50n',
    img: night50,
  },
];

export const DEFAULT_COORDS = {
  lat: 19.4326296,
  lon: -99.1331785,
};

export const DEFAULT_LOCALE = {
  city: 'Mexico City',
  state: '',
  country: 'MX',
};

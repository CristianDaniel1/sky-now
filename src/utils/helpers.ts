export const findIcon = (icons: string[], icon: string) => {
  const iconWeather = icons.find(img => img.includes(icon));

  return iconWeather;
};

export const getDate = (dateDt: number) => {
  const date = new Date(dateDt * 1000);
  const locale = navigator.language;

  const weekday = date.toLocaleDateString(locale, { weekday: 'long' });
  const day = date.toLocaleDateString(locale, { day: '2-digit' });

  const hours = date.getHours();

  return { weekday, day, hours };
};

export const getCurrentDate = (dateDt: number) => {
  const date = new Date(dateDt * 1000);
  const locale = navigator.language;

  const day = date.toLocaleDateString(locale, {
    weekday: 'long',
    month: 'long',
    day: '2-digit',
  });

  return day;
};

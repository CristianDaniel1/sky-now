// Applies the saved color theme before the first paint, so the page never flashes the wrong theme.
// Keep the storage key and shape in sync with src/features/theme (THEME_STORAGE_KEY, zustand persist).
(() => {
  let preference = 'system';
  try {
    const saved = JSON.parse(localStorage.getItem('sky-now:theme') ?? 'null');
    preference = saved?.state?.preference ?? 'system';
  } catch {
    preference = 'system';
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = preference === 'dark' || (preference === 'system' && prefersDark);
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
})();

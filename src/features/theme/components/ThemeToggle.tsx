import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Usar tema claro' : 'Usar tema escuro'}
      title={isDark ? 'Usar tema claro' : 'Usar tema escuro'}
      className="flex size-11 items-center justify-center rounded-full bg-slate-100 text-primary transition-colors hover:bg-slate-200 dark:bg-subtle dark:hover:bg-line"
    >
      <Icon aria-hidden="true" className="size-5" />
    </button>
  );
};

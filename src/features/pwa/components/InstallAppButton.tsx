import { Download } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { useInstallApp } from '../hooks/useInstallApp';

interface InstallAppButtonProps {
  className?: string | undefined;
  labelClassName?: string | undefined;
}

export const InstallAppButton = ({ className, labelClassName }: InstallAppButtonProps) => {
  const { canInstall, install } = useInstallApp();

  if (!canInstall) return null;

  return (
    <button
      type="button"
      onClick={() => void install()}
      aria-label="Instalar app"
      title="Instalar app"
      className={cn('flex items-center justify-center gap-2 text-sm font-medium', className)}
    >
      <Download aria-hidden="true" className="size-5 shrink-0" />
      <span className={labelClassName}>Instalar app</span>
    </button>
  );
};

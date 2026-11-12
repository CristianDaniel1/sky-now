import { LoaderCircle, LocateFixed, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { cn } from '@/shared/lib/cn';
import { useCurrentPosition } from '../hooks/useCurrentPosition';

export const CurrentLocationButton = () => {
  const { locate, isLocating, errorMessage, dismissError } = useCurrentPosition();
  const Icon = isLocating ? LoaderCircle : LocateFixed;

  return (
    <div className="relative">
      <Button
        className="size-11 md:w-auto md:px-5"
        onClick={() => void locate()}
        disabled={isLocating}
        aria-busy={isLocating}
        aria-label="Usar minha localização atual"
      >
        <Icon
          aria-hidden="true"
          className={cn('size-5', isLocating && 'motion-safe:animate-spin')}
        />
        <span className="hidden md:block">{isLocating ? 'Localizando…' : 'Local Atual'}</span>
      </Button>
      {errorMessage && (
        <div
          role="alert"
          className="absolute top-full right-0 z-30 mt-2 flex w-72 items-start gap-3 rounded-md border-2 border-line bg-surface p-3 text-sm text-primary shadow-sm"
        >
          <p className="flex-1">{errorMessage}</p>
          <button
            type="button"
            onClick={dismissError}
            aria-label="Fechar aviso"
            className="text-muted hover:text-primary"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
};

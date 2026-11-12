import { GpsIcon } from '@/shared/components/icons/GpsIcon';
import { Button } from '@/shared/components/ui/Button';
import { cn } from '@/shared/lib/cn';
import { useCurrentPosition } from '../hooks/useCurrentPosition';

export const CurrentLocationButton = () => {
  const { locate, isLocating, errorMessage, dismissError } = useCurrentPosition();

  return (
    <div className="relative order-2">
      <Button
        className="flex items-center gap-2 rounded-full px-2 py-2 disabled:opacity-70 md:px-6 md:py-3"
        onClick={() => void locate()}
        disabled={isLocating}
        aria-busy={isLocating}
        aria-label="Usar minha localização atual"
      >
        <GpsIcon className={cn(isLocating && 'animate-spin')} />
        <span className="hidden md:block">{isLocating ? 'Localizando...' : 'Local Atual'}</span>
      </Button>
      {errorMessage && (
        <div
          role="alert"
          className="absolute top-full right-0 z-30 mt-2 flex w-64 items-start gap-2 rounded-md border border-red-200 bg-white p-3 text-sm text-red-800 shadow-sm"
        >
          <p className="flex-1">{errorMessage}</p>
          <button
            type="button"
            onClick={dismissError}
            aria-label="Fechar aviso"
            className="font-bold text-red-800"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

import { LocateFixed } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { DEFAULT_LOCATION_LABEL } from '../constants/location';
import { useFirstVisitLocation } from '../hooks/useFirstVisitLocation';

export const LocationOffer = () => {
  const { shouldOffer, isLocating, errorMessage, locate, dismiss } = useFirstVisitLocation();

  if (!shouldOffer) return null;

  return (
    <aside
      aria-label="Usar sua localização"
      className="mt-6 flex flex-col gap-4 rounded-xl bg-surface p-5 shadow-sm sm:flex-row sm:items-center"
    >
      <LocateFixed aria-hidden="true" className="hidden size-6 shrink-0 text-heading sm:block" />
      <div className="flex-1">
        <p className="font-medium text-primary">Quer ver o clima de onde você está?</p>
        <p className="text-sm text-muted">Por enquanto, mostramos {DEFAULT_LOCATION_LABEL.city}.</p>
        {errorMessage && (
          <p role="alert" className="pt-1 text-sm text-hot">
            {errorMessage}
          </p>
        )}
      </div>
      <div className="flex flex-wrap gap-1">
        <Button
          onClick={() => void locate()}
          disabled={isLocating}
          aria-busy={isLocating}
          className="h-10 px-4 text-sm font-medium sm:px-5"
        >
          {isLocating ? 'Localizando…' : 'Usar minha localização'}
        </Button>
        <button
          type="button"
          onClick={dismiss}
          className="h-10 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          Agora não
        </button>
      </div>
    </aside>
  );
};

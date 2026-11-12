import { RefreshCw } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { useAppUpdate } from '../hooks/useAppUpdate';

export const UpdatePrompt = () => {
  const { hasUpdate, update, postpone } = useAppUpdate();

  if (!hasUpdate) return null;

  return (
    <div
      role="status"
      className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-4 shadow-lg"
    >
      <p className="flex items-start gap-3 text-sm text-primary">
        <RefreshCw aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-heading" />
        Há uma nova versão do SkyNow. Atualize para usar as últimas melhorias.
      </p>
      <div className="flex justify-end gap-1">
        <button
          type="button"
          onClick={postpone}
          className="h-10 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          Agora não
        </button>
        <Button onClick={() => void update()} className="h-10 px-4 text-sm font-medium">
          Atualizar
        </Button>
      </div>
    </div>
  );
};

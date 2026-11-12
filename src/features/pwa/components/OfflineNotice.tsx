import { WifiOff } from 'lucide-react';
import { PAGE_CONTAINER_CLASSES } from '@/shared/constants/styles';
import { useOnlineStatus } from '@/shared/hooks/useOnlineStatus';
import { cn } from '@/shared/lib/cn';

export const OfflineNotice = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div role="status" className="border-t border-line bg-subtle">
      <p
        className={cn(PAGE_CONTAINER_CLASSES, 'flex items-center gap-2 py-2 text-sm text-primary')}
      >
        <WifiOff aria-hidden="true" className="size-4 shrink-0 text-accent-strong" />
        Sem conexão. Mostrando os últimos dados salvos; a busca volta quando a internet voltar.
      </p>
    </div>
  );
};

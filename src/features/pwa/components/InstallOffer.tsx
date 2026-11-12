import logoImage from '@/assets/img/logo.png';
import { Button } from '@/shared/components/ui/Button';
import { useInstallOffer } from '../hooks/useInstallOffer';

export const InstallOffer = () => {
  const { shouldOffer, install, dismiss } = useInstallOffer();

  if (!shouldOffer) return null;

  return (
    <aside
      aria-label="Instalar o SkyNow"
      className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-4 shadow-lg"
    >
      <div className="flex items-start gap-3">
        <img src={logoImage} alt="" width={40} height={40} className="size-10 shrink-0" />
        <div className="text-sm">
          <p className="font-semibold text-primary">Instale o SkyNow</p>
          <p className="text-muted">
            Abra direto da tela inicial e veja os últimos dados mesmo sem internet.
          </p>
        </div>
      </div>
      <div className="flex justify-end gap-1">
        <button
          type="button"
          onClick={dismiss}
          className="h-10 rounded-full px-3 text-sm font-medium text-muted transition-colors hover:text-primary"
        >
          Agora não
        </button>
        <Button onClick={() => void install()} className="h-10 px-4 text-sm font-medium">
          Instalar
        </Button>
      </div>
    </aside>
  );
};

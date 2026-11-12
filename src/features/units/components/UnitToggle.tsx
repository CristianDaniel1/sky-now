import { cn } from '@/shared/lib/cn';
import { UNIT_SYSTEM_DETAILS, UNIT_SYSTEMS } from '../data/unit-systems';
import { useUnitsStore } from '../store/units.store';

export const UnitToggle = () => {
  const system = useUnitsStore((store) => store.system);
  const setSystem = useUnitsStore((store) => store.setSystem);

  return (
    <div
      role="group"
      aria-label="Unidade de temperatura"
      className="flex h-11 items-center gap-0.5 rounded-full bg-slate-100 p-1 dark:bg-subtle"
    >
      {UNIT_SYSTEMS.map((option) => {
        const { temperatureSymbol, temperatureName, speedUnit } = UNIT_SYSTEM_DETAILS[option];
        const isActive = option === system;

        return (
          <button
            key={option}
            type="button"
            onClick={() => setSystem(option)}
            aria-pressed={isActive}
            aria-label={temperatureName}
            title={`${temperatureName} e ${speedUnit}`}
            className={cn(
              'h-9 rounded-full px-2.5 text-sm font-semibold text-muted transition-colors hover:text-primary',
              isActive && 'bg-surface text-primary shadow-sm dark:bg-line',
            )}
          >
            {temperatureSymbol}
          </button>
        );
      })}
    </div>
  );
};

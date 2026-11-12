import type { ReactNode } from 'react';

interface DetailTileProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export const DetailTile = ({ icon, label, value }: DetailTileProps) => (
  <div className="flex items-center gap-3 rounded-lg bg-subtle px-4 py-3">
    <span className="flex size-6 shrink-0 items-center justify-center">{icon}</span>
    <div className="flex min-w-0 flex-col">
      <dt className="text-xs text-muted sm:text-sm">{label}</dt>
      <dd className="font-semibold text-primary tabular-nums">{value}</dd>
    </div>
  </div>
);

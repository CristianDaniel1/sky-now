import type { ReactNode } from 'react';

interface DetailItemProps {
  icon: ReactNode;
  label: string;
  value: string;
}

export const DetailItem = ({ icon, label, value }: DetailItemProps) => (
  <div className="flex items-center gap-1.5">
    {icon}
    <dt>{label}:</dt>
    <dd className="font-medium text-primary">{value}</dd>
  </div>
);

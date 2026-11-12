import { CalendarDays, type LucideIcon } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  icon?: LucideIcon | undefined;
  className?: string | undefined;
}

export const SectionTitle = ({
  title,
  subtitle,
  icon: Icon = CalendarDays,
  className,
}: SectionTitleProps) => (
  <h2
    className={cn(
      'flex items-center gap-2 py-6 text-2xl font-light text-heading sm:text-3xl',
      className,
    )}
  >
    <Icon aria-hidden="true" strokeWidth={1.5} className="size-8 sm:size-9" />
    <span className="text-balance">
      <span className="font-medium">{title}</span> - {subtitle}
    </span>
  </h2>
);

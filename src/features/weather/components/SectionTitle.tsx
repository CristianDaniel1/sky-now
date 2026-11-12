import { CalendarIcon } from '@/shared/components/icons/CalendarIcon';
import { cn } from '@/shared/lib/cn';

interface SectionTitleProps {
  title: string;
  subtitle: string;
  className?: string | undefined;
}

export const SectionTitle = ({ title, subtitle, className }: SectionTitleProps) => (
  <h2
    className={cn(
      'flex items-center gap-2 px-4 py-6 text-2xl font-light text-sky-600 sm:px-6 sm:text-3xl',
      className,
    )}
  >
    <CalendarIcon />
    <span className="text-balance">
      <span className="font-medium">{title}</span> - {subtitle}
    </span>
  </h2>
);

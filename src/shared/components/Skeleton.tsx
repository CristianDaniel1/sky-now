import { cn } from '@/shared/lib/cn';

interface SkeletonProps {
  className?: string | undefined;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div
    aria-hidden="true"
    className={cn('rounded-2xl bg-line motion-safe:animate-pulse', className)}
  />
);

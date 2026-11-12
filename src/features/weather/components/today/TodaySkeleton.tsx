import { Skeleton } from '@/shared/components/Skeleton';

export const TodaySkeleton = () => (
  <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_26rem] lg:items-center lg:gap-10">
    <div>
      <div className="flex flex-col items-center gap-2 sm:items-start">
        <Skeleton className="h-10 w-3/4 rounded-md sm:w-96" />
        <Skeleton className="h-4 w-56 rounded-md" />
      </div>
      <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <Skeleton className="size-28 shrink-0 rounded-full sm:size-32" />
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Skeleton className="h-8 w-40 rounded-md" />
          <Skeleton className="h-14 w-60 rounded-md" />
        </div>
      </div>
    </div>
    <div className="mt-8 grid grid-cols-2 gap-3 border-t border-line pt-8 md:grid-cols-4 lg:mt-0 lg:grid-cols-2 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
      {Array.from({ length: 8 }, (_, index) => (
        <Skeleton key={index} className="h-16 rounded-lg" />
      ))}
    </div>
  </div>
);

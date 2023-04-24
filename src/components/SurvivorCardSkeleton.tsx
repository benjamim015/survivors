/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/no-array-index-key */
import { Skeleton } from '@altitude-ui/react';

type SurvivorCardSkeletonProps = {
  isLoading: boolean;
  isRefetching: boolean;
  isFetchingNextPage: boolean;
};

export function SurvivorCardSkeleton({
  isLoading,
  isRefetching,
  isFetchingNextPage,
}: SurvivorCardSkeletonProps) {
  return (
    <>
      {(isLoading || isRefetching || isFetchingNextPage) &&
        Array.from({ length: 9 }).map((_, i) => {
          return (
            <div key={i} className="w-92 max-w-92 h-80">
              <Skeleton />
            </div>
          );
        })}
    </>
  );
}

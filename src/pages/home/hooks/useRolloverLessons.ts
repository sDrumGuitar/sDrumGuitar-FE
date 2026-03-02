import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getRollOverLessons } from '@/shared/api/lessons';

export const useRolloverLessons = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['home', 'rollover-lessons'],
    queryFn: () => getRollOverLessons(),
  });

  return useMemo(
    () => ({
      totalCount: data?.total_count ?? 0,
      lessons: data?.lessons.slice(0, 3) ?? [],
      isLoading,
      refetch,
    }),
    [data, isLoading, refetch],
  );
};

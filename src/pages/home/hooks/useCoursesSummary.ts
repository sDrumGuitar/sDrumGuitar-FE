import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCourses } from '@/shared/api/courses';

export const useCoursesSummary = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['home', 'courses', 1, 3],
    queryFn: () => getCourses({ page: 1, size: 3 }),
  });

  return useMemo(
    () => ({
      totalCount: data?.total_count ?? 0,
      courses: data?.courses ?? [],
      isLoading,
      refetch,
    }),
    [data, isLoading, refetch],
  );
};

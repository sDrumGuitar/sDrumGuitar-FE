import { useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCourses } from '@/shared/api/courses';
import type { GetCoursesResponse } from '@/shared/api/courses/courses.types';

export const useCoursesSummary = () => {
  const queryClient = useQueryClient();
  const courseListCache = queryClient.getQueryData<GetCoursesResponse>([
    'courses',
    { page: 1, size: 20 },
  ]);
  const courseListUpdatedAt = queryClient.getQueryState([
    'courses',
    { page: 1, size: 20 },
  ])?.dataUpdatedAt;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['home', 'courses', 1, 3],
    queryFn: () => getCourses({ page: 1, size: 3 }),
    initialData: courseListCache
      ? {
          ...courseListCache,
          page: 1,
          size: 3,
          courses: courseListCache.courses.slice(0, 3),
        }
      : undefined,
    initialDataUpdatedAt: courseListCache ? courseListUpdatedAt : undefined,
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

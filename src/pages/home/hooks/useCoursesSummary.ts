import { useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCourses, type GetCoursesResponse } from '@/shared/api/courses';

export const useCoursesSummary = () => {
  const queryClient = useQueryClient();
  const coursesCache = queryClient.getQueryData<GetCoursesResponse>([
    'courses',
    { page: 1, size: 20 },
  ]);
  const coursesCacheUpdatedAt = queryClient.getQueryState([
    'courses',
    { page: 1, size: 20 },
  ])?.dataUpdatedAt;
  const hasEnoughCache = (coursesCache?.courses.length ?? 0) >= 3;
  const initialData =
    hasEnoughCache && coursesCache
      ? {
          ...coursesCache,
          size: 3,
          courses: coursesCache.courses.slice(0, 3),
        }
      : undefined;

  const { data, isLoading, refetch } = useQuery<GetCoursesResponse>({
    queryKey: ['home', 'courses', 1, 3],
    queryFn: () => getCourses({ page: 1, size: 3 }),
    enabled: !hasEnoughCache,
    initialData,
    initialDataUpdatedAt: initialData ? coursesCacheUpdatedAt : undefined,
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

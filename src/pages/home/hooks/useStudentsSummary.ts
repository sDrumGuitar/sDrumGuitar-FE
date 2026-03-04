import { useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getStudents, type GetStudentsResponse } from '@/shared/api/students';

export const useStudentsSummary = () => {
  const queryClient = useQueryClient();
  const studentsCache = queryClient.getQueryData<GetStudentsResponse>([
    'students',
    { page: 1, size: 20 },
  ]);
  const studentsCacheUpdatedAt = queryClient.getQueryState([
    'students',
    { page: 1, size: 20 },
  ])?.dataUpdatedAt;
  const hasEnoughCache = (studentsCache?.students.length ?? 0) >= 3;
  const initialData =
    hasEnoughCache && studentsCache
      ? {
          ...studentsCache,
          size: 3,
          students: studentsCache.students.slice(0, 3),
        }
      : undefined;

  const { data, isLoading, refetch } = useQuery<GetStudentsResponse>({
    queryKey: ['home', 'students', 1, 3],
    queryFn: () => getStudents({ page: 1, size: 3 }),
    staleTime: 1000 * 60 * 5,
    enabled: !hasEnoughCache,
    initialData,
    initialDataUpdatedAt: initialData ? studentsCacheUpdatedAt : undefined,
  });

  return useMemo(
    () => ({
      totalCount: data?.total_count ?? 0,
      students: data?.students ?? [],
      isLoading,
      refetch,
    }),
    [data, isLoading, refetch],
  );
};

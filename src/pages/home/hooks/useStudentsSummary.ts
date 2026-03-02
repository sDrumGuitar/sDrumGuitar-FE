import { useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getStudents } from '@/shared/api/students';
import type { GetStudentsResponse } from '@/shared/api/students';

export const useStudentsSummary = () => {
  const queryClient = useQueryClient();
  const studentListCache = queryClient.getQueryData<GetStudentsResponse>([
    'students',
    { page: 1, size: 20 },
  ]);
  const studentListUpdatedAt = queryClient.getQueryState([
    'students',
    { page: 1, size: 20 },
  ])?.dataUpdatedAt;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['home', 'students', 1, 3],
    queryFn: () => getStudents({ page: 1, size: 3 }),
    initialData: studentListCache
      ? {
          ...studentListCache,
          page: 1,
          size: 3,
          students: studentListCache.students.slice(0, 3),
        }
      : undefined,
    initialDataUpdatedAt: studentListCache ? studentListUpdatedAt : undefined,
    staleTime: 1000 * 60 * 5,
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

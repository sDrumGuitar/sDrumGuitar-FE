import { useMemo } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getStudents } from '@/shared/api/students';
import type { GetStudentsResponse } from '@/shared/api/students';

export const useStudents = () => {
  const queryClient = useQueryClient();
  const studentListCache = queryClient.getQueryData<GetStudentsResponse>([
    'students',
    { page: 1, size: 20 },
  ]);
  const studentListUpdatedAt = queryClient.getQueryState([
    'students',
    { page: 1, size: 20 },
  ])?.dataUpdatedAt;

  const { data } = useQuery({
    queryKey: ['students', { page: 1, size: 20 }],
    queryFn: () => getStudents({ page: 1, size: 20 }),
    initialData: studentListCache,
    initialDataUpdatedAt: studentListCache ? studentListUpdatedAt : undefined,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: (query) => query.isStale(),
  });

  return useMemo(
    () => ({
      students: data?.students ?? [],
    }),
    [data],
  );
};

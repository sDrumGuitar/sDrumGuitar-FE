import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStudents } from '@/shared/api/students';

export const useStudentsSummary = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['home', 'students', 1, 3],
    queryFn: () => getStudents({ page: 1, size: 3 }),
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

import { useMemo } from 'react';
import { getRollOverLessons, type LessonItem } from '@/shared/api/lessons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { GetRolloverLessonsResponse } from '@/shared/api/lessons';

// 이월 목록을 관리하는 커스텀 훅 - 이월된 레슨 목록을 가져오고 상태로 관리
export const useCarryList = () => {
  const queryClient = useQueryClient();
  const homeCache = queryClient.getQueryData<GetRolloverLessonsResponse>([
    'home',
    'rollover-lessons',
  ]);
  const homeCacheUpdatedAt = queryClient.getQueryState([
    'home',
    'rollover-lessons',
  ])?.dataUpdatedAt;

  const { data, refetch } = useQuery({
    queryKey: ['rollover-lessons'],
    queryFn: () => getRollOverLessons(),
    initialData: homeCache,
    initialDataUpdatedAt: homeCache ? homeCacheUpdatedAt : undefined,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: (query) => query.isStale(),
  });

  return useMemo(
    () => ({
      lessons: (data?.lessons ?? []) as LessonItem[],
      fetchLessons: async () => {
        await refetch();
      },
    }),
    [data, refetch],
  );
};

import { useEffect, useMemo, useState } from 'react';
import { getRollOverLessons } from '@/shared/api/lessons';
import type { LessonItem } from '@/shared/api/lessons';

interface RolloverSummary {
  totalCount: number;
  lessons: LessonItem[];
  isLoading: boolean;
}

export const useRolloverLessons = () => {
  const [summary, setSummary] = useState<RolloverSummary>({
    totalCount: 0,
    lessons: [],
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchRolloverLessons = async () => {
      const data = await getRollOverLessons();
      if (!isMounted) return;

      setSummary({
        totalCount: data.total_count,
        lessons: data.lessons.slice(0, 3),
        isLoading: false,
      });
    };

    fetchRolloverLessons();

    return () => {
      isMounted = false;
    };
  }, []);

  return useMemo(() => summary, [summary]);
};

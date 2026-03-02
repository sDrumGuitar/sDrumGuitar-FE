import { useEffect, useMemo, useState } from 'react';
import { getLessons } from '@/shared/api/lessons';
import { WEEKDAY_OPTIONS } from '@/constants/course';
import { getWeekdayLabel } from '@/utils/date/getWeekdayLabel';
import { getWeekdayValueFromDate, toDateKey, type WeekdayValue } from '../utils/date';

interface LessonSummary {
  monthTotal: number;
  todayTotal: number;
  weekdayCounts: { label: string; value: number }[];
  isLoading: boolean;
}

export const useLessonSummary = () => {
  const [summary, setSummary] = useState<LessonSummary>({
    monthTotal: 0,
    todayTotal: 0,
    weekdayCounts: WEEKDAY_OPTIONS.map((opt) => ({
      label: opt.label,
      value: 0,
    })),
    isLoading: true,
  });

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const todayKey = toDateKey(now);

    let isMounted = true;

    const fetchLessons = async () => {
      const data = await getLessons({ year, month });
      if (!isMounted) return;

      const weekdayMap = new Map<WeekdayValue, number>();
      WEEKDAY_OPTIONS.forEach((opt) => {
        weekdayMap.set(opt.value, 0);
      });

      let monthTotal = 0;
      let todayTotal = 0;

      data.days.forEach((day) => {
        const dayTotal = day.lessons.length;
        monthTotal += dayTotal;

        const parsed = new Date(day.date);
        if (!Number.isNaN(parsed.getTime())) {
          const weekday = getWeekdayValueFromDate(parsed);
          weekdayMap.set(weekday, (weekdayMap.get(weekday) ?? 0) + dayTotal);
          if (toDateKey(parsed) === todayKey) {
            todayTotal += dayTotal;
          }
        }
      });

      const weekdayCounts = WEEKDAY_OPTIONS.map((opt) => ({
        label: getWeekdayLabel(opt.value),
        value: weekdayMap.get(opt.value) ?? 0,
      }));

      setSummary({
        monthTotal,
        todayTotal,
        weekdayCounts,
        isLoading: false,
      });
    };

    fetchLessons();

    return () => {
      isMounted = false;
    };
  }, []);

  return useMemo(() => summary, [summary]);
};

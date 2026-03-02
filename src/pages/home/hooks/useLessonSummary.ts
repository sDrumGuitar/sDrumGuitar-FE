import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLessons } from '@/shared/api/lessons';
import { WEEKDAY_OPTIONS } from '@/constants/course';
import { getWeekdayLabel } from '@/utils/date/getWeekdayLabel';
import {
  getWeekdayValueFromDate,
  toDateKey,
  type WeekdayValue,
} from '../utils/date';

export const useLessonSummary = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const todayKey = toDateKey(now);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['home', 'lessons', year, month],
    queryFn: () => getLessons({ year, month }),
  });

  return useMemo(() => {
    const weekdayMap = new Map<WeekdayValue, number>();
    WEEKDAY_OPTIONS.forEach((opt) => {
      weekdayMap.set(opt.value, 0);
    });

    let monthTotal = 0;
    let todayTotal = 0;

    data?.days.forEach((day) => {
      const dayLessons = day.lessons.filter(
        (lesson) =>
          lesson.lesson_tag !== 'rollover' &&
          lesson.attendance_status !== 'rollover',
      );
      const dayTotal = dayLessons.length;
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

    return {
      monthTotal,
      todayTotal,
      weekdayCounts,
      isLoading,
      refetch,
    };
  }, [data, isLoading, todayKey, refetch]);
};

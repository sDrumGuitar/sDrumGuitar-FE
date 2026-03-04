import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CalendarData } from '@/types/schedule';
import { getLessons } from '@/shared/api/lessons';
import { getClassTypeLabel } from '@/utils/course/getClassTypeLabel';
import { useScheduleCalendarStore } from '@/store/schedule/scheduleCalendarStore';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { GetLessonsResponse } from '@/shared/api/lessons';

/*
 * 캘린더 데이터를 관리하는 커스텀 훅
 * - 현재 연도와 월에 해당하는 회차 데이터를 불러와서 상태로 관리
 * - 출석 상태 업데이트 핸들러 제공
 * - 회차 데이터 불러오기 함수 제공
 */
export const useScheduleCalendar = () => {
  const { currentMonth, currentYear } = useScheduleCalendarStore(); // 캘린더 상태 (현재 연도, 월)
  const [calendarData, setCalendarData] = useState<CalendarData>({}); // 캘린더 데이터 상태
  const queryClient = useQueryClient();
  const month = currentMonth + 1;
  const homeLessonsCache = queryClient.getQueryData<GetLessonsResponse>([
    'home',
    'lessons',
    currentYear,
    month,
  ]);
  const homeLessonsUpdatedAt = queryClient.getQueryState([
    'home',
    'lessons',
    currentYear,
    month,
  ])?.dataUpdatedAt;

  // 출석 상태 업데이트 핸들러
  const handleAttendanceUpdated = (
    lessonId: number,
    attendanceStatus: string | null,
  ) => {
    setCalendarData((prev) => {
      const next: CalendarData = {};

      Object.entries(prev).forEach(([date, day]) => {
        next[date] = {
          ...day,
          lessons: day.lessons.map((lesson) =>
            lesson.id === lessonId
              ? { ...lesson, attendance_status: attendanceStatus }
              : lesson,
          ),
        };
      });

      return next;
    });
  };

  // 회차 데이터 불러오기
  const mapLessonsToCalendar = useCallback((response: GetLessonsResponse) => {
    const normalizeAttendanceStatus = (value?: string) => {
      if (!value) return null;
      const normalized = value.toLowerCase();
      return normalized === 'notyet' ? null : normalized;
    };

    return response.days.reduce((acc, day) => {
      acc[day.date] = {
        date: day.date,
        lessons: day.lessons.map((lesson) => ({
          name: lesson.name,
          class_type:
            getClassTypeLabel(
              lesson.class_type as Parameters<typeof getClassTypeLabel>[0],
            ) || lesson.class_type,
          lesson_index: lesson.lesson_index,
          id: lesson.lesson_id,
          paid_at: '',
          lesson_tag: lesson.lesson_tag,
          attendance_status: normalizeAttendanceStatus(lesson.attendance_status),
        })),
      };
      return acc;
    }, {} as CalendarData);
  }, []);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['lessons', currentYear, month],
    queryFn: () => getLessons({ year: currentYear, month }),
    initialData: homeLessonsCache,
    initialDataUpdatedAt: homeLessonsCache ? homeLessonsUpdatedAt : undefined,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: (query) => query.isStale(),
  });

  const fetchLessons = useCallback(async () => {
    await refetch();
  }, [refetch]);

  // 컴포넌트 마운트 시 회차 데이터 불러오기
  const mappedData = useMemo(
    () => (data ? mapLessonsToCalendar(data) : {}),
    [data, mapLessonsToCalendar],
  );

  useEffect(() => {
    setCalendarData(mappedData);
  }, [mappedData]);

  // 외부로 노출할 데이터와 함수
  return {
    calendarData,
    fetchLessons,
    handleAttendanceUpdated,
    isRefreshing: isFetching,
  };
};

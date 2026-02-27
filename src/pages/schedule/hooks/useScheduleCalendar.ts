import { useCallback, useEffect, useState } from 'react';
import type { CalendarData } from '@/types/schedule';
import { getLessons } from '@/shared/api/lessons';
import { getClassTypeLabel } from '@/utils/course/getClassTypeLabel';
import { useScheduleCalendarStore } from '@/store/scheduleCalendarStore';

/*
 * 캘린더 데이터를 관리하는 커스텀 훅
 * - 현재 연도와 월에 해당하는 회차 데이터를 불러와서 상태로 관리
 * - 출석 상태 업데이트 핸들러 제공
 * - 회차 데이터 불러오기 함수 제공
 */
export const useScheduleCalendar = () => {
  const { currentMonth, currentYear } = useScheduleCalendarStore(); // 캘린더 상태 (현재 연도, 월)
  const [calendarData, setCalendarData] = useState<CalendarData>({}); // 캘린더 데이터 상태

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
  const fetchLessons = useCallback(async () => {
    const response = await getLessons({
      year: currentYear,
      month: currentMonth + 1,
    });
    console.log(response);

    const data: CalendarData = response.days.reduce((acc, day) => {
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
          attendance_status:
            lesson.attendance_status === 'notyet'
              ? null
              : lesson.attendance_status,
        })),
      };
      return acc;
    }, {} as CalendarData);

    setCalendarData(data);
  }, [currentMonth, currentYear]);

  // 컴포넌트 마운트 시 회차 데이터 불러오기
  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  // 외부로 노출할 데이터와 함수
  return {
    calendarData,
    fetchLessons,
    handleAttendanceUpdated,
  };
};

import { useCallback, useEffect, useState } from 'react';
import type { CalendarData } from '@/types/schedule';
import { getLessons } from '@/shared/api/lessons';
import { getClassTypeLabel } from '@/utils/getClassTypeLabel';
import { useScheduleCalendarStore } from '@/store/scheduleCalendarStore';

export const useScheduleCalendar = () => {
  const { currentMonth, currentYear } = useScheduleCalendarStore();
  const [calendarData, setCalendarData] = useState<CalendarData>({});

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

  useEffect(() => {
    fetchLessons();
  }, [fetchLessons]);

  return {
    calendarData,
    fetchLessons,
    handleAttendanceUpdated,
  };
};

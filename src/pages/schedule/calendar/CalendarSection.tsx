import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import CalendarGrid from './body/CalendarGrid';
import CalendarHeader from './header/CalendarHeader';
import { getMonthDates } from './utils';
import type { CalendarData } from './types';
import { getLessons } from '@/shared/api/lessons';
import { getClassTypeLabel } from '@/utils/getClassTypeLabel';

/**
 * CalendarSection
 *
 * 월 단위 캘린더의 연/월 상태와 네비게이션을 관리하는 컨테이너 컴포넌트입니다.
 * 실제 날짜 셀 렌더링은 CalendarGrid에 위임합니다.
 */

function CalendarSection() {
  // 현재 보고 있는 연 / 월 상태
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());

  // 현재 월에 표시할 날짜 목록 (이전/다음 달 일부 포함)
  const calendarDates = getMonthDates(currentYear, currentMonth);

  // 날짜별 수업 데이터 (서버 데이터 연동 예정)
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
            lesson.lesson_index === lessonId
              ? { ...lesson, attendance_status: attendanceStatus }
              : lesson,
          ),
        };
      });

      return next;
    });
  };

  useEffect(() => {
    const fetchLessons = async () => {
      const response = await getLessons({
        year: currentYear,
        month: currentMonth + 1,
      });

      const data: CalendarData = response.days.reduce((acc, day) => {
        acc[day.date] = {
          date: day.date,
          lessons: day.lessons.map((lesson) => ({
            name: lesson.name,
            class_type:
              getClassTypeLabel(
                lesson.class_type as Parameters<typeof getClassTypeLabel>[0],
              ) || lesson.class_type,
            lesson_index: lesson.lesson_id,
            paid_at: '',
            attendance_status:
              lesson.attendance_status === 'notyet'
                ? null
                : lesson.attendance_status,
          })),
        };
        return acc;
      }, {} as CalendarData);

      setCalendarData(data);
    };

    fetchLessons();
  }, [currentYear, currentMonth]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleToday = () => {
    setCurrentMonth(dayjs().month());
    setCurrentYear(dayjs().year());
  };

  return (
    <div>
      {/* 캘린더 헤더 (월 이동, 오늘 버튼) */}
      <CalendarHeader
        year={currentYear}
        month={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />

      {/* 캘린더 본문 */}
      <CalendarGrid
        dates={calendarDates}
        dataMap={calendarData}
        onAttendanceUpdated={handleAttendanceUpdated}
      />
    </div>
  );
}

export default CalendarSection;

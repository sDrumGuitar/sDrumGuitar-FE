import dayjs from 'dayjs';
import type { CalendarDate } from '@/types/schedule';

/**
 * 특정 연도와 월의 달력 날짜 배열을 반환합니다.
 * @param year 연도
 * @param month 월 (0-11)
 * @returns CalendarDate[]
 * 예시 : generateCalendarDates(2026, 2) -> 2026년 3월의 달력 날짜 배열 반환
 */
export function generateCalendarDates(year: number, month: number): CalendarDate[] {
  const dates: CalendarDate[] = [];
  const firstDayOfMonth = dayjs().year(year).month(month).startOf('month');

  const startDate = firstDayOfMonth.startOf('week');

  for (let i = 0; i < 35; i++) {
    const date = startDate.add(i, 'day');
    dates.push({
      date: date.format('YYYY-MM-DD'),
      isCurrentMonth: date.month() === month,
    });
  }

  return dates;
}

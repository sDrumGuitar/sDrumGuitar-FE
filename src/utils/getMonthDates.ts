import dayjs from 'dayjs';
import type { CalendarDate } from '@/types/schedule';

export function getMonthDates(year: number, month: number): CalendarDate[] {
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

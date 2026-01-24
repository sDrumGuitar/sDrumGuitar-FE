import dayjs from 'dayjs';
import type { CalendarDate } from './types';

export function getMonthDates(year: number, month: number): CalendarDate[] {
  const dates: CalendarDate[] = [];
  const firstDayOfMonth = dayjs().year(year).month(month).startOf('month');

  // Use dayjs's startOf('week') to get the Sunday of the first week of the month.
  const startDate = firstDayOfMonth.startOf('week');

  // Generate 6 weeks (42 days) for the calendar grid
  for (let i = 0; i < 42; i++) {
    const date = startDate.add(i, 'day');
    dates.push({
      date: date.format('YYYY-MM-DD'),
      isCurrentMonth: date.month() === month,
    });
  }

  return dates;
}

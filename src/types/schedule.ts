import type { Lesson } from '@/types/lesson';

export type CalendarDay = {
  date: string; // '2026-11-05'
  lessons: Lesson[];
};

export type CalendarData = Record<string, CalendarDay>;

export type CalendarDate = {
  date: string; // YYYY-MM-DD
  isCurrentMonth: boolean;
};

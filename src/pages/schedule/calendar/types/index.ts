export type Lesson = {
  id: number;
  studentName: string;
  count: number; // 회차 (1회차, 2회차…)
  color: 'green' | 'orange' | 'red';
};

export type CalendarDay = {
  date: string; // '2026-11-05'
  lessons: Lesson[];
};

export type CalendarData = Record<string, CalendarDay>;

export type CalendarDate = {
  date: string; // YYYY-MM-DD
  isCurrentMonth: boolean;
};

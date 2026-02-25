import type { CalendarData } from '@/pages/schedule/calendar/types';

export const MockCalendarData: CalendarData = {
  '2026-02-01': {
    date: '2026-02-01',
    lessons: [
      {
        name: '김채린',
        class_type: '드럼',
        lesson_index: 1,
        paid_at: '2026-02-02',
        attendance_status: 'attended',
      },
      {
        name: '이민규',
        class_type: '기타',
        lesson_index: 2,
        paid_at: '2026-02-02',
        attendance_status: null,
      },
    ],
  },

  '2026-02-02': {
    date: '2026-02-02',
    lessons: [
      {
        name: '김광일',
        class_type: '기타',
        lesson_index: 1,
        paid_at: '2026-02-04',
        attendance_status: null,
      },
    ],
  },

  '2026-02-03': {
    date: '2026-02-03',
    lessons: [
      {
        name: '김광일',
        class_type: '기타',
        lesson_index: 2,
        paid_at: '2026-02-08',
        attendance_status: 'makeup',
      },
      {
        name: '박민지',
        class_type: '드럼',
        lesson_index: 3,
        paid_at: '2026-02-08',
        attendance_status: null,
      },
    ],
  },

  '2026-02-05': {
    date: '2026-02-11',
    lessons: [
      {
        name: '김현승',
        class_type: '드럼',
        lesson_index: 1,
        paid_at: '2026-02-11',
        attendance_status: 'rollover',
      },
      {
        name: '김채린',
        class_type: '드럼',
        lesson_index: 2,
        paid_at: '2026-02-11',
        attendance_status: null,
      },
    ],
  },
};

import type { CalendarData } from '@/pages/schedule/calendar/types';

export const MockCalendarData: CalendarData = {
  '2026-02-01': {
    date: '2026-02-01',
    lessons: [
      {
        id: 1,
        name: '김채린',
        class_type: '드럼',
        lesson_index: 1,
        paid_at: '2026-02-02',
        attendance_status: 'attended',
        lesson_tag: 'normal',
      },
      {
        id: 2,
        name: '이민규',
        class_type: '기타',
        lesson_index: 2,
        paid_at: '2026-02-02',
        attendance_status: null,
        lesson_tag: 'normal',
      },
    ],
  },

  '2026-02-02': {
    date: '2026-02-02',
    lessons: [
      {
        id: 3,
        name: '김광일',
        class_type: '기타',
        lesson_index: 1,
        paid_at: '2026-02-04',
        attendance_status: null,
        lesson_tag: 'normal',
      },
    ],
  },

  '2026-02-03': {
    date: '2026-02-03',
    lessons: [
      {
        id: 4,
        name: '김광일',
        class_type: '기타',
        lesson_index: 2,
        paid_at: '2026-02-08',
        attendance_status: 'makeup',
        lesson_tag: 'makeup',
      },
      {
        id: 5,
        name: '박민지',
        class_type: '드럼',
        lesson_index: 3,
        paid_at: '2026-02-08',
        attendance_status: null,
        lesson_tag: 'normal',
      },
    ],
  },

  '2026-02-05': {
    date: '2026-02-11',
    lessons: [
      {
        id: 6,
        name: '김현승',
        class_type: '드럼',
        lesson_index: 1,
        paid_at: '2026-02-11',
        attendance_status: 'rollover',
        lesson_tag: 'rollover',
      },
      {
        id: 7,
        name: '김채린',
        class_type: '드럼',
        lesson_index: 2,
        paid_at: '2026-02-11',
        attendance_status: null,
        lesson_tag: 'normal',
      },
    ],
  },
};

import type { Lesson } from '@/types/lesson';

export type LessonMapByDate = Record<string, Lesson[]>;

export const MockLessonMapByDate: LessonMapByDate = {
  '2026-01-01': [
    {
      name: '김채린',
      class_type: '드럼',
      lesson_index: 1,
      paid_at: '2026-01-02',
      attendance_status: null,
    },
    {
      name: '이민규',
      class_type: '기타',
      lesson_index: 2,
      paid_at: '2026-01-02',
      attendance_status: null,
    },
  ],

  '2026-01-02': [
    {
      name: '김광일',
      class_type: '기타',
      lesson_index: 1,
      paid_at: '2026-01-04',
      attendance_status: null,
    },
  ],

  '2026-01-03': [
    {
      name: '김광일',
      class_type: '기타',
      lesson_index: 2,
      paid_at: '2026-01-08',
      attendance_status: null,
    },
    {
      name: '박민지',
      class_type: '드럼',
      lesson_index: 3,
      paid_at: '2026-01-08',
      attendance_status: null,
    },
  ],

  '2026-01-4': [
    {
      name: '김현승',
      class_type: '드럼',
      lesson_index: 1,
      paid_at: '2026-01-11',
      attendance_status: null,
    },
    {
      name: '김채린',
      class_type: '드럼',
      lesson_index: 2,
      paid_at: '2026-01-11',
      attendance_status: null,
    },
  ],
};

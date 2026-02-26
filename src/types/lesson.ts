export interface Lesson {
  id: number;
  name: string;
  class_type: string;
  lesson_index: number;
  paid_at: string;
  attendance_status: string | null;
  lesson_tag: string;
}

export const ATTENDANCE_TYPE = new Map([
  ['attended', '출석'],
  ['absent', '결석'],
  ['makeup', '보강'],
  ['rollover', '이월'],
]);

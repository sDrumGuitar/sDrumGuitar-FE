export interface Lesson {
  id: number;
  name: string;
  class_type: string;
  lesson_index: number;
  paid_at: string;
  attendance_status: string | null;
  lesson_tag: string;
}

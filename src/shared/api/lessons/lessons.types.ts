// ====================
// 타입 정의
// ====================
export interface LessonItem {
  lesson_id: number;
  name: string;
  class_type: string;
  course_status: string;
  lesson_tag: string;
  attendance_status: string;
  before_at: string;
  start_at: string;
  lesson_index: number;
}

export interface LessonDay {
  date: string;
  lessons: LessonItem[];
}

export interface GetLessonsResponse {
  year: number;
  month: number;
  days: LessonDay[];
}

export interface GetLessonsProps {
  year: number;
  month: number;
}

export interface GetRolloverLessonsResponse {
  total_count: number;
  lessons: LessonItem[];
}

export interface UpdateLessonAttendancePayload {
  attendance_status: string;
}

export interface UpdateLessonAttendanceMakeUpPayload {
  makeup_start_at: string;
}

export interface CreateLessonRolloverPayload {
  start_at: string;
}

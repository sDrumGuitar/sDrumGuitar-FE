import type { Course, CourseSchedule } from '@/types/course';

// ====================
// API 응답/요청 타입
// ====================
export interface GetCoursesResponse {
  total_count: number;
  page: number;
  size: number;
  courses: Course[];
}

// ====================
// API Raw 모델
// ====================
export interface ApiCourse {
  course_id: number;
  student: {
    student_id: number;
    name: string;
    age_group: string;
    phone: string;
    parent_phone: string;
  };
  class_type: 'DRUM' | 'GUITAR' | null;
  start_date: string;
  status: 'ACTIVE' | 'PAUSED' | 'ENDED' | null;
  lesson_count: number;
  schedules: CourseSchedule[];
  invoice: {
    invoice_id: number;
    method: 'CARD' | 'CASH' | null;
    status: 'PAID' | 'UNPAID' | null;
    paid_at: string | null;
  } | null;
  created_at: string;
  updated_at: string;
}

// ====================
// API 응답 래퍼
// ====================
export interface GetCoursesApiResponse {
  total_count: number;
  page: number;
  size: number;
  courses: ApiCourse[];
}

// ====================
// API 요청 파라미터/페이로드
// ====================
export interface GetCoursesProps {
  page: number;
  size: number;
}

export interface CreateCoursePayload {
  student_id: number;
  class_type: string;
  family_discount: boolean;
  lesson_count: number;
  start_date: string;
  schedules: CourseSchedule[];
  invoice: {
    status: 'PAID' | 'UNPAID';
    method: 'CARD' | 'CASH' | null;
    paid_at: string | null;
  };
}

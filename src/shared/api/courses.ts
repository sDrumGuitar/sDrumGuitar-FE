import type { Course, CourseSchedule } from '@/types/course';
import { api } from './axios';

// ====================
// GET : 모든 수강 정보 불러오기
// ====================
interface GetCoursesResponse {
  total_count: number;
  page: number;
  size: number;
  courses: Course[];
}

interface GetCoursesProps {
  page: number;
  size: number;
}
export const getCourses = async ({
  page,
  size,
}: GetCoursesProps): Promise<GetCoursesResponse> => {
  try {
    const res = await api.get<Course[]>('/courses', {
      params: {
        _page: page,
        _limit: size,
      },
    });

    const courses = Array.isArray(res.data) ? res.data : [];

    return {
      total_count: Number(res.headers['x-total-count'] ?? courses.length),
      page,
      size,
      courses,
    };
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return {
      total_count: 0,
      page,
      size,
      courses: [],
    };
  }
};

interface CreateCoursePayload {
  student: {
    student_id: number;
    name: string;
  };
  class_type: string;
  lesson_count: number;
  start_date: string;
  schedules: CourseSchedule[];
  invoice: {
    status: 'paid' | null;
    method?: string;
    paid_at?: string;
  };
}
// ====================
// POST : 수강 정보 생성하기
// ====================
export const createCourse = async (
  payload: CreateCoursePayload,
): Promise<Course> => {
  const res = await api.post<Course>('/courses', payload);
  return res.data;
};

// ====================
// PUT : 수강 정보 수정하기
// ====================
export const updateCourse = async (
  id: number,
  payload: Partial<CreateCoursePayload>,
): Promise<Course> => {
  const res = await api.put<Course>(`/courses/${id}`, payload);
  return res.data;
};

import type { Course, CourseSchedule, MockCourse } from '@/types/course';
import { api } from './axios';
import { getStudent } from './students';

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
    const res = await api.get<MockCourse[]>('/courses', {});
    console.log(res);

    const mockCourses = Array.isArray(res.data) ? res.data : [];

    const courses: Course[] = await Promise.all(
      mockCourses.map(async (mockCourse) => {
        const { student } = await getStudent(mockCourse.student_id);

        if (!student) {
          throw new Error(`Student not found: ${mockCourse.student_id}`);
        }

        return {
          ...mockCourse,
          student: {
            student_id: student.id,
            name: student.name,
            age_group: student.age_group,
            phone: student.phone,
            parent_phone: student.parent_phone,
          },

          invoice: {
            invoice_id: 1,
            method: null,
            status: null,
            paid_at: '',
          },
        };
      }),
    );

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

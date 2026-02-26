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

interface ApiCourse {
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

interface GetCoursesApiResponse {
  total_count: number;
  page: number;
  size: number;
  courses: ApiCourse[];
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
    const res = await api.get<GetCoursesApiResponse>('/courses', {
      params: { page, size },
    });

    const payload = res.data;
    const courses = (payload?.courses ?? []).map<Course>((course) => ({
      id: course.course_id,
      student: {
        student_id: course.student.student_id,
        name: course.student.name,
        age_group: course.student.age_group
          ? (course.student.age_group.toLowerCase() as Course['student']['age_group'])
          : null,
        phone: course.student.phone,
        parent_phone: course.student.parent_phone,
      },
      class_type: course.class_type,
      start_date: course.start_date,
      status: course.status
        ? (course.status.toLowerCase() as Course['status'])
        : null,
      lesson_count: course.lesson_count,
      schedules: course.schedules ?? [],
      invoice: {
        invoice_id: course.invoice?.invoice_id ?? 0,
        method: course.invoice?.method
          ? (course.invoice.method.toLowerCase() as Course['invoice']['method'])
          : null,
        status:
          course.invoice?.status === 'PAID'
            ? 'paid'
            : course.invoice?.status === 'UNPAID'
              ? null
              : null,
        paid_at: course.invoice?.paid_at ?? '',
      },
      created_at: course.created_at,
      updated_at: course.updated_at,
    }));

    return {
      total_count: Number(payload?.total_count ?? courses.length),
      page: Number(payload?.page ?? page),
      size: Number(payload?.size ?? size),
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

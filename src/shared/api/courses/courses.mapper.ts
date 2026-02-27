import type { Course } from '@/types/course';
import type {
  ApiCourse,
  GetCoursesApiResponse,
  GetCoursesResponse,
} from './courses.types';

// ====================
// 단일 코스 매핑 유틸
// ====================
function toLowerOrNull<T extends string>(value: T | null) {
  return value ? (value.toLowerCase() as Lowercase<T>) : null;
}

function mapStudent(apiCourse: ApiCourse): Course['student'] {
  return {
    student_id: apiCourse.student.student_id,
    name: apiCourse.student.name,
    age_group: toLowerOrNull(apiCourse.student.age_group) as Course['student']['age_group'] | null,
    phone: apiCourse.student.phone,
    parent_phone: apiCourse.student.parent_phone,
  };
}

function mapInvoice(apiCourse: ApiCourse): Course['invoice'] {
  return {
    invoice_id: apiCourse.invoice?.invoice_id ?? 0,
    method: apiCourse.invoice?.method
      ? (apiCourse.invoice.method.toLowerCase() as Course['invoice']['method'])
      : null,
    status:
      apiCourse.invoice?.status === 'PAID'
        ? 'paid'
        : apiCourse.invoice?.status === 'UNPAID'
          ? null
          : null,
    paid_at: apiCourse.invoice?.paid_at ?? '',
  };
}

export function mapCourse(apiCourse: ApiCourse): Course {
  return {
    id: apiCourse.course_id,
    student: mapStudent(apiCourse),
    class_type: apiCourse.class_type,
    start_date: apiCourse.start_date,
    status: toLowerOrNull(apiCourse.status) as Course['status'] | null,
    lesson_count: apiCourse.lesson_count,
    schedules: apiCourse.schedules ?? [],
    invoice: mapInvoice(apiCourse),
    created_at: apiCourse.created_at,
    updated_at: apiCourse.updated_at,
  };
}

// ====================
// 목록 응답 매핑 유틸
// ====================
export function mapCoursesResponse(
  payload: GetCoursesApiResponse,
  fallback: { page: number; size: number },
): GetCoursesResponse {
  const courses = (payload?.courses ?? []).map(mapCourse);

  return {
    total_count: Number(payload?.total_count ?? courses.length),
    page: Number(payload?.page ?? fallback.page),
    size: Number(payload?.size ?? fallback.size),
    courses,
  };
}

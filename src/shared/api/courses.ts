import type { Course } from '@/types/course';
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
  const res = await api.get<Course[]>('/courses', {
    params: {
      _page: page,
      _limit: size,
    },
  });

  return {
    total_count: Number(res.headers['x-total-count'] ?? res.data.length),
    page,
    size,
    courses: res.data,
  };
};

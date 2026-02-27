import type { Course } from '@/types/course';
import { api } from '../axios';
import { mapCoursesResponse } from './courses.mapper';
import type {
  CreateCoursePayload,
  GetCoursesApiResponse,
  GetCoursesProps,
  GetCoursesResponse,
} from './courses.types';

// ====================
// GET : 모든 수강 정보 불러오기
// ====================
export const getCourses = async ({
  page,
  size,
}: GetCoursesProps): Promise<GetCoursesResponse> => {
  try {
    const res = await api.get<GetCoursesApiResponse>('/courses', {
      params: { page, size },
    });

    return mapCoursesResponse(res.data, { page, size });
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

import { api } from './axios';

// ====================
// GET : 월별 레슨 정보 불러오기
// ====================
export interface LessonItem {
  lesson_id: number;
  name: string;
  class_type: string;
  course_status: string;
  lesson_tag: string;
  attendance_status: string;
  start_at: string;
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

interface GetLessonsProps {
  year: number;
  month: number;
}

export const getLessons = async ({
  year,
  month,
}: GetLessonsProps): Promise<GetLessonsResponse> => {
  try {
    const res = await api.get<GetLessonsResponse>('/lessons', {
      params: { year, month },
    });

    return {
      year: res.data.year,
      month: res.data.month,
      days: Array.isArray(res.data.days) ? res.data.days : [],
    };
  } catch (error) {
    console.error('Failed to fetch lessons:', error);
    return { year, month, days: [] };
  }
};

// ====================
// PATCH : 출결 상태 수정
// ====================
export interface UpdateLessonAttendancePayload {
  attendance_status: string;
}

export const updateLessonAttendance = async (
  lessonId: number,
  payload: UpdateLessonAttendancePayload,
) => {
  const res = await api.patch(`/lessons/${lessonId}/attendance`, payload);
  return res.data;
};

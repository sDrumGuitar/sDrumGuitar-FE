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
  before_at: string;
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

// ====================
// GET : 월별 레슨 정보 불러오기
// ====================
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
// GET : 이월 레슨 정보 불러오기
// ====================

interface GetRolloverLessonsResponse {
  total_count: number;
  lessons: LessonItem[];
}
export const getRollOverLessons =
  async (): Promise<GetRolloverLessonsResponse> => {
    try {
      const res =
        await api.get<GetRolloverLessonsResponse>('/lessons/rollover');
      console.log('Roll-over lessons fetched:', res.data);
      return res.data;
    } catch (error) {
      console.error('Failed to fetch rolled-over lessons:', error);
      return { total_count: 0, lessons: [] };
    }
  };

// ====================
// PATCH : 출결 상태 수정 (출석, 결석, 이월)
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

// ====================
// PATCH : 출결 상태 수정 (보강)
// ====================
export interface UpdateLessonAttendanceMakeUpPayload {
  makeup_start_at: string;
}

export const updateLessonAttendanceMakeUp = async (
  lessonId: number,
  payload: UpdateLessonAttendanceMakeUpPayload,
) => {
  const res = await api.patch(`/lessons/${lessonId}/makeup`, payload);
  return res.data;
};

// ====================
// POST : 레슨 이월 등록
// ====================
export interface CreateLessonRolloverPayload {
  start_at: string;
}

export const createLessonRollover = async (
  lessonId: number,
  payload: CreateLessonRolloverPayload,
) => {
  const res = await api.post(`/lessons/${lessonId}/rollover`, payload);
  return res.data;
};

import type { Student } from '@/types/student';
import { api } from './axios';

// ====================
// GET : 모든 학생 정보 불러오기
// ====================
interface GetStudentsResponse {
  total_count: number;
  page: number;
  size: number;
  students: Student[];
}

interface GetStudentsProps {
  page: number;
  size: number;
}
export const getStudents = async ({
  page,
  size,
}: GetStudentsProps): Promise<GetStudentsResponse> => {
  try {
    const res = await api.get<Student[]>('/students', {
      // params: {
      //   _page: page,
      //   _limit: size,
      // },
    });

    const students = Array.isArray(res.data) ? res.data : [];

    return {
      total_count: Number(res.headers['x-total-count'] ?? students.length),
      page,
      size,
      students,
    };
  } catch (error) {
    console.error('Failed to fetch students:', error);
    return {
      total_count: 0,
      page,
      size,
      students: [],
    };
  }
};

interface GetStudentResponse {
  student: Student | null;
}

export const getStudent = async (
  student_id: number,
): Promise<GetStudentResponse> => {
  try {
    const res = await api.get<Student>(`/students/${student_id}`);
    return { student: res.data };
  } catch (error) {
    console.error('Failed to fetch student:', error);
    return { student: null };
  }
};

// ====================
// POST : 신규 학생 등록하기
// ====================
export interface CreateStudentPayload {
  name: string;
  age_group: string;
  phone: string;
  parent_phone: string;
  family_discount: boolean;
  memo: string;
}

export const createStudent = async (payload: CreateStudentPayload) => {
  const res = await api.post('/students', {
    ...payload,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  return res.data;
};

// ====================
// PATCH : 학생 정보 수정 (json-server 권장)
// ====================
export interface UpdateStudentPayload {
  name: string;
  age_group: Student['age_group'];
  phone: string;
  parent_phone: string;
  family_discount: boolean;
  memo: string;
}

export const updateStudent = async (
  studentId: number,
  payload: UpdateStudentPayload,
) => {
  const res = await api.put(`/students/${studentId}`, {
    ...payload,
    updated_at: new Date().toISOString(),
  });

  return res.data;
};

// ====================
// GET : 학생 이름으로 검색해서 정보 얻기
// ====================

export interface StudentSearchItem {
  id: number;
  name: string;
  phone?: string;
}

export const searchStudents = async (keyword: string) => {
  const response = await api.get<StudentSearchItem[]>('/students', {
    params: { keyword },
  });

  return response.data;
};

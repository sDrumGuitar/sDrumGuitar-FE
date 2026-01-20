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
  const res = await api.get<Student[]>('/students', {
    params: {
      _page: page,
      _limit: size,
    },
  });

  return {
    total_count: Number(res.headers['x-total-count'] ?? res.data.length),
    page,
    size,
    students: res.data,
  };
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

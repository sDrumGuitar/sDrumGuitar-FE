import type { Student } from '@/types/student';

// ====================
// 응답/요청 타입
// ====================
export interface GetStudentsResponse {
  total_count: number;
  page: number;
  size: number;
  students: Student[];
}

export interface GetStudentsProps {
  page: number;
  size: number;
}

export interface GetStudentResponse {
  student: Student | null;
}

// ====================
// POST : 신규 학생 등록하기
// ====================
export interface CreateStudentPayload {
  name: string;
  age_group: string;
  phone: string;
  parent_phone: string;
  // family_discount: boolean;
  memo: string;
}

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

// ====================
// GET : 학생 이름으로 검색해서 정보 얻기
// ====================
export interface StudentSearchItem {
  id: number;
  name: string;
  phone?: string;
}

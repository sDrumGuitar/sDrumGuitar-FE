import type { Student } from '@/types/student';
import { api } from '../axios';
import type {
  CreateStudentPayload,
  GetStudentResponse,
  GetStudentsProps,
  GetStudentsResponse,
  StudentSearchItem,
  UpdateStudentPayload,
} from './students.types';

export type {
  CreateStudentPayload,
  GetStudentResponse,
  GetStudentsProps,
  GetStudentsResponse,
  StudentSearchItem,
  UpdateStudentPayload,
} from './students.types';

// ====================
// GET : 모든 학생 정보 불러오기
// ====================
export const getStudents = async ({
  page,
  size,
}: GetStudentsProps): Promise<GetStudentsResponse> => {
  try {
    const res = await api.get<GetStudentsResponse>('/students', {
      params: { page, size },
    });
    const students = Array.isArray(res.data.students) ? res.data.students : [];

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
export const createStudent = async (payload: CreateStudentPayload) => {
  const res = await api.post('/students', {
    ...payload,
  });

  return res.data;
};

// ====================
// PATCH : 학생 정보 수정 (json-server 권장)
// ====================
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
export const searchStudents = async (name: string) => {
  const trimmed = name.trim();
  if (!trimmed) {
    return { students: [], notFound: false };
  }

  try {
    const response = await api.get<
      {
        studentId?: number | string;
        studentID?: number | string;
        student_id?: number | string;
        id?: number | string;
        name?: string;
        phone?: string;
      }[]
    >('/students/studentsInfo', {
      params: { name: trimmed },
    });

    const students = response.data.flatMap((student): StudentSearchItem[] => {
      const rawId =
        student.studentId ??
        student.studentID ??
        student.student_id ??
        student.id;
      const id = Number(rawId);
      if (!Number.isFinite(id)) {
        return [];
      }
      return [
        {
          id,
          name: student.name ?? '',
          phone: student.phone,
        },
      ];
    });

    return { students, notFound: false };
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const response = (error as { response?: { status?: number } }).response;
      if (response?.status === 404) {
        return { students: [], notFound: true };
      }
    }
    console.error('Failed to search students:', error);
    return { students: [], notFound: false };
  }
};

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

interface StudentApiResponse {
  student_id?: number;
  studentId?: number;
  name: string;
  age_group?: Student['age_group'];
  ageGroup?: Student['age_group'];
  phone?: string | null;
  parent_phone?: string | null;
  parentPhone?: string | null;
  memo?: string | null;
  family_discount?: boolean;
  familyDiscount?: boolean;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

const normalizeStudentResponse = (student: StudentApiResponse): Student => {
  const studentId = student.student_id ?? student.studentId;
  if (studentId == null) {
    throw new Error('Student ID is missing in the API response.');
  }

  return {
    student_id: Number(studentId),
    name: student.name,
    age_group: (student.age_group ?? student.ageGroup ?? 'adult') as Student['age_group'],
    phone: student.phone ?? '',
    parent_phone: student.parent_phone ?? student.parentPhone ?? '',
    memo: student.memo ?? null,
    family_discount: Boolean(student.family_discount ?? student.familyDiscount),
    created_at: student.created_at ?? student.createdAt ?? '',
    updated_at: student.updated_at ?? student.updatedAt ?? '',
  };
};

const normalizeAgeGroupForRequest = (ageGroup: Student['age_group']) =>
  String(ageGroup).toLowerCase() as Student['age_group'];

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
      total_count: Number(
        res.data.total_count ??
          res.headers['x-total-count'] ??
          students.length,
      ),
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
// PATCH : 학생 정보 수정
// ====================
export const updateStudent = async (
  studentId: number,
  payload: UpdateStudentPayload,
) => {
  const { family_discount, ...rest } = payload;
  const res = await api.patch<StudentApiResponse>(`/students/${studentId}`, {
    ...rest,
    age_group: normalizeAgeGroupForRequest(rest.age_group),
    family_discount,
    familyDiscount: family_discount,
  });

  return normalizeStudentResponse(res.data);
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

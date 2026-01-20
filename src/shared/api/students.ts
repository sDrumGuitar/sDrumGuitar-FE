import type { Student } from '@/types/student';
import { api } from './axios';

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

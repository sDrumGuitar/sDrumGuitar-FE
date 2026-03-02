import { useEffect, useMemo, useState } from 'react';
import { getStudents } from '@/shared/api/students';
import type { Student } from '@/types/student';

interface StudentsSummary {
  totalCount: number;
  students: Student[];
  isLoading: boolean;
}

export const useStudentsSummary = () => {
  const [summary, setSummary] = useState<StudentsSummary>({
    totalCount: 0,
    students: [],
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchStudents = async () => {
      const data = await getStudents({ page: 1, size: 3 });
      if (!isMounted) return;
      setSummary({
        totalCount: data.total_count,
        students: data.students,
        isLoading: false,
      });
    };

    fetchStudents();

    return () => {
      isMounted = false;
    };
  }, []);

  return useMemo(() => summary, [summary]);
};

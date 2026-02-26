import { useEffect, useState } from 'react';
import { api } from '@/shared/api/axios';
import type { Student } from '@/types/student';

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/students');
        if (response.data.students && response.data.students.length > 0) {
          setStudents(response.data.students);
        }
      } catch (error) {
        console.error('Failed to fetch student:', error);
      }
    };

    fetchStudents();
  }, []);

  return { students };
};

import { useEffect, useState } from 'react';
import ButtonSection from './components/ButtonSection';
import TableSection from './components/TableSection';
import { getStudents } from '@/shared/api/students';
import type { Student } from '@/types/student';
import { useStudentModalStore } from '@/store/studentModalStore';
import StudentModal from './components/modal/StudentModal';

function StudentPage() {
  const { isOpen } = useStudentModalStore();
  const [students, setStudents] = useState<Student[]>([]);

  const loadStudents = async () => {
    const { students } = await getStudents({ page: 1, size: 20 });
    setStudents(students);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div>
      <ButtonSection />
      <TableSection students={students} />
      {isOpen && <StudentModal onSuccess={loadStudents} />}
    </div>
  );
}

export default StudentPage;

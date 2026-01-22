import { useEffect, useState } from 'react';
import TableSection from './components/TableSection';
import { getStudents } from '@/shared/api/students';
import type { Student } from '@/types/student';
import { useStudentModalStore } from '@/store/studentModalStore';
import StudentModal from './components/modal/StudentModal';
import ModalOpenButton from '@/shared/modal/ModalOpenButton';

function StudentPage() {
  const { isOpen } = useStudentModalStore();
  const [students, setStudents] = useState<Student[]>([]);

  const loadStudents = async () => {
    const { students } = await getStudents({ page: 1, size: 20 });
    setStudents(students);
  };

  const openCreate = useStudentModalStore((state) => state.openCreate);

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div>
      <ModalOpenButton text="신규학생 추가" openModal={openCreate} />
      <TableSection students={students} />
      {isOpen && <StudentModal onSuccess={loadStudents} />}
    </div>
  );
}

export default StudentPage;

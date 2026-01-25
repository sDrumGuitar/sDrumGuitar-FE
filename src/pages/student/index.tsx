import { useEffect, useState } from 'react';
import TableSection from '../../shared/modal/TableSection';
import { getStudents } from '@/shared/api/students';
import type { Student } from '@/types/student';
import { useStudentModalStore } from '@/store/studentModalStore';
import StudentModal from './components/modal/StudentModal';
import ModalOpenButton from '@/shared/modal/ModalOpenButton';
import InvoiceListModal from './components/modal/InvoiceListModal';

function StudentPage() {
  const { isOpen, openCreate, openDetail } = useStudentModalStore();
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
      <ModalOpenButton text="신규학생 추가" openModal={openCreate} />

      <TableSection<Student>
        dataList={students}
        headers={['이름', '구분', '전화번호', '부모님 전화번호']}
        getRows={(list) =>
          list.map((student) => [
            student?.name,
            student?.age_group,
            student?.phone,
            student?.parent_phone,
          ])
        }
        onRowClick={(student) => openDetail(student)}
      />

      {isOpen && <StudentModal onSuccess={loadStudents} />}

      <InvoiceListModal />
    </div>
  );
}

export default StudentPage;

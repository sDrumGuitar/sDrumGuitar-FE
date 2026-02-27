import { useEffect, useState } from 'react';
import TableSection from '../../shared/modal/TableSection';
import { getStudents } from '@/shared/api/students';
import type { Student } from '@/types/student';
import { useStudentModalStore } from '@/store/studentModalStore';
import StudentModal from './components/StudentDetailModal';
import ModalOpenButton from '@/shared/modal/ModalOpenButton';
import { getAgeGroupLabel } from '@/utils/getAgeGroupLabel';
import InvoiceListModal from './components/InvoiceListModal';

// 학생 관리 페이지 컴포넌트
function StudentPage() {
  // 학생 모달 상태 관리
  const { isOpen, openCreate, openDetail } = useStudentModalStore();
  // 학생 목록 상태 관리
  const [students, setStudents] = useState<Student[]>([]);

  // 학생 목록을 API에서 불러오는 함수
  const loadStudents = async () => {
    const { students } = await getStudents({ page: 1, size: 20 });
    setStudents(students);
  };

  // 컴포넌트가 마운트될 때 학생 목록 불러오기
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadStudents();
  }, []);

  return (
    <div>
      {/* 1. 헤더 */}
      <ModalOpenButton text="신규학생 추가" openModal={openCreate} />

      {/* 2. 테이블 */}
      <TableSection<Student>
        dataList={students}
        headers={['이름', '구분', '전화번호', '부모님 전화번호']}
        getRows={(students) => {
          if (!students || students.length === 0) return [];
          return students.map((student) => [
            student?.name,
            getAgeGroupLabel(student?.age_group),
            student?.phone,
            student?.parent_phone,
          ]);
        }}
        onRowClick={(student) => openDetail(student)}
      />

      {/* 3-1. 학생 상세 모달 */}
      {isOpen && <StudentModal onSuccess={loadStudents} />}
      {/* 3-2. 청구서 목록 모달 */}
      <InvoiceListModal />
    </div>
  );
}

export default StudentPage;

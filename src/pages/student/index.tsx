import TableSection from '../../shared/modal/TableSection';
import { getStudents } from '@/shared/api/students';
import type { Student } from '@/types/student';
import { useStudentModalStore } from '@/store/student/studentModalStore';
import StudentModal from './components/StudentDetailModal';
import ModalOpenButton from '@/shared/modal/ModalOpenButton';
import { getAgeGroupLabel } from '@/utils/student/getAgeGroupLabel';
import InvoiceListModal from './components/InvoiceListModal';
import Chip from '@/shared/chip/Chip';
import RefreshButton from '@/shared/button/RefreshButton';
import { useQuery } from '@tanstack/react-query';

const getAgeGroupTone = (ageGroup: Student['age_group'] | null) => {
  const normalized = ageGroup ? String(ageGroup).toUpperCase() : '';
  switch (normalized) {
    case 'PRESCHOOL':
      return 'amber';
    case 'ELEMENT':
    case 'ELEMENTARY':
      return 'sky';
    case 'MIDDLE':
      return 'indigo';
    case 'ADULT':
      return 'emerald';
    case 'HIGH':
    default:
      return 'slate';
  }
};

// 학생 관리 페이지 컴포넌트
function StudentPage() {
  // 학생 모달 상태 관리
  const { isOpen, openCreate, openDetail } = useStudentModalStore();
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['students', { page: 1, size: 20 }],
    queryFn: () => getStudents({ page: 1, size: 20 }),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: (query) => query.isStale(),
  });

  const students = data?.students ?? [];

  return (
    <div>
      {/* 1. 헤더 */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <ModalOpenButton text="신규학생 추가" openModal={openCreate} />
        <RefreshButton
          onRefresh={async () => refetch()}
          isRefreshingExternal={isFetching}
        />
      </div>

      {/* 2. 테이블 */}
      <TableSection<Student>
        dataList={students}
        headers={['이름', '구분', '전화번호', '부모님 전화번호']}
        getRows={(students) => {
          if (!students || students.length === 0) return [];
          return students.map((student) => {
            const ageGroupLabel = getAgeGroupLabel(student?.age_group);
            return [
              student?.name,
              ageGroupLabel ? (
                <Chip
                  label={ageGroupLabel}
                  tone={getAgeGroupTone(student?.age_group)}
                />
              ) : (
                ''
              ),
              student?.phone,
              student?.parent_phone,
            ];
          });
        }}
        onRowClick={(student) => openDetail(student)}
      />

      {/* 3-1. 학생 상세 모달 */}
      {isOpen && <StudentModal onSuccess={refetch} />}
      {/* 3-2. 청구서 목록 모달 */}
      <InvoiceListModal />
    </div>
  );
}

export default StudentPage;

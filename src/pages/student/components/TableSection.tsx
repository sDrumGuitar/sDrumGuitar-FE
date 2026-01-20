import Table from '@/shared/table/Table';
import { useStudentModalStore } from '@/store/studentModalStore';
import type { Student } from '@/types/student';

interface TableSectionProps {
  students: Student[];
}

function TableSection({ students }: TableSectionProps) {
  const openDetail = useStudentModalStore((state) => state.openDetail);

  const rows = students.map((student) => [
    student.name,
    student.age_group,
    student.phone,
    student.parent_phone,
  ]);

  const handleRowClick = (rowIndex: number) => {
    const student = students[rowIndex];
    if (!student) return;
    openDetail(student);
  };

  const tableHeaders = ['이름', '구분', '전화번호', '부모님 전화번호'];

  return (
    <Table headers={tableHeaders} rows={rows} onRowClick={handleRowClick} />
  );
}

export default TableSection;

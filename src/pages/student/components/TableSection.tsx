import { useEffect, useState } from 'react';
import Table from '@/shared/table/Table';
import { getStudents } from '@/shared/api/students';
import { useStudentModalStore } from '@/store/studentModalStore';
import type { Student } from '@/types/student';

function TableSection() {
  const [students, setStudents] = useState<Student[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const openDetail = useStudentModalStore((state) => state.openDetail);

  useEffect(() => {
    const loadStudents = async () => {
      const { students } = await getStudents({ page: 1, size: 10 });

      setStudents(students);
      setRows(
        students.map((student) => [
          student.name,
          student.age_group,
          student.phone,
          student.parent_phone,
        ]),
      );
    };

    loadStudents();
  }, []);

  const handleRowClick = (rowIndex: number) => {
    const student = students[rowIndex];
    if (!student) return;

    openDetail(student);
  };

  return (
    <Table headers={tableHeaders} rows={rows} onRowClick={handleRowClick} />
  );
}

const tableHeaders = ['이름', '구분', '전화번호', '부모님 전화번호'];

export default TableSection;

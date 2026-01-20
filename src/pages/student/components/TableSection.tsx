import { useEffect, useState } from 'react';
import Table from '@/shared/table/Table';
import { getStudents } from '@/shared/api/students';

function TableSection() {
  const [rows, setRows] = useState<string[][]>([]);

  useEffect(() => {
    const loadStudents = async () => {
      try {
        // 학생 정보 불러오기
        const { students } = await getStudents({ page: 1, size: 10 });

        // 학생 정보 배열로 만들기
        const tableRows = students.map((student) => [
          student.name,
          student.age_group,
          student.phone,
          student.parent_phone,
        ]);

        // 학생 정보 rows에 저장하기
        setRows(tableRows);
      } catch (error) {
        console.error('학생 목록 조회 실패', error);
      }
    };

    loadStudents();
  }, []);

  return <Table headers={tableHeaders} rows={rows} />;
}

const tableHeaders = ['이름', '구분', '전화번호', '부모님 전화번호'];

export default TableSection;

import { api } from '@/shared/api/axios';
import TableSection from '@/shared/modal/TableSection';
import type { Student } from '@/types/student';
import { getAgeGroupLabel } from '@/utils/getAgeGroupLabel';
import { useEffect, useState } from 'react';

function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    // 학생 데이터 불러오기 (예시)
    const fetchStudent = async () => {
      try {
        const response = await api.get('/students');
        if (response.data.students && response.data.students.length > 0) {
          setStudents(response.data.students); // 전체 학생 데이터 사용
        }
      } catch (error) {
        console.error('Failed to fetch student:', error);
      }
    };

    fetchStudent();
  }, []);

  return (
    <div className="w-full">
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-bold text-gray-900">학생 목록</p>
            <p className="text-xs text-gray-500">
              발송 대상을 선택할 수 있어요.
            </p>
          </div>
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
            총 {students.length}명
          </span>
        </div>
        <div className="overflow-x-auto">
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
          />
        </div>
      </div>
    </div>
  );
}

export default StudentList;

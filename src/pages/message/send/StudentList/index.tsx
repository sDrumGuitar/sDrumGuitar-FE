import { api } from '@/shared/api/axios';
import TableSection from '@/shared/modal/TableSection';
import { useMessageSendStore } from '@/store/messageSendStore';
import NormalButton from '@/shared/button/NormalButton';
import type { Student } from '@/types/student';
import { getAgeGroupLabel } from '@/utils/getAgeGroupLabel';
import { useEffect, useState } from 'react';

function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const {
    toggleStudent,
    isSelected,
    selectedStudents,
    clearStudents,
    setSelectedStudents,
  } = useMessageSendStore();

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
      <div className="mb-4 flex flex-col  justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-gray-900">학생 목록</p>
          <p className="text-xs text-gray-500">발송 대상을 선택할 수 있어요.</p>
        </div>
        <div className="flex items-center gap-2 justify-between">
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
            선택 {selectedStudents.length} / 총 {students.length}명
          </span>
          <div className="flex gap-2">
            <NormalButton
              text="전체 선택"
              onClick={() => setSelectedStudents(students)}
              className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
              disabled={students.length === 0}
            />
            <NormalButton
              text="전체 취소"
              onClick={clearStudents}
              className="bg-black text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
              disabled={selectedStudents.length === 0}
            />
          </div>
        </div>
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
          onRowClick={(student) => toggleStudent(student)}
          getRowClassName={(student) =>
            isSelected(student)
              ? 'row-selected bg-primary/10 text-primary font-semibold'
              : ''
          }
        />
      </div>
    </div>
  );
}

export default StudentList;

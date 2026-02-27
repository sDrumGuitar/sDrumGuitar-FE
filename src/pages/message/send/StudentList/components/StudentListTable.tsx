import TableSection from '@/shared/modal/TableSection';
import type { Student } from '@/types/student';
import { getAgeGroupLabel } from '@/utils/student/getAgeGroupLabel';

interface StudentListTableProps {
  students: Student[];
  isSelected: (student: Student) => boolean;
  onToggleStudent: (student: Student) => void;
}

function StudentListTable({
  students,
  isSelected,
  onToggleStudent,
}: StudentListTableProps) {
  return (
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
        onRowClick={(student) => onToggleStudent(student)}
        getRowClassName={(student) =>
          isSelected(student)
            ? 'row-selected bg-primary/10 text-primary font-semibold'
            : ''
        }
      />
    </div>
  );
}

export default StudentListTable;

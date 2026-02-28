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
    <div>
      <div className="space-y-3 md:hidden">
        {students.length === 0 ? (
          <div className="rounded-lg border border-dashed border-gray-200 py-10 text-center text-sm text-gray-500">
            조회 내용이 없습니다.
          </div>
        ) : (
          students.map((student) => {
            const selected = isSelected(student);
            return (
              <div
                key={student.student_id}
                onClick={() => onToggleStudent(student)}
                className={`rounded-xl border p-3 transition ${
                  selected
                    ? 'border-primary/40 bg-primary/5'
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {student.name}
                    </p>
                    <span className="mt-1 inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-600">
                      {getAgeGroupLabel(student.age_group)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onToggleStudent(student);
                    }}
                    className={`h-8 rounded-full px-3 text-xs font-semibold transition ${
                      selected
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {selected ? '선택됨' : '선택'}
                  </button>
                </div>
                <div className="mt-3 space-y-1 text-xs text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>학생</span>
                    <span className="font-medium text-gray-700">
                      {student.phone}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>부모님</span>
                    <span className="font-medium text-gray-700">
                      {student.parent_phone}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="hidden md:block overflow-x-auto">
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
    </div>
  );
}

export default StudentListTable;

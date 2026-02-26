import { useMessageSendStore } from '@/store/messageSendStore';
import StudentListHeader from './components/StudentListHeader';
import StudentListTable from './components/StudentListTable';
import { useStudents } from './hooks/useStudents';

function StudentList() {
  const { students } = useStudents();
  const {
    toggleStudent,
    isSelected,
    selectedStudents,
    clearStudents,
    setSelectedStudents,
  } = useMessageSendStore();

  return (
    <div className="w-full">
      <StudentListHeader
        totalCount={students.length}
        selectedCount={selectedStudents.length}
        onSelectAll={() => setSelectedStudents(students)}
        onClearAll={clearStudents}
      />
      <StudentListTable
        students={students}
        isSelected={isSelected}
        onToggleStudent={toggleStudent}
      />
    </div>
  );
}

export default StudentList;

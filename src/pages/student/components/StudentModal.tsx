import { useStudentModalStore } from '@/store/studentModalStore';

function StudentModal() {
  const { mode, selectedStudent, close } = useStudentModalStore();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <button onClick={close}>닫기</button>

        {mode === 'CREATE' && <div>학생 추가 폼</div>}

        {mode === 'DETAIL' && selectedStudent && (
          <div>
            <p>이름: {selectedStudent.name}</p>
            <p>구분: {selectedStudent.age_group}</p>
            <p>전화번호: {selectedStudent.phone}</p>
            <p>부모님 전화번호: {selectedStudent.parent_phone}</p>
            <p>가족 할인: {selectedStudent.family_discount}</p>
            <p>메모: {selectedStudent.memo}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentModal;

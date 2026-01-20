import { useStudentModalStore } from '@/store/studentModalStore';
import ModalWrapper from '@/shared/modal/ModalWrapper';

function StudentModal() {
  const { mode, selectedStudent, close } = useStudentModalStore();

  const handleCloseRequest = () => {
    // CREATE / UPDATE는 confirm 필요
    if (mode === 'CREATE' || mode === 'UPDATE') {
      const confirmed = window.confirm(
        '작성 중인 내용이 사라집니다. 정말 닫으시겠습니까?',
      );

      if (!confirmed) return;
    }

    close();
  };

  return (
    <ModalWrapper onClose={handleCloseRequest}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">
          {mode === 'CREATE' ? '신규 학생 추가' : '학생 상세'}
        </h2>
        <button onClick={close}>닫기</button>
      </div>

      {mode === 'CREATE' && (
        <div>
          {/* 학생 추가 폼 */}
          학생 추가 폼
        </div>
      )}

      {mode === 'DETAIL' && selectedStudent && (
        <div className="space-y-2">
          <p>이름: {selectedStudent.name}</p>
          <p>구분: {selectedStudent.age_group}</p>
          <p>전화번호: {selectedStudent.phone}</p>
          <p>부모님 전화번호: {selectedStudent.parent_phone}</p>
          <p>가족 할인: {selectedStudent.family_discount ? 'O' : 'X'}</p>
          {selectedStudent.memo && <p>메모: {selectedStudent.memo}</p>}
        </div>
      )}
    </ModalWrapper>
  );
}

export default StudentModal;

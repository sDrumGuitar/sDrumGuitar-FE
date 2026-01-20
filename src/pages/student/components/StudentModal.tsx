import { useStudentModalStore } from '@/store/studentModalStore';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import StudentCreateForm from './StudentCreateForm';
import StudentDetailView from './StudentDetailView';

function StudentModal() {
  const { mode, selectedStudent, close } = useStudentModalStore();

  const handleCloseRequest = () => {
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
          {mode === 'CREATE' && '신규 학생 등록'}
          {mode === 'DETAIL' && '학생 상세'}
        </h2>
        <button onClick={close}>닫기</button>
      </div>

      {mode === 'CREATE' && <StudentCreateForm />}
      {mode === 'DETAIL' && selectedStudent && (
        <StudentDetailView student={selectedStudent} />
      )}
    </ModalWrapper>
  );
}

export default StudentModal;

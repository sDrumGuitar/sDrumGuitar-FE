import { useStudentModalStore } from '@/store/studentModalStore';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import StudentCreateForm from './StudentCreateForm';
import StudentDetailView from './StudentDetailView';
import { useState } from 'react';

interface StudentModalProps {
  onSuccess: () => void;
}
function StudentModal({ onSuccess }: StudentModalProps) {
  const { mode, selectedStudent, close } = useStudentModalStore();
  const [isDirty, setIsDirty] = useState(false);

  const handleCloseRequest = () => {
    if ((mode === 'CREATE' || mode === 'UPDATE') && isDirty) {
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
        <button onClick={handleCloseRequest}>닫기</button>
      </div>

      {mode === 'CREATE' && (
        <StudentCreateForm onDirtyChange={setIsDirty} onSuccess={onSuccess} />
      )}
      {mode === 'DETAIL' && selectedStudent && (
        <StudentDetailView
          onDirtyChange={setIsDirty}
          student={selectedStudent}
          onSuccess={onSuccess}
        />
      )}
    </ModalWrapper>
  );
}

export default StudentModal;

import { useStudentModalStore } from '@/store/studentModalStore';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import StudentCreateForm from './components/StudentCreateForm';
import StudentDetailView from './components/StudentDetailView';
import { useState } from 'react';

interface StudentModalProps {
  onSuccess: () => void;
}

// 학생 상세 모달 컴포넌트
function StudentModal({ onSuccess }: StudentModalProps) {
  // 학생 모달 상태 관리
  const { mode, selectedStudent, close } = useStudentModalStore();
  // 모달이 'CREATE' 모드인지 여부
  const [isDirty, setIsDirty] = useState(false);

  // 모달 닫기 요청 핸들러
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
      {/* 1. 모달 헤더 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">
          {mode === 'CREATE' && '신규 학생 등록'}
          {mode === 'DETAIL' && '학생 상세'}
          {mode === 'UPDATE' && '학생 상세 수정'}
        </h2>
        <button onClick={handleCloseRequest}>닫기</button>
      </div>

      {/*  2. 모달 본문 - 모드에 따라 다른 컴포넌트 렌더링 */}
      {mode === 'CREATE' && (
        <StudentCreateForm onDirtyChange={setIsDirty} onSuccess={onSuccess} />
      )}
      {(mode === 'DETAIL' || mode === 'UPDATE') && selectedStudent && (
        <StudentDetailView
          student={selectedStudent}
          onDirtyChange={setIsDirty}
          onSuccess={onSuccess}
        />
      )}
    </ModalWrapper>
  );
}

export default StudentModal;

import { useCourseModalStore } from '@/store/courseModalStore';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import CourseForm from './CourseForm';
import { useState } from 'react';

interface CourseModalProps {
  onSuccess: () => void;
}
function CourseModal({ onSuccess }: CourseModalProps) {
  const { mode, close } = useCourseModalStore();
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

  const title =
    mode === 'CREATE'
      ? '수강 생성'
      : mode === 'DETAIL'
      ? '수강 상세'
      : '수강 수정';

  return (
    <ModalWrapper onClose={handleCloseRequest}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <button onClick={handleCloseRequest}>닫기</button>
      </div>

      <CourseForm onDirtyChange={setIsDirty} onSuccess={onSuccess} />
    </ModalWrapper>
  );
}

export default CourseModal;

import { useCourseModalStore } from '@/store/course/courseModalStore';
import ConfirmModal from '@/shared/modal/ConfirmModal';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import CourseForm from './CourseForm';
import { useState } from 'react';

interface CourseModalProps {
  onSuccess: () => void;
}
function CourseModal({ onSuccess }: CourseModalProps) {
  const { mode, close } = useCourseModalStore();
  const [isDirty, setIsDirty] = useState(false);
  const [isCloseConfirmOpen, setIsCloseConfirmOpen] = useState(false);

  const handleCloseRequest = () => {
    if ((mode === 'CREATE' || mode === 'UPDATE') && isDirty) {
      setIsCloseConfirmOpen(true);
      return;
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

      <ConfirmModal
        isOpen={isCloseConfirmOpen}
        title="작성 중인 내용이 사라집니다."
        description="정말 닫으시겠습니까?"
        confirmText="닫기"
        cancelText="취소"
        isDanger
        onConfirm={close}
        onCancel={() => setIsCloseConfirmOpen(false)}
      />
    </ModalWrapper>
  );
}

export default CourseModal;

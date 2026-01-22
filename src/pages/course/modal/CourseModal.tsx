import { useCourseModalStore } from '@/store/courseModalStore';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import CourseCreateForm from './CourseCreateForm';
// import CourseDetailView from './CourseDetailView';
import { useState } from 'react';

interface CourseModalProps {
  onSuccess: () => void;
}
function CourseModal({ onSuccess }: CourseModalProps) {
  const { mode, selectedCourse, close } = useCourseModalStore();
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
          {mode === 'CREATE' && '신규 수강 등록'}
          {mode === 'DETAIL' && '수강 상세'}
          {mode === 'UPDATE' && '수강 상세 수정'}
        </h2>
        <button onClick={handleCloseRequest}>닫기</button>
      </div>

      {mode === 'CREATE' && (
        <CourseCreateForm onDirtyChange={setIsDirty} onSuccess={onSuccess} />
      )}
      {/* {(mode === 'DETAIL' || mode === 'UPDATE') && selectedCourse && (
        <CourseDetailView
          course={selectedCourse}
          onDirtyChange={setIsDirty}
          onSuccess={onSuccess}
        />
      )} */}
    </ModalWrapper>
  );
}

export default CourseModal;

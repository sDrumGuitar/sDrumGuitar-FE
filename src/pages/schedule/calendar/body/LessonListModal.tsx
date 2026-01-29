import ModalWrapper from '@/shared/modal/ModalWrapper';
import { useLessonModalStore } from '@/store/lessonModalStore';

export default function LessonListModal() {
  const { close, selectedDate } = useLessonModalStore();
  return (
    <ModalWrapper onClose={close}>
      <p>{selectedDate} 회차 정보</p>
    </ModalWrapper>
  );
}

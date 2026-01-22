import ModalOpenButton from '@/shared/modal/ModalOpenButton';
import { useCourseModalStore } from '@/store/courseModalStore';

function CoursePage() {
  const openCreate = useCourseModalStore((state) => state.openCreate);
  return (
    <div>
      <ModalOpenButton text="신규수업 추가" openModal={openCreate} />
    </div>
  );
}
export default CoursePage;

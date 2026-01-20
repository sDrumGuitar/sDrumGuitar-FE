import NormalButton from '@/shared/button/NormalButton';
import { useStudentModalStore } from '@/store/studentModalStore';

function ButtonSection() {
  const openCreate = useStudentModalStore((state) => state.openCreate);
  return (
    <div className="flex justify-end mb-4">
      <NormalButton text="신규학생 추가" onClick={openCreate} />
    </div>
  );
}

export default ButtonSection;

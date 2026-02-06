import ModalWrapper from '@/shared/modal/ModalWrapper';
import { useCarryModalStore } from '@/store/carryModalStore';
// import AttendanceButtonList from './AttendanceButtonList';

export default function CarryListModal() {
  const { close } = useCarryModalStore();
  return (
    <ModalWrapper onClose={close}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">이월 목록</h2>
        <button onClick={close}>닫기</button>
      </div>
    </ModalWrapper>
  );
}

import NormalButton from '@/shared/button/NormalButton';
import { useCarryModalStore } from '@/store/carryModalStore';
import CarryListModal from './CarryListModal/CarryListModal';

function CarryListSection() {
  const { open, isOpen } = useCarryModalStore();
  return (
    <div>
      <NormalButton text="이월 목록" onClick={open} />
      {isOpen && <CarryListModal />}
    </div>
  );
}
export default CarryListSection;

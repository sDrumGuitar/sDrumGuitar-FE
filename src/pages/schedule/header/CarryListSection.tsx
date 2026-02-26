import NormalButton from '@/shared/button/NormalButton';
import { useCarryModalStore } from '@/store/carryModalStore';
import CarryListModal from './CarryListModal/CarryListModal';

interface CarryListSectionProps {
  onRefreshLessons: () => Promise<void>;
}

function CarryListSection({ onRefreshLessons }: CarryListSectionProps) {
  const { open, isOpen } = useCarryModalStore();
  return (
    <div>
      <NormalButton text="이월 목록" onClick={open} />
      {isOpen && <CarryListModal onRefreshLessons={onRefreshLessons} />}
    </div>
  );
}
export default CarryListSection;

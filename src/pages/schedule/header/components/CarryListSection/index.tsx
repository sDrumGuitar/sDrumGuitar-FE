import NormalButton from '@/shared/button/NormalButton';
import { useCarryModalStore } from '@/store/carryModalStore';
import CarryListModal from './components/CarryListModal';

interface CarryListSectionProps {
  onRefreshLessons: () => Promise<void>;
}
// 이월 목록 버튼과 모달을 포함하는 헤더의 오른쪽 섹션 컴포넌트
function CarryListSection({ onRefreshLessons }: CarryListSectionProps) {
  const { open, isOpen } = useCarryModalStore();
  return (
    <div>
      {/* 1. 이월 목록 버튼 */}
      <NormalButton text="이월 목록" onClick={open} />

      {/* 2. 이월 목록 모달 */}
      {isOpen && <CarryListModal onRefreshLessons={onRefreshLessons} />}
    </div>
  );
}
export default CarryListSection;

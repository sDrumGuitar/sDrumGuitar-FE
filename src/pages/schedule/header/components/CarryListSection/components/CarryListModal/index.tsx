import CalendarModal from '@/shared/form/CalendarModal';
import TimeModal from '@/shared/form/TimeModal';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import CarryListModalHeader from './components/CarryListModalHeader';
import CarryListTable from './components/CarryListTable';
import { useCarryList } from './hooks/useCarryList';
import { useCarryRegister } from './hooks/useCarryRegister';
import { useCarryModalStore } from '@/store/schedule/carryModalStore';

interface CarryListModalProps {
  onRefreshLessons: () => Promise<void>;
}

// 이월 목록 모달 컴포넌트 - 이월된 레슨 목록과 날짜/시간 선택 기능을 포함
export default function CarryListModal({
  onRefreshLessons,
}: CarryListModalProps) {
  const { close } = useCarryModalStore();
  const { lessons, fetchLessons } = useCarryList();
  const {
    isOpenDate,
    isOpenTime,
    handleRegisterClick,
    handleDateSelect,
    handleTimeSave,
  } = useCarryRegister({
    onRefreshLessons,
    onReloadList: fetchLessons,
  });

  return (
    <ModalWrapper onClose={close}>
      {/* 1. 모달 헤더 - 닫기 버튼 포함 */}
      <CarryListModalHeader onClose={close} />

      {/* 2. 이월 목록 테이블 */}
      <CarryListTable lessons={lessons} onRegister={handleRegisterClick} />

      {/* 3. 날짜 선택 모달과 시간 선택 모달 */}
      {isOpenDate && <CalendarModal onSelect={handleDateSelect} />}
      {isOpenTime && <TimeModal onSave={handleTimeSave} />}
    </ModalWrapper>
  );
}

import CalendarModal from '@/shared/form/CalendarModal';
import TimeModal from '@/shared/form/TimeModal';

interface AttendanceMakeupModalsProps {
  isOpenDate: boolean;
  isOpenTime: boolean;
  onSelectDate: (date: string) => void;
  onSaveTime: (hour: string, min: string) => void | Promise<void>;
}

// 보강과 이월 모달을 관리하는 컴포넌트
export default function AttendanceMakeupModals({
  isOpenDate,
  isOpenTime,
  onSelectDate,
  onSaveTime,
}: AttendanceMakeupModalsProps) {
  return (
    <>
      {isOpenDate && <CalendarModal onSelect={onSelectDate} />}
      {isOpenTime && <TimeModal onSave={onSaveTime} />}
    </>
  );
}

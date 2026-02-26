import CalendarModal from '@/shared/form/CalendarModal';
import TimeModal from '@/shared/form/TimeModal';

interface AttendanceMakeupModalsProps {
  isOpenDate: boolean;
  isOpenTime: boolean;
  onSelectDate: (date: string) => void;
  onSaveTime: (hour: string, min: string) => void | Promise<void>;
}

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

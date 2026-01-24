import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarModal.css';
import { formatKoreanDate } from '@/utils/formDate';
import { useDateModalStore } from '@/store/dateModalStore';
import ModalWrapper from '../modal/ModalWrapper';
import NormalButton from '../button/NormalButton';

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

interface CalendarModalProps {
  onSelect?: (date: string) => void;
}

function CalendarModal({ onSelect }: CalendarModalProps) {
  const [originSelectedDate, setOriginSelectedDate] = useState<SelectedDate>(
    new Date(),
  );
  const { setSelectedDate, close } = useDateModalStore();

  const choiceDate = () => {
    const date = originSelectedDate?.toString();
    if (date) {
      setSelectedDate(date);
      onSelect?.(date);
    }

    close();
  };

  return (
    <ModalWrapper onClose={close}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">날짜 선택</h2>
        <button onClick={close}>닫기</button>
      </div>
      <Calendar
        onChange={setOriginSelectedDate}
        value={originSelectedDate}
        calendarType="gregory"
        prev2Label={null}
        next2Label={null}
      />
      <div className="flex justify-between mt-10">
        <p>
          <span>선택된 날짜 : </span>

          <span>{formatKoreanDate(originSelectedDate?.toString() || '')}</span>
        </p>
        <NormalButton onClick={choiceDate} text="저장" />
      </div>
    </ModalWrapper>
  );
}
export default CalendarModal;

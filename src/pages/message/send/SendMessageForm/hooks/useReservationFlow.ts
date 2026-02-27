import { useDateModalStore } from '@/store/date/dateModalStore';
import { useTimeModalStore } from '@/store/date/timeModalStore';
import type { Student } from '@/types/student';

interface ReservationPayloadInput {
  content: string;
  students: Student[];
}

export const useReservationFlow = ({
  content,
  students,
}: ReservationPayloadInput) => {
  const {
    open: openDate,
    isOpen: isOpenDate,
    selectedDate,
    setSelectedDate,
  } = useDateModalStore();
  const {
    open: openTime,
    isOpen: isOpenTime,
    selectedHour,
    selectedMin,
  } = useTimeModalStore();

  const handleReserveClick = () => {
    openDate();
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    openTime();
  };

  const handleTimeSave = () => {
    if (!selectedDate || selectedHour === null || selectedMin === null) {
      alert('날짜와 시간을 모두 선택해주세요.');
      return;
    }

    const startDate = new Date(selectedDate);
    if (Number.isNaN(startDate.getTime())) {
      alert('선택한 날짜 형식이 올바르지 않습니다.');
      return;
    }

    startDate.setHours(Number(selectedHour), Number(selectedMin), 0, 0);
    const utcDate = new Date(
      Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startDate.getHours(),
        startDate.getMinutes(),
        0,
        0,
      ),
    );

    const payload = {
      mode: 'reserve' as const,
      content,
      students,
      reserved_at: utcDate.toISOString(),
    };
    console.log(payload);
  };

  return {
    isOpenDate,
    isOpenTime,
    handleReserveClick,
    handleDateSelect,
    handleTimeSave,
  };
};

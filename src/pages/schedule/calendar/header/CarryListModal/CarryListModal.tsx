import { CARRY_LESSON_LIST_HEADER } from '@/constants/lesson';
import { getRollOverLessons, type LessonItem } from '@/shared/api/lessons';
import NormalButton from '@/shared/button/NormalButton';
import CalendarModal from '@/shared/form/CalendarModal';
import TimeModal from '@/shared/form/TimeModal';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import TableSection from '@/shared/modal/TableSection';
import { useCarryModalStore } from '@/store/carryModalStore';
import { useDateModalStore } from '@/store/dateModalStore';
import { useTimeModalStore } from '@/store/timeModalStore';
import { formatKoreanDate } from '@/utils/formDate';
import { useEffect, useState } from 'react';
// import AttendanceButtonList from './AttendanceButtonList';

export default function CarryListModal() {
  const { close } = useCarryModalStore();
  const {
    open: openDate,
    isOpen: isOpenDate,
    setSelectedDate,
    selectedDate,
  } = useDateModalStore();

  const {
    open: openTime,
    isOpen: isOpenTime,
    selectedHour,
    selectedMin,
  } = useTimeModalStore();

  const [lessons, setLessons] = useState<LessonItem[]>([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await getRollOverLessons();
        setLessons(response.lessons);
      } catch (error) {
        console.error('Failed to fetch roll-over lessons:', error);
      }
    };

    fetchLessons();
  }, []);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date); // 날짜 저장
    openTime(); // 시간 모달 열기
  };

  return (
    <ModalWrapper onClose={close}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">이월 목록</h2>
        <button onClick={close}>닫기</button>
      </div>
      <p>선택한 날짜 : {selectedDate ? formatKoreanDate(selectedDate) : '-'}</p>
      <p>
        선택한 시간/분 :{' '}
        {selectedHour !== null && selectedMin !== null
          ? `${selectedHour}시 ${selectedMin}분`
          : '-'}
      </p>
      <TableSection
        dataList={lessons}
        headers={CARRY_LESSON_LIST_HEADER}
        getRows={(lessons) => {
          if (!lessons || lessons.length === 0) return [];
          return lessons.map((lesson) => [
            lesson.name,
            lesson.class_type,
            formatKoreanDate(lesson.before_at),
            // `${lesson.lesson_index}회차`,
            <NormalButton text="등록" onClick={openDate} />,
          ]);
        }}
      />
      {isOpenDate && <CalendarModal onSelect={handleDateSelect} />}
      {isOpenTime && <TimeModal />}
    </ModalWrapper>
  );
}

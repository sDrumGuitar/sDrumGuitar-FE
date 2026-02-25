import { CARRY_LESSON_LIST_HEADER } from '@/constants/lesson';
import {
  createLessonRollover,
  getRollOverLessons,
  type LessonItem,
} from '@/shared/api/lessons';
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

interface CarryListModalProps {
  onRefreshLessons: () => Promise<void>;
}

export default function CarryListModal({
  onRefreshLessons,
}: CarryListModalProps) {
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
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  const fetchLessons = async () => {
    try {
      const response = await getRollOverLessons();
      setLessons(response.lessons);
    } catch (error) {
      console.error('Failed to fetch roll-over lessons:', error);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date); // 날짜 저장
    openTime(); // 시간 모달 열기
  };

  const handleRegisterClick = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    openDate();
  };

  const handleTimeSave = async () => {
    if (!selectedLessonId) {
      alert('레슨을 선택해주세요.');
      return;
    }
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
    await createLessonRollover(selectedLessonId, {
      start_at: startDate.toISOString(),
    });

    setSelectedLessonId(null);
    await fetchLessons();
    await onRefreshLessons();
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
            <NormalButton
              text="등록"
              onClick={() => handleRegisterClick(lesson.lesson_id)}
            />,
          ]);
        }}
      />
      {isOpenDate && <CalendarModal onSelect={handleDateSelect} />}
      {isOpenTime && <TimeModal onSave={handleTimeSave} />}
    </ModalWrapper>
  );
}

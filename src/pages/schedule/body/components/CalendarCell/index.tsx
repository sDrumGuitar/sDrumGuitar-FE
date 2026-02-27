import { DateLabel } from './components/DateLabel';
import LessonBarList from './components/LessonBarList';
import type { Lesson } from '@/types/lesson';
import { MAX_VISIBLE_LESSONS } from '@/constants/lesson';
import { useLessonModalStore } from '@/store/schedule/lessonModalStore';

interface CalendarCellProps {
  date: string;
  isCurrentMonth: boolean;
  lessons: Lesson[];
}

// 캘린더 내 Cell 컴포넌트
function CalendarCell({ date, isCurrentMonth, lessons }: CalendarCellProps) {
  // 최대 2개의 수업만 표시하기 위해 슬라이스
  const visibleLessons = lessons.slice(0, MAX_VISIBLE_LESSONS);
  // 2개 이상인 경우, "더보기" 표시를 위해 hasMore 플래그 계산
  const hasMore = lessons.length > MAX_VISIBLE_LESSONS;

  // 수업 목록 모달을 열기 위한 전역 상태와 함수 가져오기
  const { open, setSelectedDate } = useLessonModalStore();

  // 날짜 선택 후, 전역 store에 저장하는 함수
  const onSelectedDate = (date: string) => {
    setSelectedDate(date);
    open();
  };

  return (
    <div
      className={`h-40 border-r border-b p-1 cursor-pointer hover:bg-[#d5def5]
        ${!isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}`}
      onClick={() => onSelectedDate(date)}
    >
      {/* 1. 일자 */}
      <DateLabel date={date} />

      {/* 2. 회차 리스트 */}
      <LessonBarList lessons={visibleLessons} hasMore={hasMore} />
    </div>
  );
}

export default CalendarCell;

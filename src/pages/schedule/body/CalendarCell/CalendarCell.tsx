import { useLessonModalStore } from '@/store/lessonModalStore';
import { DateLabel } from './DateLabel';
import LessonBarList from './LessonBarList';
import type { Lesson } from '@/types/lesson';

// 캘린더 내 Cell
interface CalendarCellProps {
  date: string;
  isCurrentMonth: boolean;
  lessons: Lesson[];
}

function CalendarCell({ date, isCurrentMonth, lessons }: CalendarCellProps) {
  const visibleLessons = lessons.slice(0, 2);
  const hasMore = lessons.length > 2;

  const { open, setSelectedDate } = useLessonModalStore();

  /**
   * 날짜 선택 후, 전역 store에 저장하는 함수
   * @param date 선택한 날짜
   */
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
      {/* 일자 */}
      <DateLabel date={date} />

      {/* 회차 리스트 */}
      <LessonBarList lessons={visibleLessons} hasMore={hasMore} />
    </div>
  );
}

export default CalendarCell;

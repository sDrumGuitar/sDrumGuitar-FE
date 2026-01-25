import type { Lesson } from '../../types';
import LessonBarList from './LessonBarList';
import dayjs from 'dayjs';

// 캘린더 내 Cell
interface CalendarCellProps {
  date: string;
  isCurrentMonth: boolean;
  lessons: Lesson[];
  onClick: (date: string) => void;
}

// Cell 내 '일자'
const DateLabel = ({ date }: { date: string }) => {
  return <div className="text-sm font-medium">{dayjs(date).date()}</div>;
};

function CalendarCell({
  date,
  isCurrentMonth,
  lessons,
  onClick,
}: CalendarCellProps) {
  const visibleLessons = lessons.slice(0, 2);
  const hasMore = lessons.length > 2;

  return (
    <div
      className={`h-32 border-r border-b p-1 cursor-pointer hover:bg-[#d5def5]
        ${!isCurrentMonth ? 'bg-gray-50 text-gray-400' : ''}`}
      onClick={() => onClick(date)}
    >
      {/* 일자 */}
      <DateLabel date={date} />

      {/* 회차 리스트 */}
      <LessonBarList lessons={visibleLessons} hasMore={hasMore} />
    </div>
  );
}

export default CalendarCell;

import { useLessonModalStore } from '@/store/lessonModalStore';
import { WEEKDAY_LABELS } from '@/constants/schedule';
import type { CalendarDay, CalendarDate } from '@/types/schedule';
import { useScheduleCalendarStore } from '@/store/scheduleCalendarStore';
import { getMonthDates } from '@/utils/getMonthDates';
import CalendarCell from './CalendarCell/CalendarCell';
import LessonListModal from './LessonListModal/LessonListModal';

// 캘린더 본문
interface CalendarGridProps {
  dataMap: Record<string, CalendarDay>;
  onAttendanceUpdated: (
    lessonId: number,
    attendanceStatus: string | null,
  ) => void;
  onRefreshLessons: () => Promise<void>;
}

function CalendarGrid({
  dataMap,
  onAttendanceUpdated,
  onRefreshLessons,
}: CalendarGridProps) {
  const { isOpen } = useLessonModalStore();
  const { currentYear, currentMonth } = useScheduleCalendarStore();
  const dates = getMonthDates(currentYear, currentMonth);
  return (
    <div className="w-full mt-4">
      <CalendarHeader />
      <CalendarBody dates={dates} dataMap={dataMap} />
      {isOpen && (
        <LessonListModal
          dataMap={dataMap}
          onAttendanceUpdated={onAttendanceUpdated}
          onRefreshLessons={onRefreshLessons}
        />
      )}
    </div>
  );
}

// 캘린더 Header
const CalendarHeader = () => {
  return (
    <div className="grid grid-cols-7 border-t border-l">
      {WEEKDAY_LABELS.map((label, index) => (
        <div
          key={label}
          className={`text-center py-2 text-sm font-medium border-r border-b border-black ${
            index === 0 ? 'text-red-500' : ''
          } ${index === 6 ? 'text-blue-500' : ''}`}
        >
          {label}
        </div>
      ))}{' '}
    </div>
  );
};

// 캘린더 Body
interface CalendarBodyProps {
  dates: CalendarDate[];
  dataMap: Record<string, CalendarDay>;
}

const CalendarBody = ({ dates, dataMap }: CalendarBodyProps) => {
  return (
    <div className="grid grid-cols-7 border-l">
      {dates.map(({ date, isCurrentMonth }) => (
        <CalendarCell
          key={date}
          date={date}
          isCurrentMonth={isCurrentMonth}
          lessons={dataMap[date]?.lessons ?? []} // Access lessons property
        />
      ))}
    </div>
  );
};

export default CalendarGrid;

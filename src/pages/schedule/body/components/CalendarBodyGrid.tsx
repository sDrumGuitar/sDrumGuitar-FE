import type { CalendarDay } from '@/types/schedule';
import { useScheduleCalendarStore } from '@/store/scheduleCalendarStore';
import { getMonthDates } from '@/utils/getMonthDates';
import CalendarCell from './CalendarCell';

interface CalendarBodyGridProps {
  dataMap: Record<string, CalendarDay>;
}

// 캘린더 날짜 및 회차 정보 그리드 컴포넌트
const CalendarBodyGrid = ({ dataMap }: CalendarBodyGridProps) => {
  // 현재 년도와 월을 스토어에서 가져와 해당 월의 날짜 정보를 계산
  const { currentYear, currentMonth } = useScheduleCalendarStore();
  const dates = getMonthDates(currentYear, currentMonth);

  return (
    <div className="grid grid-cols-7 border-l">
      {dates.map(({ date, isCurrentMonth }) => (
        <CalendarCell
          key={date}
          date={date}
          isCurrentMonth={isCurrentMonth}
          lessons={dataMap[date]?.lessons ?? []}
        />
      ))}
    </div>
  );
};

export default CalendarBodyGrid;

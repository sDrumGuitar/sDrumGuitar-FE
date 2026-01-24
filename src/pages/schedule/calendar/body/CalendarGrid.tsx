import type { CalendarDate, CalendarDay } from '../types'; // Import CalendarDay
import CalendarCell from './CalendarCell/CalendarCell';

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

interface CalendarGridProps {
  dates: CalendarDate[];
  dataMap: Record<string, CalendarDay>;
  onSelectDate: (date: string) => void;
}

function CalendarGrid({ dates, dataMap, onSelectDate }: CalendarGridProps) {
  return (
    <div className="w-full mt-4">
      <CalendarHeader />
      <CalendarBody
        dates={dates}
        dataMap={dataMap}
        onSelectDate={onSelectDate}
      />
    </div>
  );
}

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

interface CalendarBodyProps {
  dates: CalendarDate[];
  dataMap: Record<string, CalendarDay>;
  onSelectDate: (date: string) => void;
}

const CalendarBody = ({ dates, dataMap, onSelectDate }: CalendarBodyProps) => {
  return (
    <div className="grid grid-cols-7 border-l">
      {dates.map(({ date, isCurrentMonth }) => (
        <CalendarCell
          key={date}
          date={date}
          isCurrentMonth={isCurrentMonth}
          lessons={dataMap[date]?.lessons ?? []} // Access lessons property
          onClick={onSelectDate}
        />
      ))}
    </div>
  );
};

export default CalendarGrid;

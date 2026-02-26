import { WEEKDAY_LABELS } from '@/constants/schedule';

// 요일 헤더 컴포넌트
const CalendarWeekHeader = () => {
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
      ))}
    </div>
  );
};

export default CalendarWeekHeader;

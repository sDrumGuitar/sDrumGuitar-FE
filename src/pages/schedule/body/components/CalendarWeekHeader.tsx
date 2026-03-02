import { WEEKDAY_LABELS } from '@/constants/schedule';

// 요일 헤더 컴포넌트
const CalendarWeekHeader = () => {
  return (
    <div className="grid grid-cols-7 border border-gray-200 rounded-t-xl overflow-hidden bg-slate-50">
      {WEEKDAY_LABELS.map((label, index) => (
        <div
          key={label}
          className={`text-center py-2 text-xs font-semibold tracking-wide border-r border-gray-200 ${
            index === 0
              ? 'text-red-600'
              : index === 6
                ? 'text-blue-600'
                : 'text-gray-600'
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
};

export default CalendarWeekHeader;

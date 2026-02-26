import { useScheduleCalendarStore } from '@/store/scheduleCalendarStore';
import SelectMonth from './components/SelectMonth';
import TodayButton from './components/TodayButton';

// 월 선택과 오늘 버튼을 포함하는 헤더의 왼쪽 섹션 컴포넌트
function SelectMonthSection({}) {
  const { currentYear, currentMonth, setPrevMonth, setNextMonth, setToday } =
    useScheduleCalendarStore(); // 스케줄 캘린더의 년/월 상태와 네비게이션 함수를 스토어에서 가져옴

  return (
    <div className="flex items-center gap-4">
      {/* 1. 월 선택 컴포넌트 */}
      <SelectMonth
        year={currentYear}
        month={currentMonth}
        onPrevMonth={setPrevMonth}
        onNextMonth={setNextMonth}
      />

      {/* 2. 오늘 버튼 컴포넌트 */}
      <TodayButton onToday={setToday} />
    </div>
  );
}
export default SelectMonthSection;

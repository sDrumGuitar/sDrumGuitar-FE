import CarryListSection from './components/CarryListSection';
import SelectMonthSection from './components/SelectMonthSection';

interface CalendarHeaderProps {
  onRefreshLessons: () => Promise<void>;
}

// 캘린더 헤더 컴포넌트 - 월 선택과 이월 목록 버튼을 포함
function CalendarHeader({ onRefreshLessons }: CalendarHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      {/* 1. 월 선택 섹션과 이월 목록 섹션을 포함하는 헤더 레이아웃 */}
      <SelectMonthSection />

      {/* 2. 이월 목록 버튼과 모달을 포함하는 섹션 */}
      <CarryListSection onRefreshLessons={onRefreshLessons} />
    </div>
  );
}
export default CalendarHeader;

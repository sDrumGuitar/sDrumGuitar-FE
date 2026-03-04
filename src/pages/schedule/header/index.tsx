import CarryListSection from './components/CarryListSection';
import SelectMonthSection from './components/SelectMonthSection';
import RefreshButton from '@/shared/button/RefreshButton';

interface CalendarHeaderProps {
  onRefreshLessons: () => Promise<void>;
  isRefreshing?: boolean;
}

// 캘린더 헤더 컴포넌트 - 월 선택과 이월 목록 버튼을 포함
function CalendarHeader({ onRefreshLessons, isRefreshing }: CalendarHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      {/* 1. 월 선택 섹션과 이월 목록 섹션을 포함하는 헤더 레이아웃 */}
      <SelectMonthSection />

      {/* 2. 이월 목록 버튼과 모달을 포함하는 섹션 */}
      <div className="flex items-center gap-2">
        <RefreshButton
          onRefresh={onRefreshLessons}
          isRefreshingExternal={Boolean(isRefreshing)}
        />
        <CarryListSection onRefreshLessons={onRefreshLessons} />
      </div>
    </div>
  );
}
export default CalendarHeader;

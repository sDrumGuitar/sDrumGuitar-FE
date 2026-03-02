import CarryListSection from './components/CarryListSection';
import SelectMonthSection from './components/SelectMonthSection';

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
        <button
          type="button"
          onClick={onRefreshLessons}
          disabled={isRefreshing}
          className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
            isRefreshing
              ? 'border-gray-200 text-gray-400 cursor-not-allowed'
              : 'border-primary text-primary hover:bg-primary/10 active:scale-95 active:bg-primary/20'
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className={isRefreshing ? 'animate-spin' : ''}
          >
            <path
              d="M16 10a6 6 0 1 1-1.76-4.24"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M16 4v4h-4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          최신화
        </button>
        <CarryListSection onRefreshLessons={onRefreshLessons} />
      </div>
    </div>
  );
}
export default CalendarHeader;

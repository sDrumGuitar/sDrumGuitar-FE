import CalendarGrid from './body/CalendarGrid';
import CalendarHeader from './header/CalendarHeader';
import { useScheduleCalendar } from './hooks/useScheduleCalendar';

/**
 * SchedulePage
 *
 * 월 단위 캘린더의 연/월 상태와 네비게이션을 관리하는 컨테이너 컴포넌트입니다.
 * 실제 날짜 셀 렌더링은 CalendarGrid에 위임합니다.
 */
function SchedulePage() {
  const { calendarData, fetchLessons, handleAttendanceUpdated } =
    useScheduleCalendar();

  return (
    <div>
      {/* 캘린더 헤더 (월 이동, 오늘 버튼) */}
      <CalendarHeader
        onRefreshLessons={fetchLessons}
      />

      {/* 캘린더 본문 */}
      <CalendarGrid
        dataMap={calendarData}
        onAttendanceUpdated={handleAttendanceUpdated}
        onRefreshLessons={fetchLessons}
      />
    </div>
  );
}
export default SchedulePage;

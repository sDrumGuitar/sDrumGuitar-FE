import CalendarGrid from './body';
import CalendarHeader from './header';
import { useScheduleCalendar } from './hooks/useScheduleCalendar';

// 스케줄 관리 페이지 컴포넌트
function SchedulePage() {
  const { calendarData, fetchLessons, handleAttendanceUpdated } =
    useScheduleCalendar(); // 캘린더 데이터와 관련 함수들을 커스텀 훅에서 가져옴

  return (
    <div>
      {/* 1. 캘린더 헤더 (월 이동, 오늘 버튼) */}
      <CalendarHeader onRefreshLessons={fetchLessons} />

      {/* 2. 캘린더 본문 */}
      <CalendarGrid
        dataMap={calendarData}
        onAttendanceUpdated={handleAttendanceUpdated}
        onRefreshLessons={fetchLessons}
      />
    </div>
  );
}
export default SchedulePage;

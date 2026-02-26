import { useLessonModalStore } from '@/store/lessonModalStore';
import type { CalendarDay } from '@/types/schedule';
import CalendarWeekHeader from './components/CalendarWeekHeader';
import CalendarBodyGrid from './components/CalendarBodyGrid';
import LessonListModal from './components/LessonListModal';

// 캘린더 본문
interface CalendarGridProps {
  // 날짜별 수업 정보를 담은 맵
  dataMap: Record<string, CalendarDay>;

  // 출석 상태 업데이트 핸들러
  onAttendanceUpdated: (
    lessonId: number,
    attendanceStatus: string | null,
  ) => void;

  // 수업 정보 새로고침 핸들러
  onRefreshLessons: () => Promise<void>;
}

function CalendarGrid({
  dataMap,
  onAttendanceUpdated,
  onRefreshLessons,
}: CalendarGridProps) {
  const { isOpen } = useLessonModalStore();

  return (
    <div className="w-full mt-4">
      {/* 1. 요일 헤더 (일 ~ 토) */}
      <CalendarWeekHeader />

      {/* 2. 캘린더 날짜 및 회차 정보 그리드 */}
      <CalendarBodyGrid dataMap={dataMap} />

      {/* 3. 일자 별 수업 목록 모달 */}
      {isOpen && (
        <LessonListModal
          dataMap={dataMap}
          onAttendanceUpdated={onAttendanceUpdated}
          onRefreshLessons={onRefreshLessons}
        />
      )}
    </div>
  );
}

export default CalendarGrid;

import { useLessonModalStore } from '@/store/schedule/lessonModalStore';
import type { CalendarDay } from '@/types/schedule';
import CalendarWeekHeader from './components/CalendarWeekHeader';
import CalendarBodyGrid from './components/CalendarBodyGrid';
import LessonListModal from './components/LessonListModal';
import { formatToKoreanDate } from '@/utils/date/formatKoreanDate';

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

// 캘린더 그리드 컴포넌트 - 날짜 셀과 수업 목록 모달을 포함
function CalendarGrid({
  dataMap,
  onAttendanceUpdated,
  onRefreshLessons,
}: CalendarGridProps) {
  const { isOpen, open, setSelectedDate } = useLessonModalStore();
  const mobileDays = Object.values(dataMap)
    .filter((day) => day.lessons.length > 0)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="w-full mt-4">
      {/* 1. 요일 헤더 (일 ~ 토) */}
      <CalendarWeekHeader />

      {/* 2. 캘린더 날짜 및 회차 정보 그리드 */}
      <CalendarBodyGrid dataMap={dataMap} />

      {/* 모바일: 날짜별 리스트 */}
      <div className="sm:hidden mt-4 space-y-3">
        {mobileDays.length === 0 && (
          <div className="py-6 text-center text-gray-500">
            <p>조회 내용이 없습니다.</p>
          </div>
        )}
        {mobileDays.map((day) => (
          <div
            key={day.date}
            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm cursor-pointer"
            onClick={() => {
              setSelectedDate(day.date);
              open();
            }}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-800">
                {formatToKoreanDate(day.date)}
              </p>
              <span className="text-xs text-gray-500">
                {day.lessons.length}건
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {day.lessons.map((lesson) => (
                <span
                  key={lesson.id}
                  className="inline-flex items-center rounded-full border border-gray-200 px-2 py-0.5 text-xs text-gray-700"
                >
                  {lesson.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

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

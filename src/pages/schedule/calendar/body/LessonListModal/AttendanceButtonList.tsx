import AttendanceStatusButtons from './components/AttendanceStatusButtons';
import AttendanceSaveButton from './components/AttendanceSaveButton';
import AttendanceMakeupModals from './components/AttendanceMakeupModals';
import { useAttendanceFlow } from './hooks/useAttendanceFlow';

interface AttendanceButtonListProps {
  attendanceStatus: string | null;
  lessonId: number;
  lessonTag: string;
  onAttendanceUpdated: (
    lessonId: number,
    attendanceStatus: string | null,
  ) => void;
  onRefreshLessons: () => Promise<void>;
}

export default function AttendanceButtonList({
  attendanceStatus,
  lessonId,
  lessonTag,
  onAttendanceUpdated,
  onRefreshLessons,
}: AttendanceButtonListProps) {
  // 출석 상태 관리 훅
  const {
    status,
    savedStatus,
    setStatus,
    isOpenDate,
    isOpenTime,
    handleSaveStatus,
    handleDateSelect,
    handleTimeSave,
  } = useAttendanceFlow({
    attendanceStatus,
    lessonId,
    onAttendanceUpdated,
    onRefreshLessons,
  });

  const shouldDisableControls =
    attendanceStatus === 'rollover' && lessonTag === 'rollover';

  return (
    <div className="flex justify-between">
      <AttendanceStatusButtons
        status={status}
        onChange={setStatus}
        disabled={shouldDisableControls}
      />
      {!shouldDisableControls && (
        <AttendanceSaveButton
          onClick={handleSaveStatus}
          disabled={savedStatus === status}
        />
      )}
      <AttendanceMakeupModals
        isOpenDate={isOpenDate}
        isOpenTime={isOpenTime}
        onSelectDate={handleDateSelect}
        onSaveTime={handleTimeSave}
      />
    </div>
  );
}

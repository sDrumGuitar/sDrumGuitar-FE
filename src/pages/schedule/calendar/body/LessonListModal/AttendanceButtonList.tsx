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
  const isFinalized =
    attendanceStatus === 'attended' || attendanceStatus === 'absent';
  const disabledKeys = isFinalized ? ['makeup', 'rollover'] : [];

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <AttendanceStatusButtons
          status={status}
          onChange={setStatus}
          disabled={shouldDisableControls}
          disabledKeys={disabledKeys}
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
      {isFinalized && (
        <p className="text-xs text-gray-500">
          이미 저장된 출석/결석은 보강 또는 이월로 변경할 수 없습니다.
        </p>
      )}
    </div>
  );
}

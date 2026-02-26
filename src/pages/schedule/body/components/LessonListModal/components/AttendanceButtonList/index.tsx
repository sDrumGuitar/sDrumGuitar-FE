import AttendanceStatusButtons from './components/AttendanceStatusButtons';
import AttendanceSaveButton from './components/AttendanceSaveButton';
import AttendanceMakeupModals from './components/AttendanceMakeupModals';
import { useAttendanceFlow } from '../../../../hooks/useAttendanceFlow';

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

// 출석 상태 버튼과 저장 버튼, 보강/이월 모달을 포함하는 컴포넌트
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

  // 출석 상태와 회차 태그에 따른 버튼 활성화 로직
  const shouldDisableControls =
    attendanceStatus === 'rollover' && lessonTag === 'rollover';

  // 출석 또는 결석으로 이미 상태가 확정된 경우, 보강과 이월 버튼을 비활성화
  const isFinalized =
    attendanceStatus === 'attended' || attendanceStatus === 'absent';

  // 상태가 확정된 경우, 보강과 이월 버튼을 비활성화하기 위한 키 설정
  const disabledKeys = isFinalized ? ['makeup', 'rollover'] : [];

  return (
    <div className="space-y-2">
      {/* 1. 출석 상태 버튼과 저장 버튼, 보강/이월 모달을 포함하는 컨테이너 */}
      <div className="flex justify-between">
        {/* 1-1. 출석 상태 버튼 컴포넌트 */}
        <AttendanceStatusButtons
          status={status}
          onChange={setStatus}
          disabled={shouldDisableControls}
          disabledKeys={disabledKeys}
        />

        {/* 1-2. 상태가 변경되었고, 컨트롤이 비활성화되지 않은 경우에만 저장 버튼을 보여줌 */}
        {!shouldDisableControls && (
          <AttendanceSaveButton
            onClick={handleSaveStatus}
            disabled={savedStatus === status}
          />
        )}

        {/* 1-3. 보강과 이월 모달 컴포넌트 */}
        <AttendanceMakeupModals
          isOpenDate={isOpenDate}
          isOpenTime={isOpenTime}
          onSelectDate={handleDateSelect}
          onSaveTime={handleTimeSave}
        />
      </div>

      {/* 2. 상태가 확정된 경우, 사용자에게 보이는 안내 메시지 */}
      {isFinalized && (
        <p className="text-xs text-gray-500">
          이미 저장된 출석/결석은 보강 또는 이월로 변경할 수 없습니다.
        </p>
      )}
    </div>
  );
}

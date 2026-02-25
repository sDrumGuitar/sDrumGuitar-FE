import { useEffect, useState } from 'react';
import { ATTENDANCE_TYPE } from './types';
import { ATTENDANCE_COLORS } from '@/constants/lesson';
import NormalButton from '@/shared/button/NormalButton';
import { useDateModalStore } from '@/store/dateModalStore';
import { useTimeModalStore } from '@/store/timeModalStore';
import CalendarModal from '@/shared/form/CalendarModal';
import TimeModal from '@/shared/form/TimeModal';
import { updateLessonAttendance } from '@/shared/api/lessons';

interface AttendanceButtonListProps {
  attendanceStatus: string | null;
  lessonId: number;
  onAttendanceUpdated: (
    lessonId: number,
    attendanceStatus: string | null,
  ) => void;
}

export default function AttendanceButtonList({
  attendanceStatus,
  lessonId,
  onAttendanceUpdated,
}: AttendanceButtonListProps) {
  const [status, setStatus] = useState(attendanceStatus);
  const [savedStatus, setSavedStatus] = useState(attendanceStatus);

  const {
    isOpen: isOpenDate,
    open: openDate,
    setSelectedDate,
  } = useDateModalStore();
  const { isOpen: isOpenTime, open: openTime } = useTimeModalStore();

  useEffect(() => {
    setStatus(attendanceStatus);
    setSavedStatus(attendanceStatus);
  }, [attendanceStatus]);

  const handleSaveStatus = async () => {
    if (savedStatus === status) return;

    if (status === 'makeup') {
      openDate();
      return;
    }

    if (!lessonId) return;

    try {
      await updateLessonAttendance(lessonId, {
        attendance_status: status ?? 'absent',
      });
      setSavedStatus(status);
      onAttendanceUpdated(lessonId, status);
      alert('출결 상태가 저장되었습니다.');
    } catch (error) {
      console.error('Failed to update attendance:', error);
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date); // 날짜 저장
    openTime(); // 시간 모달 열기
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        {Array.from(ATTENDANCE_TYPE.entries()).map(([key, label]) => {
          const color = ATTENDANCE_COLORS.get(key) ?? '#E5E7EB';
          const isActive = status === key;

          return (
            <button
              key={String(key)}
              onClick={() => setStatus(key)}
              style={{
                borderColor: color,
                backgroundColor: isActive ? color : '#FFFFFF',
                color: isActive ? '#FFFFFF' : color,
              }}
              className="px-3 border transition-colors rounded-2xl"
            >
              {label}
            </button>
          );
        })}
      </div>
      <NormalButton
        text="저장"
        onClick={handleSaveStatus}
        disabled={savedStatus === status}
      />
      {isOpenDate && <CalendarModal onSelect={handleDateSelect} />}
      {isOpenTime && <TimeModal />}
    </div>
  );
}

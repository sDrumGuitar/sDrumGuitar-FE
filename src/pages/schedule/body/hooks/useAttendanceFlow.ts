import { useEffect, useState } from 'react';
import { useDateModalStore } from '@/store/date/dateModalStore';
import { useTimeModalStore } from '@/store/date/timeModalStore';
import {
  updateLessonAttendance,
  updateLessonAttendanceMakeUp,
} from '@/shared/api/lessons';
import { useToastStore } from '@/store/feedback/toastStore';
import { type MessageSendContext } from '@/store/message/messageSendModalStore';
import { useMakeupMessageConfirmStore } from '@/store/message/makeupMessageConfirmStore';
import type { MessageRecipient } from '@/store/message/messageSendStore';

interface UseAttendanceFlowParams {
  attendanceStatus: string | null;
  lessonId: number;
  lessonName?: string;
  lessonIndex?: number;
  onAttendanceUpdated: (
    lessonId: number,
    attendanceStatus: string | null,
  ) => void;
  onRefreshLessons?: () => Promise<void>;
}

// 출결 상태 저장과 보강 일정 등록 플로우를 묶어 관리하는 훅
export function useAttendanceFlow({
  attendanceStatus,
  lessonId,
  lessonName,
  lessonIndex,
  onAttendanceUpdated,
  onRefreshLessons,
}: UseAttendanceFlowParams) {
  // 현재 선택된 출결 상태
  const [status, setStatus] = useState(attendanceStatus);
  // 마지막으로 저장된 출결 상태
  const [savedStatus, setSavedStatus] = useState(attendanceStatus);

  const {
    isOpen: isOpenDate,
    open: openDate,
    selectedDate,
    setSelectedDate,
  } = useDateModalStore();
  const { isOpen: isOpenTime, open: openTime } = useTimeModalStore();
  const { addToast } = useToastStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { open: openMakeupSendConfirm } = useMakeupMessageConfirmStore();

  useEffect(() => {
    setStatus(attendanceStatus);
    setSavedStatus(attendanceStatus);
  }, [attendanceStatus]);

  // 일반 출결(출석/결석/이월) 저장, 보강이면 날짜 선택 모달 오픈
  const handleSaveStatus = async () => {
    // 변경 사항이 없으면 저장하지 않음
    if (savedStatus === status) return;

    // 보강 출결이면 날짜 선택 모달부터 오픈
    if (status === 'makeup') {
      openDate();
      return;
    }

    // 일반 출결 상태 저장
    if (!lessonId) return;

    // 출결 상태가 null인 경우 'absent'로 처리
    try {
      await updateLessonAttendance(lessonId, {
        attendance_status: status ?? 'absent',
      });
      setSavedStatus(status);
      onAttendanceUpdated(lessonId, status);
      addToast('success', '출결 상태가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('Failed to update attendance:', error);
      addToast('error', '출결 상태 저장에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 날짜 선택 후 시간 선택 모달로 이어지는 단계
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    openTime();
  };

  // 시간 선택 후 보강 일정(날짜+시간) 저장
  const handleTimeSave = async (hour: string, min: string) => {
    if (!lessonId) return;
    if (!selectedDate) {
      addToast('warning', '날짜를 먼저 선택해주세요.');
      return;
    }

    const startDate = new Date(selectedDate);
    if (Number.isNaN(startDate.getTime())) {
      addToast('error', '선택한 날짜 형식이 올바르지 않습니다.');
      return;
    }

    startDate.setHours(Number(hour), Number(min), 0, 0);
    const utcDate = new Date(
      Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startDate.getHours(),
        startDate.getMinutes(),
        0,
        0,
      ),
    );

    setIsSubmitting(true);
    try {
      await updateLessonAttendanceMakeUp(lessonId, {
        makeup_start_at: utcDate.toISOString(),
      });
      setStatus('makeup');
      setSavedStatus('makeup');
      onAttendanceUpdated(lessonId, 'makeup');
      addToast('success', '보강 일정이 성공적으로 저장되었습니다.');

      if (lessonName) {
        const recipient: MessageRecipient = { name: lessonName };
        const context: MessageSendContext = {
          title: '보강 문자 보내기',
          kind: 'makeup',
          targetType: 'lesson',
          student: recipient,
          lessonId,
          lessonIndex,
          resetSelection: true,
        };

        openMakeupSendConfirm(context);
      }

      onRefreshLessons?.();
    } catch (error) {
      console.error('Failed to update makeup schedule:', error);
      addToast('error', '보강 일정 저장에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    status,
    savedStatus,
    setStatus,
    isOpenDate,
    isOpenTime,
    isSubmitting,
    handleSaveStatus,
    handleDateSelect,
    handleTimeSave,
  };
}

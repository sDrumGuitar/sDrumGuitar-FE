import { useState } from 'react';
import { createLessonRollover } from '@/shared/api/lessons';
import { useDateModalStore } from '@/store/date/dateModalStore';
import { useTimeModalStore } from '@/store/date/timeModalStore';
import { useToastStore } from '@/store/feedback/toastStore';

interface UseCarryRegisterOptions {
  onRefreshLessons: () => Promise<void>;
  onReloadList: () => Promise<void>;
}

// 이월 등록을 관리하는 커스텀 훅 - 날짜와 시간 선택 후 이월 등록 API 호출
export const useCarryRegister = ({
  onRefreshLessons,
  onReloadList,
}: UseCarryRegisterOptions) => {
  // 선택된 레슨 ID를 상태로 관리
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  // 날짜 선택 모달과 시간 선택 모달의 상태와 제어 함수
  const {
    open: openDate,
    isOpen: isOpenDate,
    setSelectedDate,
    selectedDate,
  } = useDateModalStore();
  const {
    open: openTime,
    isOpen: isOpenTime,
    selectedHour,
    selectedMin,
  } = useTimeModalStore();
  const { addToast } = useToastStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 이월 등록 버튼 클릭 시 선택된 레슨 ID를 설정하고 날짜 선택 모달을 열기
  const handleRegisterClick = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    openDate();
  };

  // 날짜 선택이 완료되면 시간 선택 모달을 열기
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    openTime();
  };

  // 시간 선택이 완료되면 이월 등록 API를 호출하고 목록을 새로고침
  const handleTimeSave = async () => {
    if (!selectedLessonId) {
      addToast('warning', '레슨을 선택해주세요.');
      return;
    }
    if (!selectedDate || selectedHour === null || selectedMin === null) {
      addToast('warning', '날짜와 시간을 모두 선택해주세요.');
      return;
    }

    const startDate = new Date(selectedDate);
    if (Number.isNaN(startDate.getTime())) {
      addToast('error', '선택한 날짜 형식이 올바르지 않습니다.');
      return;
    }

    startDate.setHours(Number(selectedHour), Number(selectedMin), 0, 0);
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
      await createLessonRollover(selectedLessonId, {
        start_at: utcDate.toISOString(),
      });

      setSelectedLessonId(null);
      await onReloadList();
      await onRefreshLessons();
      addToast('success', '이월 등록이 성공적으로 완료되었습니다.');
    } catch (error) {
      console.error('Failed to create rollover:', error);
      addToast('error', '이월 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isOpenDate,
    isOpenTime,
    isSubmitting,
    handleRegisterClick,
    handleDateSelect,
    handleTimeSave,
  };
};

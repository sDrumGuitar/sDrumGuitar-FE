import { LessonListHeader } from '@/constants/lesson';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import TableSection from '@/shared/modal/TableSection';

import { useLessonModalStore } from '@/store/schedule/lessonModalStore';
import type { Lesson } from '@/types/lesson';
import { useEffect, useState } from 'react';
import AttendanceButtonList from './components/AttendanceButtonList';
import type { CalendarData } from '@/types/schedule';
import LessonListModalHeader from './components/LessonListModalHeader';

interface LessonListModalProps {
  dataMap: CalendarData;
  onAttendanceUpdated: (
    lessonId: number,
    attendanceStatus: string | null,
  ) => void;
  onRefreshLessons: () => Promise<void>;
}

// 일자 별 수업 목록 모달 컴포넌트
export default function LessonListModal({
  dataMap,
  onAttendanceUpdated,
  onRefreshLessons,
}: LessonListModalProps) {
  // 모달을 닫는 함수와 선택된 날짜 정보
  const { close, selectedDate } = useLessonModalStore();
  // 선택된 날짜에 해당하는 수업 목록을 상태로 관리
  const [lessons, setLessons] = useState<Lesson[]>([]);

  // 선택한 날짜가 변경될 때마다 해당 날짜의 수업 정보를 업데이트하는 useEffect
  useEffect(() => {
    if (!selectedDate) {
      setLessons([]);
      return;
    }

    const day = dataMap[selectedDate];
    setLessons(day ? day.lessons : []);
  }, [dataMap, selectedDate]);

  return (
    <ModalWrapper onClose={close}>
      {/* 1. 모달 헤더 */}
      <LessonListModalHeader />

      {/* 2. 회차 리스트 테이블 */}
      <TableSection
        dataList={lessons}
        headers={LessonListHeader}
        getRows={(lessons) => {
          if (!lessons || lessons.length === 0) return [];
          return lessons.map((lesson) => [
            lesson.name,
            lesson.class_type,
            `${lesson.lesson_index}회차`,
            lesson.paid_at ? String(lesson.paid_at) : '-',
            <AttendanceButtonList
              attendanceStatus={lesson.attendance_status}
              lessonId={lesson.id}
              lessonTag={lesson.lesson_tag}
              onAttendanceUpdated={onAttendanceUpdated}
              onRefreshLessons={onRefreshLessons}
            />,
          ]);
        }}
      />
    </ModalWrapper>
  );
}

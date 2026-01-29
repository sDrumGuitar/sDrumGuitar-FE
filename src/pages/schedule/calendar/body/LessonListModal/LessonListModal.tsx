import { LessonListHeader } from '@/constants/lesson';
import { MockCalendarData } from '@/mock/lesson';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import TableSection from '@/shared/modal/TableSection';
import { useLessonModalStore } from '@/store/lessonModalStore';
import type { Lesson } from '@/types/lesson';
import { useEffect, useState } from 'react';
import AttendanceButtonList from './AttendanceButtonList';

export default function LessonListModal() {
  const { close, selectedDate } = useLessonModalStore();
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    if (!selectedDate) {
      setLessons([]);
      return;
    }

    const day = MockCalendarData[selectedDate];
    setLessons(day ? day.lessons : []);
  }, [selectedDate]);
  return (
    <ModalWrapper onClose={close}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{selectedDate} 회차 정보</h2>
        <button onClick={close}>닫기</button>
      </div>
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
            />,
          ]);
        }}
      />
    </ModalWrapper>
  );
}

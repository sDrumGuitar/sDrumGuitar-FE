import { CARRY_LESSON_LIST_HEADER } from '@/constants/lesson';
import { MockCarryLessonData } from '@/mock/carryLesson';
import NormalButton from '@/shared/button/NormalButton';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import TableSection from '@/shared/modal/TableSection';
import { useCarryModalStore } from '@/store/carryModalStore';
import { useState } from 'react';
// import AttendanceButtonList from './AttendanceButtonList';

export default function CarryListModal() {
  const { close } = useCarryModalStore();
  const [lessons] = useState(MockCarryLessonData);
  return (
    <ModalWrapper onClose={close}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">이월 목록</h2>
        <button onClick={close}>닫기</button>
      </div>
      <TableSection
        dataList={lessons}
        headers={CARRY_LESSON_LIST_HEADER}
        getRows={(lessons) => {
          if (!lessons || lessons.length === 0) return [];
          return lessons.map((lesson) => [
            lesson.name,
            lesson.class_type,
            lesson.start_at,
            `${lesson.lesson_index}회차`,
            <NormalButton text="등록" />,
          ]);
        }}
      />
    </ModalWrapper>
  );
}

import NormalButton from '@/shared/button/NormalButton';
import TableSection from '@/shared/modal/TableSection';
import { CARRY_LESSON_LIST_HEADER } from '@/constants/lesson';
import { formatToKoreanDate } from '@/utils/date/formatKoreanDate';
import type { LessonItem } from '@/shared/api/lessons';

interface CarryListTableProps {
  lessons: LessonItem[];
  onRegister: (lessonId: number) => void;
}

// 이월 목록 테이블 컴포넌트 - 이월된 레슨 목록을 표 형태로 보여주고 등록 버튼을 포함
const CarryListTable = ({ lessons, onRegister }: CarryListTableProps) => {
  return (
    <TableSection
      dataList={lessons}
      headers={CARRY_LESSON_LIST_HEADER}
      getRows={(lessons) => {
        if (!lessons || lessons.length === 0) return [];
        return lessons.map((lesson) => [
          lesson.name,
          lesson.class_type,
          formatToKoreanDate(lesson.start_at),
          <NormalButton
            text="등록"
            onClick={() => onRegister(lesson.lesson_id)}
          />,
        ]);
      }}
    />
  );
};

export default CarryListTable;

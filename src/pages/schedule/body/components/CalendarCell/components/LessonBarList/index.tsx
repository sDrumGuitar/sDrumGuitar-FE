import type { Lesson } from '@/types/lesson';
import LessonBar from './components/LessonBar';

interface LessonBarListProps {
  lessons: Lesson[];
  hasMore: boolean;
}

// 회차 리스트 컴포넌트
const LessonBarList = ({ lessons, hasMore }: LessonBarListProps) => {
  return (
    <div className="mt-1">
      {/* 1. 수업 바 리스트 */}
      {lessons.map((lesson) => (
        <LessonBar key={lesson.id} lesson={lesson} />
      ))}

      {/* 2. 2개 이상인 경우, "더보기" 표시 */}
      {hasMore && <div className="text-xs text-gray-500 mt-0.5">...더보기</div>}
    </div>
  );
};

export default LessonBarList;

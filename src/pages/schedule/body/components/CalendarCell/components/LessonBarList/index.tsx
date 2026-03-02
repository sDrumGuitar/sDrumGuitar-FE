import type { Lesson } from '@/types/lesson';
import LessonBar from './components/LessonBar';

interface LessonBarListProps {
  lessons: Lesson[];
  hasMore: boolean;
  totalCount: number;
}

// 회차 리스트 컴포넌트
const LessonBarList = ({ lessons, hasMore, totalCount }: LessonBarListProps) => {
  return (
    <div className="mt-1">
      {/* 모바일: 요약 표시 */}
      {totalCount > 0 && (
        <div className="sm:hidden mb-1">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700">
            {totalCount}건
          </span>
        </div>
      )}

      {/* 1. 수업 바 리스트 */}
      <div className="hidden sm:block">
        {lessons.map((lesson) => (
          <LessonBar key={lesson.id} lesson={lesson} />
        ))}

        {/* 2. 2개 이상인 경우, "더보기" 표시 */}
        {hasMore && (
          <div className="text-xs text-gray-500 mt-0.5">...더보기</div>
        )}
      </div>
    </div>
  );
};

export default LessonBarList;

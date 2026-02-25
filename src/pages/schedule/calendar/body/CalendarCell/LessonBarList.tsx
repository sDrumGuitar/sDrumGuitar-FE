import React from 'react';
import type { Lesson } from '@/types/lesson';
import { ATTENDANCE_COLORS } from '@/constants/lesson';

interface LessonBarProps {
  lesson: Lesson;
}

const LessonBar: React.FC<LessonBarProps> = ({ lesson }) => {
  const isRolloverCompleted =
    lesson.attendance_status === 'rollover' && lesson.lesson_tag === 'rollover';

  const bgColor =
    lesson.attendance_status === null
      ? 'bg-white border border-black' // 출석 체크 전
      : `${ATTENDANCE_COLORS.get(lesson.attendance_status)}`;
  const textColor =
    lesson.attendance_status === null
      ? 'text-black' // 출석 체크 전
      : `text-white`;
  const style = isRolloverCompleted
    ? { backgroundColor: '#F3E8FF', borderColor: '#A855F7' }
    : { backgroundColor: bgColor };

  const className = isRolloverCompleted
    ? 'text-xs px-1 py-0.5 rounded mb-0.5 truncate text-purple-700 border border-dashed'
    : `text-xs px-1 py-0.5 rounded mb-0.5 truncate ${bgColor} ${textColor}`;

  return (
    <div
      style={style}
      className={className}
      title={`${lesson.name} (${lesson.lesson_index}회차)`}
    >
      {lesson.name}
    </div>
  );
};

interface LessonBarListProps {
  lessons: Lesson[];
  hasMore: boolean;
}

const LessonBarList: React.FC<LessonBarListProps> = ({ lessons, hasMore }) => {
  return (
    <div className="mt-1">
      {lessons.map((lesson) => (
        <LessonBar
          key={`${lesson.name}-${lesson.lesson_index}`}
          lesson={lesson}
        />
      ))}
      {hasMore && <div className="text-xs text-gray-500 mt-0.5">...더보기</div>}
    </div>
  );
};

export default LessonBarList;

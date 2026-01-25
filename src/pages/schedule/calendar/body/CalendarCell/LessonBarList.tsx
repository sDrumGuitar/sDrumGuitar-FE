import React from 'react';
import type { Lesson } from '../../types';

interface LessonBarProps {
  lesson: Lesson;
}

const LessonBar: React.FC<LessonBarProps> = ({ lesson }) => {
  const bgColor = {
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500',
  }[lesson.color];

  return (
    <div
      className={`text-white text-xs px-1 py-0.5 rounded mb-0.5 truncate ${bgColor}`}
      title={`${lesson.studentName} (${lesson.count}회차)`}
    >
      {lesson.studentName}
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
        <LessonBar key={lesson.id} lesson={lesson} />
      ))}
      {hasMore && (
        <div className="text-xs text-gray-500 mt-0.5">...더보기</div>
      )}
    </div>
  );
};

export default LessonBarList;
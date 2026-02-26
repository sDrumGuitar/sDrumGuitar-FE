import type { Lesson } from '@/types/lesson';
import { ATTENDANCE_COLORS } from '@/constants/lesson';

interface LessonBarProps {
  lesson: Lesson;
}

const LessonBar = ({ lesson }: LessonBarProps) => {
  const isRolloverPending =
    lesson.attendance_status === 'rollover' && lesson.lesson_tag !== 'rollover';

  const hasAttendance = lesson.attendance_status !== null;
  const attendanceColor = hasAttendance
    ? (ATTENDANCE_COLORS.get(lesson.attendance_status as string) ?? '#E5E7EB')
    : null;

  const className = isRolloverPending
    ? 'text-xs px-1 py-0.5 rounded mb-0.5 truncate text-purple-700 border border-dashed'
    : `text-xs px-1 py-0.5 rounded mb-0.5 truncate ${
        hasAttendance ? 'text-white' : 'bg-white text-black border border-black'
      }`;

  const style = isRolloverPending
    ? { backgroundColor: '#F3E8FF', borderColor: '#A855F7' }
    : hasAttendance
      ? { backgroundColor: attendanceColor ?? undefined }
      : undefined;

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

export default LessonBar;

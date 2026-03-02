import DashboardCard from '../DashboardCard';
import SimpleList from '../SimpleList';
import type { LessonItem } from '@/shared/api/lessons';
import { formatToKoreanDate } from '@/utils/date/formatKoreanDate';

interface RolloverLessonSectionProps {
  isLoading: boolean;
  lessons: LessonItem[];
}

function RolloverLessonSection({ isLoading, lessons }: RolloverLessonSectionProps) {
  return (
    <DashboardCard title="이월 레슨 알림" subtitle="최근 이월 레슨 3건">
      {isLoading ? (
        <p className="text-sm text-gray-400">이월 레슨을 불러오는 중...</p>
      ) : (
        <SimpleList
          items={lessons}
          emptyText="이월 레슨이 없습니다."
          renderItem={(lesson) => (
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">{lesson.name}</p>
                <p className="text-xs text-gray-500">{lesson.lesson_tag}</p>
              </div>
              <div className="text-xs text-gray-400">
                {lesson.start_at ? formatToKoreanDate(lesson.start_at) : '-'}
              </div>
            </div>
          )}
        />
      )}
    </DashboardCard>
  );
}

export default RolloverLessonSection;

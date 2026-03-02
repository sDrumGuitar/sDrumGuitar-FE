import DashboardCard from '../DashboardCard';
import SimpleList from '../SimpleList';
import type { Course } from '@/types/course';
import { formatToKoreanDate } from '@/utils/date/formatKoreanDate';
import { CLASS_TYPE_OPTIONS } from '@/constants/course';

interface CoursesSectionProps {
  isLoading: boolean;
  totalCount: number;
  courses: Course[];
}

const getClassTypeLabel = (value: string | null) =>
  CLASS_TYPE_OPTIONS.find((opt) => opt.value === value)?.label ?? '미지정';

function CoursesSection({ isLoading, totalCount, courses }: CoursesSectionProps) {
  return (
    <DashboardCard title="수강 현황" subtitle={`총 ${totalCount}건`}>
      {isLoading ? (
        <p className="text-sm text-gray-400">수강 정보를 불러오는 중...</p>
      ) : (
        <SimpleList
          items={courses}
          emptyText="수강 데이터가 없습니다."
          renderItem={(course) => (
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {course.student.name}
                </p>
                <p className="text-xs text-gray-500">
                  {getClassTypeLabel(course.class_type)} · {course.lesson_count}회
                </p>
              </div>
              <div className="text-xs text-gray-400">
                {formatToKoreanDate(course.start_date)}
              </div>
            </div>
          )}
        />
      )}
    </DashboardCard>
  );
}

export default CoursesSection;

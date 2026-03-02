import DashboardCard from '../DashboardCard';
import SimpleList from '../SimpleList';
import type { Student } from '@/types/student';
import { formatToKoreanDate } from '@/utils/date/formatKoreanDate';

interface StudentsSectionProps {
  isLoading: boolean;
  totalCount: number;
  students: Student[];
}

function StudentsSection({
  isLoading,
  totalCount,
  students,
}: StudentsSectionProps) {
  return (
    <DashboardCard title="학생 현황" subtitle={`총 ${totalCount}명`}>
      {isLoading ? (
        <p className="text-sm text-gray-400">학생 정보를 불러오는 중...</p>
      ) : (
        <SimpleList
          items={students}
          emptyText="학생 데이터가 없습니다."
          renderItem={(student) => (
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {student.name}
                </p>
                <p className="text-xs text-gray-500">{student.phone}</p>
              </div>
              <div className="text-xs text-gray-400">
                {formatToKoreanDate(student.created_at)}
              </div>
            </div>
          )}
        />
      )}
    </DashboardCard>
  );
}

export default StudentsSection;

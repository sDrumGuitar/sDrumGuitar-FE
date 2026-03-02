import DashboardCard from '../DashboardCard';
import WeekdayBarChart from '../WeekdayBarChart';

interface LessonDistributionSectionProps {
  isLoading: boolean;
  weekdayCounts: { label: string; value: number }[];
}

function LessonDistributionSection({
  isLoading,
  weekdayCounts,
}: LessonDistributionSectionProps) {
  return (
    <DashboardCard
      title="요일별 레슨 분포"
      subtitle="이번 달 레슨 수를 요일별로 집계했습니다."
    >
      {isLoading ? (
        <p className="text-sm text-gray-400">레슨 데이터를 불러오는 중...</p>
      ) : (
        <WeekdayBarChart data={weekdayCounts} />
      )}
    </DashboardCard>
  );
}

export default LessonDistributionSection;

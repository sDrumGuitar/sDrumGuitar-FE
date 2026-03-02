import StatCard from '../StatCard';

interface LessonSummaryCardsProps {
  isLoading: boolean;
  monthTotal: number;
  todayTotal: number;
  rolloverTotal: number;
}

function LessonSummaryCards({
  isLoading,
  monthTotal,
  todayTotal,
  rolloverTotal,
}: LessonSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <StatCard title="이번 달 레슨" value={isLoading ? '...' : monthTotal} helper="건" />
      <StatCard title="오늘 레슨" value={isLoading ? '...' : todayTotal} helper="건" />
      <StatCard title="이월 레슨" value={isLoading ? '...' : rolloverTotal} helper="건" />
    </div>
  );
}

export default LessonSummaryCards;

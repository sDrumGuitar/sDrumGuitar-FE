import RefreshButton from '@/shared/button/RefreshButton';

interface DashboardHeaderProps {
  onRefresh: () => Promise<void>;
}

function DashboardHeader({ onRefresh }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">대시보드</h2>
        <p className="text-sm text-gray-500">
          오늘과 이번 달 주요 지표를 한눈에 확인하세요.
        </p>
      </div>
      <RefreshButton onRefresh={onRefresh} />
    </div>
  );
}

export default DashboardHeader;

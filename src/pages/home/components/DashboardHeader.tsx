interface DashboardHeaderProps {
  cooldownSeconds: number;
  isRefreshing: boolean;
  onRefresh: () => void;
}

function DashboardHeader({
  cooldownSeconds,
  isRefreshing,
  onRefresh,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">대시보드</h2>
        <p className="text-sm text-gray-500">
          오늘과 이번 달 주요 지표를 한눈에 확인하세요.
        </p>
      </div>
      <button
        type="button"
        onClick={onRefresh}
        disabled={isRefreshing || cooldownSeconds > 0}
        className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
          isRefreshing || cooldownSeconds > 0
            ? 'border-gray-200 text-gray-400 cursor-not-allowed'
            : 'border-primary text-primary hover:bg-primary/10 active:scale-95 active:bg-primary/20'
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          className={isRefreshing ? 'animate-spin' : ''}
        >
          <path
            d="M16 10a6 6 0 1 1-1.76-4.24"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M16 4v4h-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        최신화
        {cooldownSeconds > 0 && (
          <span className="text-[11px] text-gray-400">
            {cooldownSeconds}s
          </span>
        )}
      </button>
    </div>
  );
}

export default DashboardHeader;

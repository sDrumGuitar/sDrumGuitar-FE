interface StatCardProps {
  title: string;
  value: number | string;
  helper?: string;
}

function StatCard({ title, value, helper }: StatCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-gray-500">{title}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        {helper && <span className="text-xs text-gray-400">{helper}</span>}
      </div>
    </div>
  );
}

export default StatCard;

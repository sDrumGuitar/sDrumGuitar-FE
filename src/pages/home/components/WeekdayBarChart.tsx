interface WeekdayBarDatum {
  label: string;
  value: number;
}

interface WeekdayBarChartProps {
  data: WeekdayBarDatum[];
}

function WeekdayBarChart({ data }: WeekdayBarChartProps) {
  const maxValue = Math.max(1, ...data.map((item) => item.value));

  return (
    <div className="space-y-2">
      {data.map((item) => {
        const widthPercent = Math.round((item.value / maxValue) * 100);
        return (
          <div key={item.label} className="flex items-center gap-3">
            <div className="w-6 text-xs text-gray-500">{item.label}</div>
            <div className="flex-1">
              <div className="h-2 rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            </div>
            <div className="w-8 text-right text-xs font-medium text-gray-600">
              {item.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WeekdayBarChart;

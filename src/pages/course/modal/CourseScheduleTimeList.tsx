import type { CourseSchedule } from '@/types/course';

interface CourseScheduleTimeListProps {
  schedules: CourseSchedule[];
  onChange: (next: CourseSchedule[]) => void;
  disabled?: boolean;
}

import TimeSelect from '@/shared/form/TimeSelect';

const weekdayLabelMap: Record<CourseSchedule['weekday'], string> = {
  MON: '월',
  TUE: '화',
  WED: '수',
  THU: '목',
  FRI: '금',
  SAT: '토',
  SUN: '일',
};

function CourseScheduleTimeList({
  schedules,
  onChange,
  disabled,
}: CourseScheduleTimeListProps) {
  if (schedules.length === 0) return null;

  const handleTimeChange = (
    weekday: CourseSchedule['weekday'],
    time: string,
  ) => {
    if (disabled) return;

    const nextSchedules = schedules.map((s) =>
      s.weekday === weekday ? { ...s, time } : s,
    );

    onChange(nextSchedules);
  };

  return (
    <div className="space-y-2 pl-4">
      {schedules.map((schedule) => (
        <div key={schedule.weekday} className="flex items-center gap-3">
          <span className="w-10 font-medium">
            {weekdayLabelMap[schedule.weekday]}
          </span>

          <TimeSelect
            disabled={disabled}
            value={schedule.time}
            onChange={(v) => handleTimeChange(schedule.weekday, v)}
          />
        </div>
      ))}
    </div>
  );
}

export default CourseScheduleTimeList;

import { ATTENDANCE_TYPE } from '../types';
import { ATTENDANCE_COLORS } from '@/constants/lesson';

interface AttendanceStatusButtonsProps {
  status: string | null;
  onChange: (status: string) => void;
}

export default function AttendanceStatusButtons({
  status,
  onChange,
}: AttendanceStatusButtonsProps) {
  return (
    <div className="flex gap-2">
      {Array.from(ATTENDANCE_TYPE.entries()).map(([key, label]) => {
        const color = ATTENDANCE_COLORS.get(key) ?? '#E5E7EB';
        const isActive = status === key;

        return (
          <button
            key={String(key)}
            onClick={() => onChange(key)}
            style={{
              borderColor: color,
              backgroundColor: isActive ? color : '#FFFFFF',
              color: isActive ? '#FFFFFF' : color,
            }}
            className="px-3 border transition-colors rounded-2xl"
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

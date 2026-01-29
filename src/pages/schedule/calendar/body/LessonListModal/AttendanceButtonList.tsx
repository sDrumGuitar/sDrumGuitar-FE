import { useState } from 'react';
import { ATTENDANCE_TYPE } from './types';
import { ATTENDANCE_COLORS } from '@/constants/lesson';

interface AttendanceButtonListProps {
  attendanceStatus: string | null;
}

export default function AttendanceButtonList({
  attendanceStatus,
}: AttendanceButtonListProps) {
  const [status, setStatus] = useState(attendanceStatus);

  return (
    <div className="flex gap-2">
      {Array.from(ATTENDANCE_TYPE.entries()).map(([key, label]) => {
        const color = ATTENDANCE_COLORS.get(key) ?? '#E5E7EB';
        const isActive = status === key;

        return (
          <button
            key={String(key)}
            onClick={() => setStatus(key)}
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

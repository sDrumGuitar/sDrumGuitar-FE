import { ATTENDANCE_COLORS } from '@/constants/lesson';
import { ATTENDANCE_TYPE } from '@/types/lesson';
import { useEffect, useMemo, useRef, useState } from 'react';

interface AttendanceStatusButtonsProps {
  status: string | null;
  onChange: (status: string) => void;
  disabled?: boolean;
  disabledKeys?: string[];
}

// 출석 상태 버튼 컴포넌트 (출석, 결석, 보강, 이월)
export default function AttendanceStatusButtons({
  status,
  onChange,
  disabled = false,
  disabledKeys = [],
}: AttendanceStatusButtonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const options = useMemo(() => Array.from(ATTENDANCE_TYPE.entries()), []);
  const currentLabel = options.find(([key]) => key === status)?.[1] ?? '선택';
  const currentColor = status
    ? ATTENDANCE_COLORS.get(status) ?? '#E5E7EB'
    : '#E5E7EB';

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!dropdownRef.current || !target) return;
      if (!dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  return (
    <>
      {/* 모바일: 드롭다운 */}
      <div className="w-1/3 sm:hidden">
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => !disabled && setIsOpen((prev) => !prev)}
            disabled={disabled}
            style={{
              borderColor: currentColor,
              color: currentColor,
              backgroundColor:
                status && status !== '' ? `${currentColor}1A` : '#FFFFFF',
            }}
            className={` w-full px-3 py-1 text-sm rounded-md border text-center ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {currentLabel}
          </button>

          {isOpen && !disabled && (
            <div className="absolute z-10 mt-2 w-full rounded-xl border bg-white shadow-md overflow-hidden">
              {options.map(([key, label]) => {
                const color = ATTENDANCE_COLORS.get(key) ?? '#E5E7EB';
                const isActive = status === key;
                const isDisabled = disabledKeys.includes(key);

                return (
                  <button
                    key={String(key)}
                    type="button"
                    onClick={() => !isDisabled && onChange(key)}
                    disabled={isDisabled}
                    className={`w-full px-3 py-2 text-sm text-left transition-colors ${
                      isActive ? 'bg-gray-50' : ''
                    } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ color }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* 데스크탑: 버튼 */}
      <div className="hidden sm:flex sm:flex-wrap sm:gap-2">
        {options.map(([key, label]) => {
          const color = ATTENDANCE_COLORS.get(key) ?? '#E5E7EB';
          const isActive = status === key;
          const isDisabled = disabled || disabledKeys.includes(key);

          return (
            <button
              key={String(key)}
              onClick={() => onChange(key)}
              disabled={isDisabled}
              style={{
                borderColor: color,
                backgroundColor: isActive ? color : '#FFFFFF',
                color: isActive ? '#FFFFFF' : color,
              }}
              className={`w-full sm:w-auto px-2.5 sm:px-3 py-1 text-xs sm:text-sm whitespace-nowrap leading-none border transition-colors rounded-2xl ${
                isDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </>
  );
}

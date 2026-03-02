import { ATTENDANCE_COLORS } from '@/constants/lesson';
import { ATTENDANCE_TYPE } from '@/types/lesson';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

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
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [, setOpenDirection] = useState<'up' | 'down'>('down');
  const [menuStyle, setMenuStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const options = useMemo(() => Array.from(ATTENDANCE_TYPE.entries()), []);
  const currentLabel = options.find(([key]) => key === status)?.[1] ?? '선택';
  const currentColor = status
    ? (ATTENDANCE_COLORS.get(status) ?? '#E5E7EB')
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

    const handleScroll = () => {
      setIsOpen(false);
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const trigger = triggerRef.current;
    if (!trigger) return;
    const rect = trigger.getBoundingClientRect();
    const measure = () => {
      const menuHeight = menuRef.current?.offsetHeight ?? 0;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const nextDirection =
        menuHeight > 0 && spaceBelow < menuHeight && spaceAbove > spaceBelow
          ? 'up'
          : 'down';
      setOpenDirection(nextDirection);
      const gap = 8;
      const top =
        nextDirection === 'up'
          ? Math.max(gap, rect.top - menuHeight - gap)
          : Math.min(window.innerHeight - menuHeight - gap, rect.bottom + gap);
      setMenuStyle({
        top,
        left: rect.left,
        width: rect.width,
      });
    };

    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
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
            ref={triggerRef}
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

          {isOpen && !disabled && menuStyle
            ? createPortal(
                <div
                  ref={menuRef}
                  className="fixed z-50 rounded-md border bg-white shadow-md overflow-hidden"
                  style={{
                    top: menuStyle.top,
                    left: menuStyle.left,
                    width: menuStyle.width,
                  }}
                >
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
                </div>,
                document.body,
              )
            : null}
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

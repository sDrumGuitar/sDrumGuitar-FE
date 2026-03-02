import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: readonly SelectOption[];
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

function Select({ options, value, onChange, disabled = false }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuStyle, setMenuStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);

  const selectedLabel = useMemo(
    () => options.find((opt) => opt.value === value)?.label ?? '선택',
    [options, value],
  );

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      const inDropdown = dropdownRef.current?.contains(target) ?? false;
      const inMenu = menuRef.current?.contains(target) ?? false;
      if (!inDropdown && !inMenu) {
        setIsOpen(false);
      }
    };

    const handleClose = () => setIsOpen(false);

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('scroll', handleClose, true);
    window.addEventListener('resize', handleClose);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('scroll', handleClose, true);
      window.removeEventListener('resize', handleClose);
    };
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    setMenuStyle(null);
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
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        ref={triggerRef}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        className={` w-full rounded-sm border px-2 py-1.5 text-left text-sm transition-colors ${
          disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-400'
            : 'bg-white text-primary border-primary hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30'
        }`}
      >
        <span className={disabled ? 'text-gray-400' : 'text-primary'}>
          {selectedLabel}
        </span>
        <span
          className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${
            disabled ? 'text-gray-400' : 'text-primary'
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {isOpen && !disabled
        ? createPortal(
            <div
              ref={menuRef}
              className="fixed z-50 max-h-64 overflow-auto rounded-md border border-gray-200 bg-white shadow-lg"
              style={{
                top:
                  menuStyle?.top ??
                  triggerRef.current?.getBoundingClientRect().bottom ??
                  0,
                left:
                  menuStyle?.left ??
                  triggerRef.current?.getBoundingClientRect().left ??
                  0,
                width:
                  menuStyle?.width ??
                  triggerRef.current?.getBoundingClientRect().width ??
                  0,
                visibility: menuStyle ? 'visible' : 'hidden',
                pointerEvents: menuStyle ? 'auto' : 'none',
              }}
            >
              <button
                type="button"
                onClick={() => {
                  onChange?.('');
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                  value === '' ? 'bg-gray-50 text-gray-900' : 'text-gray-600'
                } hover:bg-gray-50`}
              >
                선택
              </button>
              {options.map((opt) => {
                const isActive = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange?.(opt.value);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-gray-700'
                    } hover:bg-gray-50`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

export default Select;

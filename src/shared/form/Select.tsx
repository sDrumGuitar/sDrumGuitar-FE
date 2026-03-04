import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
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
  placeholder?: string;
  renderValue?: (label: string, option: SelectOption | null) => ReactNode;
  renderOption?: (
    option: SelectOption,
    state: { isSelected: boolean; isActive: boolean },
  ) => ReactNode;
}

function Select({
  options,
  value,
  onChange,
  disabled = false,
  placeholder = '선택',
  renderValue,
  renderOption,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const suppressToggleRef = useRef(false);
  const listId = useId();
  const [menuStyle, setMenuStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const menuOptions = useMemo(
    () => [{ label: placeholder, value: '' }, ...options],
    [options, placeholder],
  );

  const selectedLabel = useMemo(
    () =>
      menuOptions.find((opt) => opt.value === value)?.label ?? placeholder,
    [menuOptions, placeholder, value],
  );
  const selectedOption = useMemo(
    () => menuOptions.find((opt) => opt.value === value) ?? null,
    [menuOptions, value],
  );

  useEffect(() => {
    if (!isOpen) return;
    const selectedIndex = Math.max(
      0,
      menuOptions.findIndex((opt) => opt.value === value),
    );
    setActiveIndex(selectedIndex === -1 ? 0 : selectedIndex);
  }, [isOpen, menuOptions, value]);

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

    const handleScroll = (event: Event) => {
      const target = event.target as Node | null;
      if (target && menuRef.current?.contains(target)) {
        return;
      }
      setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, menuOptions.length - 1));
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      }
      if (event.key === 'Home') {
        event.preventDefault();
        setActiveIndex(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        setActiveIndex(menuOptions.length - 1);
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const target = menuOptions[activeIndex];
        if (target) {
          handleSelect(target.value);
        }
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleScroll);
    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleScroll);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isOpen, activeIndex, menuOptions]);

  useEffect(() => {
    if (!isOpen) return;
    const raf = requestAnimationFrame(() => {
      listRef.current?.focus();
    });
    return () => cancelAnimationFrame(raf);
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
        width: Math.max(rect.width, 160),
      });
    };

    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  const handleSelect = (nextValue: string) => {
    onChange?.(nextValue);
    setIsOpen(false);
    suppressToggleRef.current = true;
    triggerRef.current?.focus();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        ref={triggerRef}
        disabled={disabled}
        onClick={() => {
          if (disabled) return;
          if (suppressToggleRef.current) {
            suppressToggleRef.current = false;
            return;
          }
          setIsOpen((prev) => !prev);
        }}
        onKeyDown={(event) => {
          if (disabled) return;
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            if (!isOpen) {
              setIsOpen(true);
            }
            return;
          }
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            if (suppressToggleRef.current) {
              suppressToggleRef.current = false;
              return;
            }
            if (!isOpen) {
              setIsOpen(true);
            }
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        className={`relative w-full rounded-sm border px-2 py-1.5 pr-9 text-left text-sm transition-colors ${
          disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-400'
            : 'bg-white text-primary border-primary hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30'
        }`}
      >
        {renderValue ? (
          renderValue(selectedLabel, selectedOption)
        ) : (
          <span
            className={`block truncate ${
              disabled ? 'text-gray-400' : 'text-primary'
            }`}
          >
            {selectedLabel}
          </span>
        )}
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
                  Math.max(
                    triggerRef.current?.getBoundingClientRect().width ?? 0,
                    160,
                  ),
                visibility: menuStyle ? 'visible' : 'hidden',
                pointerEvents: menuStyle ? 'auto' : 'none',
              }}
            >
              <ul
                id={listId}
                ref={listRef}
                role="listbox"
                tabIndex={0}
                aria-activedescendant={`${listId}-option-${activeIndex}`}
                className="flex flex-col gap-1 p-1 text-sm focus:outline-none"
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setActiveIndex((prev) =>
                      Math.min(prev + 1, menuOptions.length - 1),
                    );
                  }
                  if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    setActiveIndex((prev) => Math.max(prev - 1, 0));
                  }
                  if (event.key === 'Home') {
                    event.preventDefault();
                    setActiveIndex(0);
                  }
                  if (event.key === 'End') {
                    event.preventDefault();
                    setActiveIndex(menuOptions.length - 1);
                  }
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    const target = menuOptions[activeIndex];
                    if (target) {
                      handleSelect(target.value);
                    }
                  }
                  if (event.key === 'Escape') {
                    event.preventDefault();
                    setIsOpen(false);
                    triggerRef.current?.focus();
                  }
                }}
              >
                {menuOptions.map((opt, index) => {
                  const isSelected = opt.value === value;
                  const isActive = index === activeIndex;
                  return (
                    <li key={`${opt.value || 'empty'}-${index}`}>
                      <button
                        id={`${listId}-option-${index}`}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => handleSelect(opt.value)}
                        className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                          isSelected
                            ? 'bg-primary/10 text-primary'
                            : 'text-gray-700'
                        } ${isActive ? 'bg-gray-50' : ''} hover:bg-gray-50`}
                      >
                        {renderOption
                          ? renderOption(opt, { isSelected, isActive })
                          : opt.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

export default Select;

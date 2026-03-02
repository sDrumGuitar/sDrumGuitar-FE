export interface RadioOption<T extends string> {
  label: string;
  value: T;
}

interface RadioGroupProps<T extends string> {
  options: readonly RadioOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
}

function RadioGroup<T extends string>({
  options,
  value,
  onChange,
  disabled = false,
}: RadioGroupProps<T>) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            type="button"
            key={opt.value}
            disabled={disabled}
            onClick={() => onChange?.(opt.value)}
            aria-pressed={isActive}
            className={`flex items-center gap-2 rounded-sm border px-4 py-1.5 text-sm font-semibold transition-all ${
              disabled
                ? isActive
                  ? 'border-primary/30 bg-primary-light text-primary'
                  : 'border-primary/20 bg-gray-100 text-gray-400'
                : isActive
                  ? 'border-primary bg-primary text-white shadow-sm'
                  : 'border-primary text-gray-600 hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                isActive
                  ? disabled
                    ? 'border-primary text-primary'
                    : 'border-white text-white'
                  : 'border-current text-current'
              }`}
            >
              {isActive ? (
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 6.2L4.7 8.4L9.5 3.6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : null}
            </span>
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export default RadioGroup;

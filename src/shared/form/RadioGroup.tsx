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
    <div className="flex gap-4">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`flex items-center gap-1 ${
            disabled ? 'text-gray-400 cursor-not-allowed' : ''
          }`}
        >
          <input
            type="radio"
            value={opt.value}
            checked={value === opt.value}
            disabled={disabled}
            onChange={() => onChange?.(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

export default RadioGroup;

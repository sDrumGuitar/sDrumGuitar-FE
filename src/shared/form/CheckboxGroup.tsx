export interface CheckboxOption<T extends string> {
  label: string;
  value: T;
}

interface CheckboxGroupProps<T extends string> {
  options: readonly CheckboxOption<T>[];
  values: T[];
  onChange?: (values: T[]) => void;
  disabled?: boolean;
}

function CheckboxGroup<T extends string>({
  options,
  values,
  onChange,
  disabled = false,
}: CheckboxGroupProps<T>) {
  const toggleValue = (value: T) => {
    if (disabled) return;

    const nextValues = values.includes(value)
      ? values.filter((v) => v !== value)
      : [...values, value];

    onChange?.(nextValues);
  };

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
            type="checkbox"
            checked={values.includes(opt.value)}
            disabled={disabled}
            onChange={() => toggleValue(opt.value)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

export default CheckboxGroup;

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

function RadioGroup({
  options,
  value,
  onChange,
  disabled = false,
}: RadioGroupProps) {
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

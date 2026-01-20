interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

function Select({ options, value, onChange, disabled = false }: SelectProps) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={`
        border rounded-sm py-1 px-2
        ${
          disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'border-primary text-primary'
        }
      `}
    >
      <option value="">선택</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export default Select;

interface NumberInputProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  formatter?: (value: string) => string;
}

function NumberInput({
  value,
  onChange,
  placeholder,
  disabled = false,
  formatter,
}: NumberInputProps) {
  return (
    <input
      type="text"
      inputMode="numeric"
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => {
        if (disabled) return;
        const nextValue = formatter
          ? formatter(e.target.value)
          : e.target.value.replace(/\D/g, '');
        onChange?.(nextValue);
      }}
      className={`
        border flex-1 rounded-sm pl-2 py-1
        ${
          disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'border-primary text-primary'
        }
      `}
    />
  );
}

export default NumberInput;

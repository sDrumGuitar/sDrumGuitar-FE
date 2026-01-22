interface TextInputProps {
  type: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

function TextInput({
  type,
  value,
  onChange,
  placeholder,
  disabled = false,
}: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
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

export default TextInput;

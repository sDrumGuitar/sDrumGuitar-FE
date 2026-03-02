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
    <div className="relative">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`
          border flex-1 rounded-sm pl-2 pr-8 py-1 w-full
          ${
            disabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'border-primary text-primary'
          }
        `}
      />
      {value && !disabled && (
        <button
          type="button"
          aria-label="입력값 초기화"
          onClick={() => onChange?.('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-primary/70 hover:text-primary"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M6 6L14 14M14 6L6 14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default TextInput;

interface TextareaProps {
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

function Textarea({ value, onChange, disabled = false }: TextareaProps) {
  return (
    <div className="relative">
      <textarea
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`
          border rounded-sm p-2 pr-8 w-full resize-none
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
          className="absolute right-2 top-2 text-primary/70 hover:text-primary"
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

export default Textarea;

interface TextareaProps {
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

function Textarea({ value, onChange, disabled = false }: TextareaProps) {
  return (
    <textarea
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={`
        border rounded-sm p-2 w-full
        ${
          disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'border-primary text-primary'
        }
      `}
    />
  );
}

export default Textarea;

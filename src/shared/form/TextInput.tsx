interface TextInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

function TextInput({ value, onChange, placeholder }: TextInputProps) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      className="border flex-1 rounded-sm text-primary border-primary pl-2 py-1"
    />
  );
}

export default TextInput;

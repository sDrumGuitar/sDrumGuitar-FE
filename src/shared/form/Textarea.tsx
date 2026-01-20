interface TextareaProps {
  value?: string;
  onChange?: (value: string) => void;
}

function Textarea({ value, onChange }: TextareaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      rows={4}
      className="border flex-1 rounded-sm text-primary border-primary pl-2 py-1 resize-none"
    />
  );
}

export default Textarea;

interface NumberInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

function NumberInput({ value, onChange, placeholder }: NumberInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
    onChange?.(onlyNumber);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      className="border flex-1 rounded-sm text-primary border-primary pl-2 py-1"
    />
  );
}

export default NumberInput;

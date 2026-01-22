import Select from '@/shared/form/Select';

const HOUR_OPTIONS = Array.from({ length: 24 }, (_, i) => {
  const v = String(i).padStart(2, '0');
  return { label: v, value: v };
});

const MINUTE_OPTIONS = Array.from({ length: 12 }, (_, i) => {
  const v = String(i * 5).padStart(2, '0');
  return { label: v, value: v };
});

interface HourMinuteSelectProps {
  value: string; // "HH:mm"
  onChange: (value: string) => void;
}

function HourMinuteSelect({ value, onChange }: HourMinuteSelectProps) {
  const [hour, minute] = value ? value.split(':') : ['00', '00'];

  const handleHourChange = (h: string) => {
    onChange(`${h}:${minute}`);
  };

  const handleMinuteChange = (m: string) => {
    onChange(`${hour}:${m}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Select options={HOUR_OPTIONS} value={hour} onChange={handleHourChange} />
      <span>시</span>
      <Select
        options={MINUTE_OPTIONS}
        value={minute}
        onChange={handleMinuteChange}
      />
      <span>분</span>
    </div>
  );
}

export default HourMinuteSelect;

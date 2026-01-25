import SelectMonthSection from './SelectMonthSection';
import CarryListSection from './CarryListSection';

interface CalendarHeaderProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

function CalendarHeader({
  year,
  month,
  onPrevMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <SelectMonthSection
        year={year}
        month={month}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
        onToday={onToday}
      />
      <CarryListSection />
    </div>
  );
}
export default CalendarHeader;

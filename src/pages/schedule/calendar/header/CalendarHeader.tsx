import SelectMonthSection from './SelectMonthSection';
import CarryListSection from './CarryListSection';

function CalendarHeader() {
  return (
    <div className="flex justify-between items-center">
      <SelectMonthSection />
      <CarryListSection />
    </div>
  );
}
export default CalendarHeader;

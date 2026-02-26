import CarryListSection from './components/CarryListSection';
import SelectMonthSection from './components/SelectMonthSection';
import { useScheduleCalendarStore } from '@/store/scheduleCalendarStore';

interface CalendarHeaderProps {
  onRefreshLessons: () => Promise<void>;
}

function CalendarHeader({ onRefreshLessons }: CalendarHeaderProps) {
  const { currentYear, currentMonth, setPrevMonth, setNextMonth, setToday } =
    useScheduleCalendarStore();
  return (
    <div className="flex justify-between items-center">
      <SelectMonthSection
        year={currentYear}
        month={currentMonth}
        onPrevMonth={setPrevMonth}
        onNextMonth={setNextMonth}
        onToday={setToday}
      />
      <CarryListSection onRefreshLessons={onRefreshLessons} />
    </div>
  );
}
export default CalendarHeader;

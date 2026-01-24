import { useState } from 'react';
import dayjs from 'dayjs';
import CalendarGrid from './body/CalendarGrid';
import CalendarHeader from './header/CalendarHeader';
import { getMonthDates } from './utils';
import type { CalendarData } from './types'; // Assuming CalendarData is imported from here

function CalendarSection() {
  const [currentMonth, setCurrentMonth] = useState(dayjs().month()); // 0-indexed
  const [currentYear, setCurrentYear] = useState(dayjs().year());

  const calendarDates = getMonthDates(currentYear, currentMonth);
  const calendarData: CalendarData = {}; // Placeholder for actual fetched data

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const handleToday = () => {
    setCurrentMonth(dayjs().month());
    setCurrentYear(dayjs().year());
  };

  const onSelectDate = (date: string) => {
    console.log('Selected date:', date);
    // Future: open detail modal for the selected date
  };

  return (
    <div>
      <CalendarHeader
        year={currentYear}
        month={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />
      <CalendarGrid
        dates={calendarDates}
        dataMap={calendarData}
        onSelectDate={onSelectDate}
      />
    </div>
  );
}

export default CalendarSection;

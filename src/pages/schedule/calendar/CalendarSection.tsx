import { useState } from 'react';
import dayjs from 'dayjs';
import CalendarGrid from './body/CalendarGrid';
import CalendarHeader from './header/CalendarHeader';
import { getMonthDates } from './utils';
import type { CalendarData } from './types';

/**
 * CalendarSection
 *
 * 월 단위 캘린더의 연/월 상태와 네비게이션을 관리하는 컨테이너 컴포넌트입니다.
 * 실제 날짜 셀 렌더링은 CalendarGrid에 위임합니다.
 */

function CalendarSection() {
  // 현재 보고 있는 연 / 월 상태
  const [currentMonth, setCurrentMonth] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());

  // 현재 월에 표시할 날짜 목록 (이전/다음 달 일부 포함)
  const calendarDates = getMonthDates(currentYear, currentMonth);

  // 날짜별 수업 데이터 (서버 데이터 연동 예정)
  const calendarData: CalendarData = {};

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
    // TODO: 날짜별 수업 목록 모달 오픈
  };

  return (
    <div>
      {/* 캘린더 헤더 (월 이동, 오늘 버튼) */}
      <CalendarHeader
        year={currentYear}
        month={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />

      {/* 캘린더 본문 */}
      <CalendarGrid
        dates={calendarDates}
        dataMap={calendarData}
        onSelectDate={onSelectDate}
      />
    </div>
  );
}

export default CalendarSection;

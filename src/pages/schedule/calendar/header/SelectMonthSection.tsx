import NormalButton from '@/shared/button/NormalButton';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

interface SelectMonthSectionProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

function SelectMonthSection({
  year,
  month,
  onPrevMonth,
  onNextMonth,
  onToday,
}: SelectMonthSectionProps) {
  return (
    <div className="flex items-center gap-4">
      <SelectMonth
        year={year}
        month={month}
        onPrevMonth={onPrevMonth}
        onNextMonth={onNextMonth}
      />
      <TodayButton onToday={onToday} />
    </div>
  );
}

// 월 이동 버튼
interface SelectMonthProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const SelectMonth = ({
  year,
  month,
  onPrevMonth,
  onNextMonth,
}: SelectMonthProps) => {
  return (
    <div className="flex items-center gap-1">
      <AiFillCaretLeft
        className="hover:opacity-50 pressable cursor-pointer"
        size={20}
        onClick={onPrevMonth}
      />
      <p className="text-xl font-semibold">{`${year}년 ${month + 1}월`}</p>{' '}
      {/* month is 0-indexed */}
      <AiFillCaretRight
        className="hover:opacity-50 pressable cursor-pointer"
        size={20}
        onClick={onNextMonth}
      />
    </div>
  );
};

// 오늘 버튼
interface TodayButtonProps {
  onToday: () => void;
}

const TodayButton = ({ onToday }: TodayButtonProps) => {
  return <NormalButton text="오늘" onClick={onToday} />;
};
export default SelectMonthSection;

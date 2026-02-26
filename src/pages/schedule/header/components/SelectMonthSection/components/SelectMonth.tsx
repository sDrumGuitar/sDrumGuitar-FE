import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

interface SelectMonthProps {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

// 월 선택 컴포넌트 - 현재 년도와 월을 표시하고 이전/다음 월로 이동하는 버튼을 포함
const SelectMonth = ({
  year,
  month,
  onPrevMonth,
  onNextMonth,
}: SelectMonthProps) => {
  return (
    <div className="flex items-center gap-1">
      {/* 1. 이전 월 버튼 */}
      <AiFillCaretLeft
        className="hover:opacity-50 pressable cursor-pointer"
        size={20}
        onClick={onPrevMonth}
      />

      {/* 2. 현재 월 표시 */}
      <p className="text-xl font-semibold">{`${year}년 ${month + 1}월`}</p>

      {/* 3. 다음 월 버튼 */}
      <AiFillCaretRight
        className="hover:opacity-50 pressable cursor-pointer"
        size={20}
        onClick={onNextMonth}
      />
    </div>
  );
};

export default SelectMonth;

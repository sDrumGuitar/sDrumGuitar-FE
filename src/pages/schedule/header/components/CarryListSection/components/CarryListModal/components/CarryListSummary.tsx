import { formatToKoreanDate } from '@/utils/date/formatKoreanDate';

interface CarryListSummaryProps {
  selectedDate: string | null;
  selectedHour: string | null;
  selectedMin: string | null;
}

// 선택한 날짜와 시간 정보를 보여주는 요약 컴포넌트 - 이월 등록 전에 사용자가 선택한 날짜와 시간을 표시
const CarryListSummary = ({
  selectedDate,
  selectedHour,
  selectedMin,
}: CarryListSummaryProps) => {
  return (
    <>
      <p>선택한 날짜 : {selectedDate ? formatToKoreanDate(selectedDate) : '-'}</p>
      <p>
        선택한 시간/분 :{' '}
        {selectedHour !== null && selectedMin !== null
          ? `${selectedHour}시 ${selectedMin}분`
          : '-'}
      </p>
    </>
  );
};

export default CarryListSummary;

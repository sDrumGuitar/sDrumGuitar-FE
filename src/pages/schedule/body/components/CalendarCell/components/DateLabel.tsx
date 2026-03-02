import dayjs from 'dayjs';

// Cell 내 '일자'
export const DateLabel = ({ date }: { date: string }) => {
  return (
    <div className="text-xs font-semibold text-gray-600">
      {dayjs(date).date()}
    </div>
  );
};

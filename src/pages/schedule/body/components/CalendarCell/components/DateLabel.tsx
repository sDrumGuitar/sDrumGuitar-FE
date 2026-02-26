import dayjs from 'dayjs';

// Cell 내 '일자'
export const DateLabel = ({ date }: { date: string }) => {
  return <div className="text-sm font-medium">{dayjs(date).date()}</div>;
};

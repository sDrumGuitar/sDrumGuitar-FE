import NormalButton from '@/shared/button/NormalButton';

interface TodayButtonProps {
  onToday: () => void;
}

// 오늘 버튼 컴포넌트 - 클릭 시 현재 날짜로 이동하는 기능을 포함
const TodayButton = ({ onToday }: TodayButtonProps) => {
  return <NormalButton text="오늘" onClick={onToday} />;
};

export default TodayButton;

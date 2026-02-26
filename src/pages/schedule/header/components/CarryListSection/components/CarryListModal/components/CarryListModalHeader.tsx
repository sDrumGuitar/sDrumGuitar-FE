interface CarryListModalHeaderProps {
  onClose: () => void;
}

// 이월 목록 모달 헤더 컴포넌트 - 모달 제목과 닫기 버튼을 포함
const CarryListModalHeader = ({ onClose }: CarryListModalHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">이월 목록</h2>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default CarryListModalHeader;

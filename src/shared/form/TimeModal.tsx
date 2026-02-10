import { useTimeModalStore } from '@/store/timeModalStore';
import ModalWrapper from '../modal/ModalWrapper';
import NormalButton from '../button/NormalButton';

function TimeModal() {
  const { close, selectedHour, selectedMin, setSelectedHour, setSelectedMin } =
    useTimeModalStore();

  const baseButtonStyle = 'w-10 h-10 rounded-4xl transition-colors';

  const getButtonStyle = (isSelected: boolean) =>
    `${baseButtonStyle} ${
      isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-400'
    }`;

  const handleSave = () => {
    if (selectedHour === null || selectedMin === null) {
      alert('값을 모두 선택해주세요,.');
      return;
    }
    close();
  };
  return (
    <ModalWrapper onClose={close}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">시간 선택</h2>
        <button onClick={close}>닫기</button>
      </div>

      {/* Hour */}
      <div className="mb-4">
        <p className="font-semibold mb-2">Hour</p>
        <div className="flex gap-2 flex-wrap">
          {Array.from({ length: 12 }, (_, i) => {
            const hour = (i + 1).toString();
            return (
              <button
                key={hour}
                className={getButtonStyle(selectedHour === hour)}
                onClick={() => setSelectedHour(hour)}
              >
                {hour}
              </button>
            );
          })}
        </div>
      </div>

      {/* Min */}
      <div>
        <p className="font-semibold mb-2">Min</p>
        <div className="flex gap-2">
          {Array.from({ length: 4 }, (_, i) => {
            const min = (i * 15).toString();
            return (
              <button
                key={min}
                className={getButtonStyle(selectedMin === min)}
                onClick={() => setSelectedMin(min)}
              >
                {min}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between mt-10">
        <p>
          <span>
            선택된 시간 : {selectedHour && selectedHour}시{' '}
            {selectedMin && selectedMin}분
          </span>

          {/* <span>{formatKoreanDate(originSelectedDate?.toString() || '')}</span> */}
        </p>
        <NormalButton text="저장" onClick={handleSave} />
      </div>
    </ModalWrapper>
  );
}

export default TimeModal;

import { useLessonModalStore } from '@/store/schedule/lessonModalStore';

// 회차 정보 모달의 헤더 컴포넌트
function LessonListModalHeader() {
  const { close, selectedDate } = useLessonModalStore();
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">{selectedDate} 회차 정보</h2>
      <button onClick={close}>닫기</button>
    </div>
  );
}

export default LessonListModalHeader;

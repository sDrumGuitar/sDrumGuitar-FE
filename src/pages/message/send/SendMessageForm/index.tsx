import { useState } from 'react';
import NormalButton from '@/shared/button/NormalButton';
import CalendarModal from '@/shared/form/CalendarModal';
import TimeModal from '@/shared/form/TimeModal';
import { useDateModalStore } from '@/store/dateModalStore';
import { useMessageSendStore } from '@/store/messageSendStore';
import { useTimeModalStore } from '@/store/timeModalStore';
import { getAgeGroupLabel } from '@/utils/getAgeGroupLabel';

function SendMessageForm() {
  const [content, setContent] = useState('');
  const { selectedStudents } = useMessageSendStore();
  const isSubmitDisabled =
    selectedStudents.length === 0 || content.trim().length === 0;
  const {
    open: openDate,
    isOpen: isOpenDate,
    selectedDate,
    setSelectedDate,
  } = useDateModalStore();
  const {
    open: openTime,
    isOpen: isOpenTime,
    selectedHour,
    selectedMin,
  } = useTimeModalStore();
  const selectedStudentName =
    selectedStudents.length === 0
      ? '선택된 학생 없음'
      : selectedStudents.length === 1
        ? selectedStudents[0].name
        : `${selectedStudents[0].name} 외 ${selectedStudents.length - 1}명`;
  const selectedStudentGroup =
    selectedStudents.length === 0
      ? '구분 없음'
      : selectedStudents.length === 1
        ? getAgeGroupLabel(selectedStudents[0].age_group)
        : '구분 혼합';

  const handleSubmit = (mode: 'send' | 'reserve') => {
    if (mode === 'reserve') {
      openDate();
      return;
    }
    const payload = {
      mode,
      content,
      students: selectedStudents,
    };
    console.log(payload);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    openTime();
  };

  const handleTimeSave = () => {
    if (!selectedDate || selectedHour === null || selectedMin === null) {
      alert('날짜와 시간을 모두 선택해주세요.');
      return;
    }

    const startDate = new Date(selectedDate);
    if (Number.isNaN(startDate.getTime())) {
      alert('선택한 날짜 형식이 올바르지 않습니다.');
      return;
    }

    startDate.setHours(Number(selectedHour), Number(selectedMin), 0, 0);
    const utcDate = new Date(
      Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startDate.getHours(),
        startDate.getMinutes(),
        0,
        0,
      ),
    );

    const payload = {
      mode: 'reserve' as const,
      content,
      students: selectedStudents,
      reserved_at: utcDate.toISOString(),
    };
    console.log(payload);
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-lg font-bold text-gray-900">메시지 작성</p>
          <p className="text-xs text-gray-500">
            {selectedStudentName} · {selectedStudentGroup}
          </p>
        </div>
        <NormalButton
          text="템플릿 불러오기"
          className="bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:text-gray-900"
        />
      </div>

      <textarea
        className="w-full rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-primary focus:outline-none"
        rows={10}
        placeholder="전송할 내용을 입력하세요."
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />

      <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
        <NormalButton
          text="예약하기"
          onClick={() => handleSubmit('reserve')}
          disabled={isSubmitDisabled}
        />
        <NormalButton
          text="전송하기"
          onClick={() => handleSubmit('send')}
          disabled={isSubmitDisabled}
        />
      </div>
      {isOpenDate && <CalendarModal onSelect={handleDateSelect} />}
      {isOpenTime && <TimeModal onSave={handleTimeSave} />}
    </div>
  );
}

export default SendMessageForm;

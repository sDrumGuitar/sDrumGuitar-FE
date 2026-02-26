import { useState } from 'react';
import NormalButton from '@/shared/button/NormalButton';

function SendMessageForm() {
  const [content, setContent] = useState('');
  const selectedStudentName = '선택된 학생 없음';
  const selectedStudentGroup = '구분 없음';

  return (
    <div className="w-full">
      <div className="rounded-xl border border-gray-200 bg-white p-4">
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
            className="bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900"
          />
          <NormalButton text="전송하기" />
        </div>
      </div>
    </div>
  );
}

export default SendMessageForm;

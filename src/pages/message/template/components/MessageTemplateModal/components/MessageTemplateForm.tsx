import { useTemplateForm } from '@/pages/message/template/components/MessageTemplateModal/hooks/useTemplateForm';

// 문자 템플릿 폼 컴포넌트 - 제목과 내용 입력, 제출 버튼 포함
function MessageTemplateForm() {
  // 템플릿 폼 상태와 관련 함수들을 커스텀 훅에서 가져옴
  const { form, mode, canSubmit, setFormField, handleSubmit } =
    useTemplateForm();

  return (
    <div className="flex min-h-0 h-full flex-col gap-4">
      {/* 1. 제목 입력 필드 */}
      <input
        value={form.title}
        onChange={(event) => setFormField('title', event.target.value)}
        placeholder="제목"
        className="w-full rounded-sm bg-gray-100 px-4 py-3 text-base outline-none focus:ring-1 focus:ring-gray-300"
      />

      {/* 2. 내용 입력 필드 */}
      <textarea
        value={form.content}
        onChange={(event) => setFormField('content', event.target.value)}
        placeholder="문자 내용을 입력하세요."
        className="h-full min-h-0 w-full resize-none rounded-sm bg-gray-100 px-4 py-3 text-base leading-6 outline-none focus:ring-1 focus:ring-gray-300"
      />

      {/* 3. 제출 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="h-11 w-full rounded-sm bg-gray-200 text-base font-medium text-gray-900 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
      >
        {mode === 'CREATE' ? '추가' : '수정'}
      </button>
    </div>
  );
}

export default MessageTemplateForm;

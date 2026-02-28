import {
  MESSAGE_TEMPLATE_TYPE_LABELS,
  MESSAGE_TEMPLATE_TYPE_STYLES,
  MESSAGE_TEMPLATE_TYPES,
} from '@/constants/messageTemplate';
import { useTemplateForm } from '@/pages/message/template/components/MessageTemplateModal/hooks/useTemplateForm';
import { useEffect, useRef, useState } from 'react';

// 문자 템플릿 폼 컴포넌트 - 제목과 내용 입력, 제출 버튼 포함
function MessageTemplateForm() {
  // 템플릿 폼 상태와 관련 함수들을 커스텀 훅에서 가져옴
  const { form, mode, isSubmitEnabled, setFormField, handleSubmit } =
    useTemplateForm();
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const typeMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isTypeOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (!typeMenuRef.current) return;
      if (!typeMenuRef.current.contains(event.target as Node)) {
        setIsTypeOpen(false);
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    return () => window.removeEventListener('mousedown', handleOutsideClick);
  }, [isTypeOpen]);

  return (
    <div className="flex flex-col gap-7.5">
      <div className="flex min-h-0 h-full flex-col gap-4">
        {/* 1. 유형 입력 필드 */}
        <div className="flex flex-col gap-2" ref={typeMenuRef}>
          <div className="relative">
            <button
              id="message-template-type"
              type="button"
              onClick={() => setIsTypeOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-sm border border-transparent bg-gray-100 px-4 py-3 text-base text-gray-900 outline-none transition focus:ring-1 focus:ring-gray-300"
            >
              <span className="flex items-center gap-2 truncate">
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${MESSAGE_TEMPLATE_TYPE_STYLES[form.type].background} ${MESSAGE_TEMPLATE_TYPE_STYLES[form.type].text} ${MESSAGE_TEMPLATE_TYPE_STYLES[form.type].border}`}
                >
                  {MESSAGE_TEMPLATE_TYPE_LABELS[form.type]}
                </span>
              </span>
              <span
                className={`ml-3 text-xs text-gray-500 transition ${
                  isTypeOpen ? 'rotate-180' : ''
                }`}
                aria-hidden
              >
                ▼
              </span>
            </button>
            {isTypeOpen && (
              <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.12)]">
                <ul className="flex flex-col gap-1 p-2 text-sm">
                  {MESSAGE_TEMPLATE_TYPES.map((type) => {
                    const isSelected = form.type === type;
                    return (
                      <li key={type}>
                        <button
                          type="button"
                          onClick={() => {
                            setFormField('type', type);
                            setIsTypeOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-left transition ${
                            isSelected
                              ? 'border-primary bg-primary/10 text-primary shadow-[0_0_0_1px_rgba(97,129,216,0.35)]'
                              : 'border-transparent text-gray-700 hover:border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${MESSAGE_TEMPLATE_TYPE_STYLES[type].background} ${MESSAGE_TEMPLATE_TYPE_STYLES[type].text} ${MESSAGE_TEMPLATE_TYPE_STYLES[type].border}`}
                            >
                              {MESSAGE_TEMPLATE_TYPE_LABELS[type]}
                            </span>
                          </span>
                          {isSelected && (
                            <span className="text-xs text-primary">선택됨</span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 2. 제목 입력 필드 */}
        <input
          value={form.title}
          onChange={(event) => setFormField('title', event.target.value)}
          placeholder="제목"
          className="w-full rounded-sm bg-gray-100 px-4 py-3 text-base outline-none focus:ring-1 focus:ring-gray-300"
        />

        {/* 3. 내용 입력 필드 */}
        <textarea
          value={form.content}
          onChange={(event) => setFormField('content', event.target.value)}
          placeholder="문자 내용을 입력하세요."
          className="h-full min-h-0 w-full resize-none rounded-sm bg-gray-100 px-4 py-3 text-base leading-6 outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>

      {/* 4. 제출 버튼 */}
      <button
        onClick={handleSubmit}
        disabled={!isSubmitEnabled}
        className={`inline-flex h-12 w-full items-center justify-center rounded-sm text-base font-medium leading-none transition disabled:cursor-not-allowed ${
          isSubmitEnabled
            ? 'bg-primary text-white hover:bg-primary-light'
            : 'bg-gray-200 text-gray-900 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400'
        }`}
      >
        {mode === 'CREATE' ? '추가' : '수정'}
      </button>
    </div>
  );
}

export default MessageTemplateForm;

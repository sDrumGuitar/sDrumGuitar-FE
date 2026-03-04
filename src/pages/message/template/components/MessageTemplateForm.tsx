import {
  MESSAGE_TEMPLATE_TYPE_LABELS,
  MESSAGE_TEMPLATE_TYPE_TONES,
  MESSAGE_TEMPLATE_TYPES,
} from '@/constants/messageTemplate';
import { useTemplateForm } from '@/pages/message/template/hooks/useTemplateForm';
import Chip from '@/shared/chip/Chip';
import Select from '@/shared/form/Select';

// 문자 템플릿 폼 컴포넌트 - 제목과 내용 입력, 제출 버튼 포함
function MessageTemplateForm() {
  // 템플릿 폼 상태와 관련 함수들을 커스텀 훅에서 가져옴
  const { form, mode, isSubmitEnabled, setFormField, handleSubmit } =
    useTemplateForm();
  const typeOptions = MESSAGE_TEMPLATE_TYPES.map((type) => ({
    value: type,
    label: MESSAGE_TEMPLATE_TYPE_LABELS[type],
  }));

  return (
    <div className="flex flex-col gap-5 md:gap-7.5">
      <div className="flex min-h-0 h-full flex-col gap-4">
        {/* 1. 유형 입력 필드 */}
        <div className="flex flex-col gap-2">
          <Select
            options={typeOptions}
            value={form.type}
            onChange={(value) => setFormField('type', value)}
            renderValue={(label) => (
              <span className="flex items-center gap-2">
                <Chip
                  label={label}
                  tone={MESSAGE_TEMPLATE_TYPE_TONES[form.type]}
                />
              </span>
            )}
            renderOption={(option, { isSelected }) => (
              <span className="flex w-full items-center justify-between">
                <span className="flex items-center gap-2">
                  <Chip
                    label={option.label}
                    tone={
                      MESSAGE_TEMPLATE_TYPE_TONES[
                        option.value as (typeof MESSAGE_TEMPLATE_TYPES)[number]
                      ]
                    }
                  />
                </span>
                {isSelected && (
                  <span className="text-xs text-primary">선택됨</span>
                )}
              </span>
            )}
          />
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
          className="min-h-48 w-full resize-none rounded-sm bg-gray-100 px-4 py-3 text-base leading-6 outline-none focus:ring-1 focus:ring-gray-300 md:h-full md:min-h-0"
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

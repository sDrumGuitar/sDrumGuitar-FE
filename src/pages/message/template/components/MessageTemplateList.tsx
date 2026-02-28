import {
  MESSAGE_TEMPLATE_TYPE_LABELS,
  MESSAGE_TEMPLATE_TYPE_STYLES,
} from '@/constants/messageTemplate';
import { useTemplateList } from '@/pages/message/template/hooks/useTemplateList';
import ConfirmModal from '@/shared/modal/ConfirmModal';
import { useToastStore } from '@/store/feedback/toastStore';
import { useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';

// 문자 템플릿 목록 컴포넌트 - 템플릿 선택, 메뉴 토글, 삭제, 생성 기능 포함
function MessageTemplateList() {
  // 템플릿 목록과 관련된 상태와 함수를 커스텀 훅에서 가져옴
  const {
    templates,
    isLoadingTemplates,
    selectedTemplateId,
    onSelectTemplate,
    onDeleteTemplate,
    onOpenCreateMode,
    isSwitchConfirmOpen,
    onConfirmSwitch,
    onCancelSwitch,
  } = useTemplateList();
  const { addToast } = useToastStore();

  const [confirmTargetId, setConfirmTargetId] = useState<number | null>(null);

  const handleOpenDeleteConfirm = (templateId: number) => {
    setConfirmTargetId(templateId);
  };

  const handleCloseDeleteConfirm = () => {
    setConfirmTargetId(null);
  };

  const handleConfirmDelete = () => {
    if (confirmTargetId === null) return;
    onDeleteTemplate(confirmTargetId);
    addToast('success', '삭제되었습니다.');
    setConfirmTargetId(null);
  };

  return (
    <div className="flex min-h-0 h-full flex-col gap-4">
      {/* 1. 템플릿 목록 */}
      <div className="relative min-h-0 flex-1 overflow-y-auto pr-1 pl-1 pb-1">
        <div className="flex flex-col gap-3 py-1">
          {isLoadingTemplates && templates.length === 0 && (
            <div className="rounded-sm bg-gray-100 px-4 py-3 text-sm text-gray-500">
              템플릿을 불러오는 중입니다...
            </div>
          )}
          {templates.map((template, index) => {
            // 현재 템플릿이 선택된 템플릿인지 여부에 따라 스타일링
            const isSelected = selectedTemplateId === template.id;
            return (
              <div
                key={
                  Number.isFinite(template.id)
                    ? `template-${template.id}`
                    : `template-${index}`
                }
                role="button"
                tabIndex={0}
                onClick={() => onSelectTemplate(template.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelectTemplate(template.id);
                  }
                }}
                className={`relative flex items-center justify-between rounded-lg px-4 py-3 transition ${
                  isSelected
                    ? 'border border-primary bg-primary/10 shadow-[0_12px_28px_-16px_rgba(97,129,216,0.45)]'
                    : 'border border-transparent bg-gray-100'
                }`}
              >
                {/* 1-1. 템플릿 제목 */}
                <div className="flex flex-1 min-w-0 items-center gap-2 text-left text-base text-gray-900">
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold ${MESSAGE_TEMPLATE_TYPE_STYLES[template.type].border} ${MESSAGE_TEMPLATE_TYPE_STYLES[template.type].background} ${MESSAGE_TEMPLATE_TYPE_STYLES[template.type].text}`}
                  >
                    {MESSAGE_TEMPLATE_TYPE_LABELS[template.type]}
                  </span>
                  <span
                    className={`flex-1 truncate ${
                      isSelected
                        ? 'text-primary font-semibold'
                        : 'text-gray-900'
                    }`}
                  >
                    {template.title}
                  </span>
                </div>

                {/* 1-2. 템플릿 삭제 버튼 */}
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleOpenDeleteConfirm(template.id);
                  }}
                  className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full text-base text-rose-600 transition hover:bg-rose-50"
                  aria-label="템플릿 삭제"
                >
                  <IoTrashOutline />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. 새 템플릿 추가 버튼 */}
      <button
        onClick={onOpenCreateMode}
        disabled={isLoadingTemplates}
        className="inline-flex h-10.5 w-full items-center justify-center rounded-sm bg-gray-200 text-base font-medium leading-none text-gray-900 transition hover:bg-primary hover:text-white active:bg-primary disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
      >
        새 템플릿
      </button>

      <ConfirmModal
        isOpen={confirmTargetId !== null}
        title="삭제하시겠습니까?"
        description="삭제한 템플릿은 복구할 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
        isDanger
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDeleteConfirm}
      />

      <ConfirmModal
        isOpen={isSwitchConfirmOpen}
        title="저장되지 않은 변경사항이 있습니다."
        description="저장 후 템플릿을 전환할까요?"
        confirmText="저장 후 전환"
        cancelText="그대로 전환"
        onConfirm={onConfirmSwitch}
        onCancel={onCancelSwitch}
      />
    </div>
  );
}

export default MessageTemplateList;

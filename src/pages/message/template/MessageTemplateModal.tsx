import ModalWrapper from '@/shared/modal/ModalWrapper';
import { useMessageTemplateModalStore } from '@/store/messageTemplateModalStore';
import { useMessageTemplateStore } from '@/store/messageTemplateStore';
import { useEffect } from 'react';

function MessageTemplateModal() {
  const { close } = useMessageTemplateModalStore();
  const {
    templates,
    selectedTemplateId,
    mode,
    form,
    menuOpenId,
    selectTemplate,
    setFormField,
    openCreateMode,
    toggleMenu,
    closeMenu,
    addTemplate,
    updateTemplate,
    deleteTemplate,
  } = useMessageTemplateStore();

  const handleSubmit = () => {
    if (mode === 'CREATE') {
      addTemplate();
      return;
    }
    updateTemplate();
  };

  const getIsDirty = () => {
    if (mode === 'CREATE') {
      return form.title.trim().length > 0 || form.content.trim().length > 0;
    }

    if (!selectedTemplateId) return false;
    const selectedTemplate = templates.find(
      (template) => template.id === selectedTemplateId,
    );
    if (!selectedTemplate) return false;

    return (
      selectedTemplate.title !== form.title ||
      selectedTemplate.content !== form.content
    );
  };

  const handleSelectTemplate = (nextTemplateId: number) => {
    if (selectedTemplateId === nextTemplateId) return;

    const isDirty = getIsDirty();
    if (!isDirty) {
      selectTemplate(nextTemplateId);
      return;
    }

    const shouldSave = window.confirm(
      '저장되지 않은 변경사항이 있습니다.\n저장 후 템플릿을 전환할까요?',
    );

    if (shouldSave) {
      const canSubmit = form.title.trim() && form.content.trim();
      if (!canSubmit) {
        window.alert('제목과 내용을 모두 입력해야 저장할 수 있습니다.');
        return;
      }
      handleSubmit();
    }

    selectTemplate(nextTemplateId);
  };

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.closest('[data-template-menu-trigger]') ||
        target.closest('[data-template-menu-panel]')
      ) {
        return;
      }
      closeMenu();
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [closeMenu]);

  return (
    <ModalWrapper onClose={close}>
      <div className="flex h-[620px] flex-col overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">문자 템플릿</h2>
          <button className="text-sm text-gray-500 hover:text-gray-800" onClick={close}>
            닫기
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.15fr] gap-6">
          <div className="flex min-h-0 h-full flex-col gap-4">
            <input
              value={form.title}
              onChange={(event) => setFormField('title', event.target.value)}
              placeholder="제목"
              className="w-full rounded-sm bg-gray-100 px-4 py-3 text-base outline-none focus:ring-1 focus:ring-gray-300"
            />
            <textarea
              value={form.content}
              onChange={(event) => setFormField('content', event.target.value)}
              placeholder="문자 내용을 입력하세요."
              className="h-full min-h-0 w-full resize-none rounded-sm bg-gray-100 px-4 py-3 text-base leading-6 outline-none focus:ring-1 focus:ring-gray-300"
            />
            <button
              onClick={handleSubmit}
              disabled={!form.title.trim() || !form.content.trim()}
              className="h-11 w-full rounded-sm bg-gray-200 text-base font-medium text-gray-900 transition hover:bg-gray-300 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
            >
              {mode === 'CREATE' ? '추가' : '수정'}
            </button>
          </div>

          <div className="relative flex min-h-0 h-full flex-col gap-3 overflow-y-auto pr-1">
            {templates.map((template) => {
              const isSelected = selectedTemplateId === template.id;
              return (
                <div
                  key={template.id}
                  className={`relative flex items-center justify-between rounded-sm px-4 py-3 ${
                    isSelected ? 'bg-emerald-400' : 'bg-gray-100'
                  }`}
                >
                  <button
                    onClick={() => handleSelectTemplate(template.id)}
                    className="flex-1 text-left text-base text-gray-900"
                  >
                    {template.title}
                  </button>

                  <button
                    data-template-menu-trigger
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleMenu(template.id);
                    }}
                    className="ml-2 px-2 text-lg leading-none text-gray-700"
                  >
                    ...
                  </button>

                  {menuOpenId === template.id && (
                    <div
                      data-template-menu-panel
                      className="absolute right-0 top-12 z-20 w-20 rounded-md bg-white py-1 shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
                    >
                      <button
                        onClick={() => handleSelectTemplate(template.id)}
                        className="w-full px-3 py-1 text-left text-sm text-gray-900 hover:bg-gray-100"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => deleteTemplate(template.id)}
                        className="w-full px-3 py-1 text-left text-sm text-gray-900 hover:bg-gray-100"
                      >
                        삭제
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              onClick={openCreateMode}
              className="mt-auto h-11 rounded-sm border border-gray-300 bg-white text-sm text-gray-700 transition hover:bg-gray-50"
            >
              새 템플릿
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default MessageTemplateModal;

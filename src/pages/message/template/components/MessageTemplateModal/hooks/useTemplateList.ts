import { useMessageTemplateStore } from '@/store/message/messageTemplateStore';

const getIsDirty = (
  mode: 'CREATE' | 'UPDATE',
  form: { title: string; content: string },
  templates: { id: number; title: string; content: string }[],
  selectedTemplateId: number | null,
) => {
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

const getCanSubmit = (form: { title: string; content: string }) =>
  Boolean(form.title.trim() && form.content.trim());

export const useTemplateList = () => {
  const templates = useMessageTemplateStore((state) => state.templates);
  const selectedTemplateId = useMessageTemplateStore(
    (state) => state.selectedTemplateId,
  );
  const menuOpenId = useMessageTemplateStore((state) => state.menuOpenId);
  const mode = useMessageTemplateStore((state) => state.mode);
  const form = useMessageTemplateStore((state) => state.form);
  const selectTemplate = useMessageTemplateStore(
    (state) => state.selectTemplate,
  );
  const toggleMenu = useMessageTemplateStore((state) => state.toggleMenu);
  const deleteTemplate = useMessageTemplateStore((state) => state.deleteTemplate);
  const openCreateMode = useMessageTemplateStore(
    (state) => state.openCreateMode,
  );
  const addTemplate = useMessageTemplateStore((state) => state.addTemplate);
  const updateTemplate = useMessageTemplateStore((state) => state.updateTemplate);

  const handleSubmit = () => {
    if (mode === 'CREATE') {
      addTemplate();
      return;
    }
    updateTemplate();
  };

  const handleSelectTemplate = (nextTemplateId: number) => {
    if (selectedTemplateId === nextTemplateId) return;

    const isDirty = getIsDirty(
      mode,
      form,
      templates,
      selectedTemplateId,
    );
    if (!isDirty) {
      selectTemplate(nextTemplateId);
      return;
    }

    const shouldSave = window.confirm(
      '저장되지 않은 변경사항이 있습니다.\n저장 후 템플릿을 전환할까요?',
    );

    if (shouldSave) {
      const canSubmit = getCanSubmit(form);
      if (!canSubmit) {
        window.alert('제목과 내용을 모두 입력해야 저장할 수 있습니다.');
        return;
      }
      handleSubmit();
    }

    selectTemplate(nextTemplateId);
  };

  return {
    templates,
    selectedTemplateId,
    menuOpenId,
    onSelectTemplate: handleSelectTemplate,
    onToggleMenu: toggleMenu,
    onDeleteTemplate: deleteTemplate,
    onOpenCreateMode: openCreateMode,
  };
};

import { useMessageTemplateStore } from '@/store/message/messageTemplateStore';

const getCanSubmit = (form: { type: string; title: string; content: string }) =>
  Boolean(form.type.trim() && form.title.trim() && form.content.trim());

const getIsDirty = (
  form: { type: string; title: string; content: string },
  templates: { id: number; type: string; title: string; content: string }[],
  selectedTemplateId: number | null,
) => {
  if (!selectedTemplateId) return false;
  const selectedTemplate = templates.find(
    (template) => template.id === selectedTemplateId,
  );
  if (!selectedTemplate) return false;

  return (
    selectedTemplate.type !== form.type ||
    selectedTemplate.title !== form.title ||
    selectedTemplate.content !== form.content
  );
};

export const useTemplateForm = () => {
  const mode = useMessageTemplateStore((state) => state.mode);
  const form = useMessageTemplateStore((state) => state.form);
  const templates = useMessageTemplateStore((state) => state.templates);
  const selectedTemplateId = useMessageTemplateStore(
    (state) => state.selectedTemplateId,
  );
  const setFormField = useMessageTemplateStore((state) => state.setFormField);
  const addTemplate = useMessageTemplateStore((state) => state.addTemplate);
  const updateTemplate = useMessageTemplateStore((state) => state.updateTemplate);

  const handleSubmit = () => {
    if (mode === 'CREATE') {
      addTemplate();
      return;
    }
    updateTemplate();
  };

  const canSubmit = getCanSubmit(form);
  const isDirty = getIsDirty(form, templates, selectedTemplateId);
  const isSubmitEnabled =
    mode === 'CREATE' ? canSubmit : canSubmit && isDirty;

  return {
    form,
    mode,
    canSubmit,
    isDirty,
    isSubmitEnabled,
    setFormField,
    handleSubmit,
  };
};

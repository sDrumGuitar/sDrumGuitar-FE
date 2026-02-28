import { useMessageTemplateStore } from '@/store/message/messageTemplateStore';

const getCanSubmit = (form: { type: string; title: string; content: string }) =>
  Boolean(form.type.trim() && form.title.trim() && form.content.trim());

export const useTemplateForm = () => {
  const mode = useMessageTemplateStore((state) => state.mode);
  const form = useMessageTemplateStore((state) => state.form);
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

  return {
    form,
    mode,
    canSubmit: getCanSubmit(form),
    setFormField,
    handleSubmit,
  };
};

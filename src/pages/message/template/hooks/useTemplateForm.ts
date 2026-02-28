import { useMessageTemplateStore } from '@/store/message/messageTemplateStore';
import {
  canSubmitTemplateForm,
  isTemplateFormDirtyAgainstSelected,
} from './templateFormUtils';

// 템플릿 폼 상태와 제출 로직을 제공하는 훅
export const useTemplateForm = () => {
  const mode = useMessageTemplateStore((state) => state.mode);
  const form = useMessageTemplateStore((state) => state.form);
  const templates = useMessageTemplateStore((state) => state.templates);
  const selectedTemplateId = useMessageTemplateStore(
    (state) => state.selectedTemplateId,
  );
  const setFormField = useMessageTemplateStore((state) => state.setFormField);
  const addTemplate = useMessageTemplateStore((state) => state.addTemplate);
  const updateTemplate = useMessageTemplateStore(
    (state) => state.updateTemplate,
  );

  // 모드에 따라 생성/수정 제출을 처리
  const handleSubmit = () => {
    if (mode === 'CREATE') {
      addTemplate();
      return;
    }
    updateTemplate();
  };

  const canSubmit = canSubmitTemplateForm(form);
  const isDirty = isTemplateFormDirtyAgainstSelected(
    form,
    templates,
    selectedTemplateId,
  );
  const isSubmitEnabled = mode === 'CREATE' ? canSubmit : canSubmit && isDirty;

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

import { useMessageTemplateStore } from '@/store/message/messageTemplateStore';
import { useState } from 'react';
import {
  canSubmitTemplateForm,
  isTemplateFormDirtyAgainstSelected,
  isTemplateFormDirtyForCreate,
} from './templateFormUtils';
import { useToastStore } from '@/store/feedback/toastStore';

// 템플릿 목록과 선택 동작을 다루는 훅
export const useTemplateList = () => {
  const templates = useMessageTemplateStore((state) => state.templates);
  const isLoadingTemplates = useMessageTemplateStore(
    (state) => state.isLoadingTemplates,
  );
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
  const deleteTemplate = useMessageTemplateStore(
    (state) => state.deleteTemplate,
  );
  const openCreateMode = useMessageTemplateStore(
    (state) => state.openCreateMode,
  );
  const addTemplate = useMessageTemplateStore((state) => state.addTemplate);
  const updateTemplate = useMessageTemplateStore(
    (state) => state.updateTemplate,
  );
  const [switchConfirmOpen, setSwitchConfirmOpen] = useState(false);
  const [pendingTemplateId, setPendingTemplateId] = useState<number | null>(
    null,
  );

  // 현재 모드에 따라 생성/수정을 수행
  const handleSubmit = async () => {
    if (mode === 'CREATE') {
      await addTemplate();
      return;
    }
    updateTemplate();
  };

  // 변경사항이 있을 경우 확인 후 템플릿을 전환
  const handleSelectTemplate = async (nextTemplateId: number) => {
    if (selectedTemplateId === nextTemplateId) return;

    const isDirty =
      mode === 'CREATE'
        ? isTemplateFormDirtyForCreate(form)
        : isTemplateFormDirtyAgainstSelected(
            form,
            templates,
            selectedTemplateId,
          );
    if (!isDirty) {
      selectTemplate(nextTemplateId);
      return;
    }

    setPendingTemplateId(nextTemplateId);
    setSwitchConfirmOpen(true);
  };

  const handleConfirmSwitch = async () => {
    const { addToast } = useToastStore();
    if (pendingTemplateId === null) return;
    const canSubmit = canSubmitTemplateForm(form);
    if (!canSubmit) {
      addToast('error', '제목과 내용을 모두 입력해야 저장할 수 있습니다.');
      return;
    }
    await handleSubmit();
    selectTemplate(pendingTemplateId);
    setPendingTemplateId(null);
    setSwitchConfirmOpen(false);
  };

  const handleCancelSwitch = () => {
    if (pendingTemplateId === null) return;
    selectTemplate(pendingTemplateId);
    setPendingTemplateId(null);
    setSwitchConfirmOpen(false);
  };

  return {
    templates,
    isLoadingTemplates,
    selectedTemplateId,
    menuOpenId,
    onSelectTemplate: handleSelectTemplate,
    onToggleMenu: toggleMenu,
    onDeleteTemplate: deleteTemplate,
    onOpenCreateMode: openCreateMode,
    isSwitchConfirmOpen: switchConfirmOpen,
    onConfirmSwitch: handleConfirmSwitch,
    onCancelSwitch: handleCancelSwitch,
  };
};

import { useMessageTemplateStore } from '@/store/message/messageTemplateStore';
import { useState } from 'react';
import {
  isTemplateFormDirtyAgainstSelected,
  isTemplateFormDirtyForCreate,
} from './templateFormUtils';

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
  const [switchConfirmOpen, setSwitchConfirmOpen] = useState(false);
  const [pendingTemplateId, setPendingTemplateId] = useState<number | null>(
    null,
  );

  // 변경사항이 있을 경우 확인 후 템플릿을 전환
  const handleSelectTemplate = async (nextTemplateId: number) => {
    const isDirty =
      mode === 'CREATE'
        ? isTemplateFormDirtyForCreate(form)
        : isTemplateFormDirtyAgainstSelected(
            form,
            templates,
            selectedTemplateId,
          );
    if (selectedTemplateId === nextTemplateId) {
      if (!isDirty) {
        selectTemplate(nextTemplateId);
        return;
      }

      setPendingTemplateId(nextTemplateId);
      setSwitchConfirmOpen(true);
      return;
    }
    if (!isDirty) {
      selectTemplate(nextTemplateId);
      return;
    }

    setPendingTemplateId(nextTemplateId);
    setSwitchConfirmOpen(true);
  };

  const handleConfirmSwitch = () => {
    if (pendingTemplateId === null) return;
    // 변경 사항을 버리고 선택 전환
    selectTemplate(pendingTemplateId);
    setPendingTemplateId(null);
    setSwitchConfirmOpen(false);
  };

  const handleCancelSwitch = () => {
    if (pendingTemplateId === null) return;
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

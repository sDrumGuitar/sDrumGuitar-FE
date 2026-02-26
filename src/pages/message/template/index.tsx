import ModalOpenButton from '@/shared/modal/ModalOpenButton';
import { useMessageTemplateModalStore } from '@/store/messageTemplateModalStore';
import { useMessageTemplateStore } from '@/store/messageTemplateStore';
import MessageTemplateModal from './MessageTemplateModal';

function MessageTemplatePage() {
  const { isOpen, open } = useMessageTemplateModalStore();
  const { templates, openCreateMode } = useMessageTemplateStore();

  const handleOpenTemplateModal = () => {
    openCreateMode();
    open();
  };

  return (
    <div>
      <ModalOpenButton text="템플릿 관리" openModal={handleOpenTemplateModal} />
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-base font-semibold text-gray-900">문자 템플릿</h3>
        <p className="mt-2 text-sm text-gray-600">
          저장된 템플릿 {templates.length}개
        </p>
      </div>
      {isOpen && <MessageTemplateModal />}
    </div>
  );
}
export default MessageTemplatePage;

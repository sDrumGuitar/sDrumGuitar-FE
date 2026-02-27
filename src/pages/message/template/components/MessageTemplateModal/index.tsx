import ModalWrapper from '@/shared/modal/ModalWrapper';
import { useMessageTemplateModalStore } from '@/store/message/messageTemplateModalStore';
import MessageTemplateForm from '@/pages/message/template/components/MessageTemplateModal/components/MessageTemplateForm';
import MessageTemplateHeader from '@/pages/message/template/components/MessageTemplateModal/components/MessageTemplateHeader';
import MessageTemplateList from '@/pages/message/template/components/MessageTemplateModal/components/MessageTemplateList';

// 문자 템플릿 관리 모달 컴포넌트
function MessageTemplateModal() {
  // 모달을 닫는 함수
  const { close } = useMessageTemplateModalStore();

  return (
    <ModalWrapper onClose={close}>
      <div className="flex h-155 flex-col overflow-hidden">
        {/* 1. 모달 헤더 컴포넌트 - 닫기 버튼 포함 */}
        <MessageTemplateHeader onClose={close} />

        {/* 2. 모달 본문 컴포넌트 - 폼과 리스트 컴포넌트 포함 */}
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.15fr] gap-6">
          <MessageTemplateForm />
          <MessageTemplateList />
        </div>
      </div>
    </ModalWrapper>
  );
}

export default MessageTemplateModal;

import ModalOpenButton from '@/shared/modal/ModalOpenButton';
import { useMessageTemplateModalStore } from '@/store/message/messageTemplateModalStore';
import { useMessageTemplateStore } from '@/store/message/messageTemplateStore';
import MessageTemplateModal from './components/MessageTemplateModal';

// 문자 템플릿 관리 페이지 컴포넌트
function MessageTemplatePage() {
  // 템플릿 모달의 열림 상태와 열기 함수를 스토어
  const { isOpen, open } = useMessageTemplateModalStore();
  const { templates, openCreateMode } = useMessageTemplateStore();

  // 템플릿 관리 모달을 여는 함수 - 생성 모드로 설정 후 모달 열기
  const handleOpenTemplateModal = () => {
    openCreateMode();
    open();
  };

  return (
    <div>
      {/* 1. 템플릿 관리 */}
      <ModalOpenButton text="템플릿 관리" openModal={handleOpenTemplateModal} />

      {/* 2. 템플릿 목록 현황 */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="text-base font-semibold text-gray-900">문자 템플릿</h3>
        <p className="mt-2 text-sm text-gray-600">
          저장된 템플릿 {templates.length}개
        </p>
      </div>

      {/* 3. 템플릿 모달 */}
      {isOpen && <MessageTemplateModal />}
    </div>
  );
}
export default MessageTemplatePage;

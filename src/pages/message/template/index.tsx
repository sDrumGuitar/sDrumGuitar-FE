import MessageTemplateModal from './components/MessageTemplateModal';

// 문자 템플릿 관리 페이지 컴포넌트
function MessageTemplatePage() {
  return (
    <div>
      {/* 1. 템플릿 편집 영역 */}
      <MessageTemplateModal />
    </div>
  );
}
export default MessageTemplatePage;

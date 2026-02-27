import MessageTemplateForm from '@/pages/message/template/components/MessageTemplateModal/components/MessageTemplateForm';
import MessageTemplateHeader from '@/pages/message/template/components/MessageTemplateModal/components/MessageTemplateHeader';
import MessageTemplateList from '@/pages/message/template/components/MessageTemplateModal/components/MessageTemplateList';

// 문자 템플릿 관리 모달 컴포넌트
function MessageTemplateModal() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex h-155 flex-col overflow-hidden">
        {/* 1. 페이지 헤더 컴포넌트 */}
        <MessageTemplateHeader />

        {/* 2. 본문 컴포넌트 - 폼과 리스트 컴포넌트 포함 */}
        <div className="grid min-h-0 flex-1 grid-cols-[1fr_1.15fr] gap-6">
          <MessageTemplateForm />
          <MessageTemplateList />
        </div>
      </div>
    </div>
  );
}

export default MessageTemplateModal;

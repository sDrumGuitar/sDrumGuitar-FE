import { useMessageTemplateStore } from '@/store/message/messageTemplateStore';
import { useEffect } from 'react';
import MessageTemplateHeader from './components/MessageTemplateHeader';
import MessageTemplateList from './components/MessageTemplateList';
import MessageTemplateForm from './components/MessageTemplateForm';

// 문자 템플릿 관리 페이지 컴포넌트
function MessageTemplatePage() {
  const fetchTemplates = useMessageTemplateStore(
    (state) => state.fetchTemplates,
  );

  useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
      <div className="flex h-auto flex-col overflow-hidden md:h-155">
        {/* 1. 페이지 헤더 컴포넌트 */}
        <MessageTemplateHeader />

        {/* 2. 본문 컴포넌트 - 폼과 리스트 컴포넌트 포함 */}
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-10 md:grid-cols-[1fr_1.15fr] md:gap-6">
          <MessageTemplateList />
          <hr className="border-gray-200 md:hidden" />
          <MessageTemplateForm />
        </div>
      </div>
    </div>
  );
}
export default MessageTemplatePage;

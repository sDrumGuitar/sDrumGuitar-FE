import { useMessageTemplateStore } from '@/store/message/messageTemplateStore';

interface MessageTemplateHeaderProps {
  onClose?: () => void;
}

// 문자 템플릿 관리 모달의 헤더 컴포넌트 - 제목과 닫기 버튼을 포함
function MessageTemplateHeader({ onClose }: MessageTemplateHeaderProps) {
  const templateCount = useMessageTemplateStore(
    (state) => state.templates.length,
  );

  return (
    <div className="mb-4 flex items-center justify-between">
      {/* 1. 템플릿 관리 모달 헤더 */}
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold text-gray-900">문자 템플릿 목록</h2>
        <span className="text-sm text-gray-500">
          저장된 템플릿 {templateCount}개
        </span>
      </div>

      {/* 2. 닫기 버튼 */}
      {onClose ? (
        <button
          className="text-sm text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          닫기
        </button>
      ) : null}
    </div>
  );
}

export default MessageTemplateHeader;

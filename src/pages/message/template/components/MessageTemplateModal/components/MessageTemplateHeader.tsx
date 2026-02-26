interface MessageTemplateHeaderProps {
  onClose: () => void;
}

// 문자 템플릿 관리 모달의 헤더 컴포넌트 - 제목과 닫기 버튼을 포함
function MessageTemplateHeader({ onClose }: MessageTemplateHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      {/* 1. 템플릿 관리 모달 헤더 */}
      <h2 className="text-lg font-bold text-gray-900">문자 템플릿</h2>

      {/* 2. 닫기 버튼 */}
      <button
        className="text-sm text-gray-500 hover:text-gray-800"
        onClick={onClose}
      >
        닫기
      </button>
    </div>
  );
}

export default MessageTemplateHeader;

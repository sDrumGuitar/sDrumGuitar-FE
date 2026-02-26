import { useTemplateList } from '@/pages/message/template/components/MessageTemplateModal/hooks/useTemplateList';
import { useTemplateMenuClose } from '@/pages/message/template/components/MessageTemplateModal/hooks/useTemplateMenuClose';

// 문자 템플릿 목록 컴포넌트 - 템플릿 선택, 메뉴 토글, 삭제, 생성 기능 포함
function MessageTemplateList() {
  // 템플릿 목록과 관련된 상태와 함수를 커스텀 훅에서 가져옴
  const {
    templates,
    selectedTemplateId,
    menuOpenId,
    onSelectTemplate,
    onToggleMenu,
    onDeleteTemplate,
    onOpenCreateMode,
  } = useTemplateList();

  // 템플릿 메뉴 닫기 훅 - 메뉴 외부 클릭 시 메뉴 닫기 기능 포함
  useTemplateMenuClose();

  return (
    <div className="flex min-h-0 h-full flex-col gap-4">
      {/* 1. 템플릿 목록 */}
      <div className="relative min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col gap-3">
          {templates.map((template) => {
            // 현재 템플릿이 선택된 템플릿인지 여부에 따라 스타일링
            const isSelected = selectedTemplateId === template.id;
            return (
              <div
                key={template.id}
                className={`relative flex items-center justify-between rounded-sm px-4 py-3 ${
                  isSelected ? 'bg-emerald-400' : 'bg-gray-100'
                }`}
              >
                {/* 1-1. 템플릿 제목 */}
                <button
                  onClick={() => onSelectTemplate(template.id)}
                  className="flex-1 text-left text-base text-gray-900"
                >
                  {template.title}
                </button>

                {/* 1-2. 템플릿 메뉴 토글 버튼 */}
                <button
                  data-template-menu-trigger
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleMenu(template.id);
                  }}
                  className="ml-2 px-2 text-lg leading-none text-gray-700"
                >
                  ...
                </button>

                {/* 1-3. 템플릿 메뉴 패널 */}
                {menuOpenId === template.id && (
                  <div
                    data-template-menu-panel
                    className="absolute right-0 top-12 z-20 w-20 rounded-md bg-white py-1 shadow-[0_4px_10px_rgba(0,0,0,0.25)]"
                  >
                    <button
                      onClick={() => onSelectTemplate(template.id)}
                      className="w-full px-3 py-1 text-left text-sm text-gray-900 hover:bg-gray-100"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => onDeleteTemplate(template.id)}
                      className="w-full px-3 py-1 text-left text-sm text-gray-900 hover:bg-gray-100"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. 새 템플릿 추가 버튼 */}
      <button
        onClick={onOpenCreateMode}
        className="h-11 w-full rounded-sm bg-gray-200 text-base font-medium text-gray-900 transition hover:bg-gray-300"
      >
        새 템플릿
      </button>
    </div>
  );
}

export default MessageTemplateList;

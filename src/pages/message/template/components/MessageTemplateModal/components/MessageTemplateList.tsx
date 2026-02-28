import {
  MESSAGE_TEMPLATE_TYPE_LABELS,
  MESSAGE_TEMPLATE_TYPE_STYLES,
} from '@/constants/messageTemplate';
import { useTemplateList } from '@/pages/message/template/components/MessageTemplateModal/hooks/useTemplateList';
import { useTemplateMenuClose } from '@/pages/message/template/components/MessageTemplateModal/hooks/useTemplateMenuClose';
import { IoIosMore } from 'react-icons/io';

// 문자 템플릿 목록 컴포넌트 - 템플릿 선택, 메뉴 토글, 삭제, 생성 기능 포함
function MessageTemplateList() {
  // 템플릿 목록과 관련된 상태와 함수를 커스텀 훅에서 가져옴
  const {
    templates,
    isLoadingTemplates,
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
          {isLoadingTemplates && templates.length === 0 && (
            <div className="rounded-sm bg-gray-100 px-4 py-3 text-sm text-gray-500">
              템플릿을 불러오는 중입니다...
            </div>
          )}
          {templates.map((template, index) => {
            // 현재 템플릿이 선택된 템플릿인지 여부에 따라 스타일링
            const isSelected = selectedTemplateId === template.id;
            return (
              <div
                key={
                  Number.isFinite(template.id)
                    ? `template-${template.id}`
                    : `template-${index}`
                }
                className={`relative flex items-center justify-between rounded-lg px-4 py-3 transition ${
                  isSelected
                    ? 'border border-emerald-200 bg-emerald-50 shadow-[0_6px_16px_rgba(16,185,129,0.2)]'
                    : 'border border-transparent bg-gray-100'
                }`}
              >
                {/* 1-1. 템플릿 제목 */}
                <button
                  onClick={() => onSelectTemplate(template.id)}
                  className="flex flex-1 items-center gap-2 text-left text-base text-gray-900"
                >
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                      isSelected
                        ? 'border-emerald-400 bg-white/90 text-emerald-700'
                        : MESSAGE_TEMPLATE_TYPE_STYLES[template.type].border
                    } ${
                      isSelected
                        ? 'bg-white/90 text-emerald-700'
                        : `${MESSAGE_TEMPLATE_TYPE_STYLES[template.type].background} ${MESSAGE_TEMPLATE_TYPE_STYLES[template.type].text}`
                    }`}
                  >
                    {MESSAGE_TEMPLATE_TYPE_LABELS[template.type]}
                  </span>
                  <span
                    className={`text-gray-900 ${
                      isSelected ? 'font-semibold' : ''
                    }`}
                  >
                    {template.title}
                  </span>
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
                  <IoIosMore />
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
        disabled={isLoadingTemplates}
        className="h-11 w-full rounded-sm bg-gray-200 text-base font-medium text-gray-900 transition hover:bg-gray-300"
      >
        새 템플릿
      </button>
    </div>
  );
}

export default MessageTemplateList;

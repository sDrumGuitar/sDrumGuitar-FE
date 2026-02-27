import NormalButton from '@/shared/button/NormalButton';
import type { MessageTemplate } from '@/types/messageTemplate';

interface SendMessageHeaderProps {
  selectedStudentName: string;
  selectedStudentGroup: string;
  templates: MessageTemplate[];
  selectedTemplateId: number | '';
  onSelectTemplate: (id: number | '') => void;
  onApplyTemplate: () => void;
}

function SendMessageHeader({
  selectedStudentName,
  selectedStudentGroup,
  templates,
  selectedTemplateId,
  onSelectTemplate,
  onApplyTemplate,
}: SendMessageHeaderProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-lg font-bold text-gray-900">메시지 작성</p>
        <p className="text-xs text-gray-500">
          {selectedStudentName} · {selectedStudentGroup}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={selectedTemplateId}
          onChange={(event) => {
            const value = event.target.value;
            onSelectTemplate(value ? Number(value) : '');
          }}
          className="h-10 min-w-48 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-primary"
        >
          <option value="">템플릿 선택</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.title}
            </option>
          ))}
        </select>
        <NormalButton
          text="템플릿 불러오기"
          onClick={onApplyTemplate}
          className="h-10 px-4"
        />
      </div>
    </div>
  );
}

export default SendMessageHeader;

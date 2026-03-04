import NormalButton from '@/shared/button/NormalButton';
import Chip from '@/shared/chip/Chip';
import Select from '@/shared/form/Select';
import {
  MESSAGE_TEMPLATE_TYPE_LABELS,
  MESSAGE_TEMPLATE_TYPE_TONES,
} from '@/constants/messageTemplate';
import type { MessageTemplate } from '@/types/messageTemplate';

interface SendMessageHeaderProps {
  selectedStudentName: string;
  selectedStudentGroup: string;
  templates: MessageTemplate[];
  selectedTemplateId: string;
  onSelectTemplate: (id: string) => void;
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
  const options = templates.map((template) => ({
    value: String(template.id),
    label: template.title,
  }));
  const templateMap = new Map(
    templates.map((template) => [String(template.id), template]),
  );

  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between flex-wrap">
      <div>
        <p className="text-lg font-bold text-gray-900">메시지 작성</p>
        <p className="text-xs text-gray-500">
          {selectedStudentName} · {selectedStudentGroup}
        </p>
      </div>
      <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
        <div className="w-full md:min-w-48">
          <Select
            options={options}
            value={selectedTemplateId}
            onChange={onSelectTemplate}
            placeholder="템플릿 선택"
            renderValue={(label, option) => {
              if (!option || option.value === '') {
                return <span className="text-gray-500">템플릿 선택</span>;
              }
              const template = templateMap.get(option.value);
              if (!template) return <span className="text-gray-500">{label}</span>;
              return (
                <span className="flex min-w-0 items-center gap-2 text-gray-900">
                  <Chip
                    label={MESSAGE_TEMPLATE_TYPE_LABELS[template.type]}
                    tone={MESSAGE_TEMPLATE_TYPE_TONES[template.type]}
                  />
                  <span className="min-w-0 truncate">{template.title}</span>
                </span>
              );
            }}
            renderOption={(option, { isSelected }) => {
              if (option.value === '') {
                return (
                  <span className={isSelected ? 'text-gray-900' : 'text-gray-600'}>
                    템플릿 선택
                  </span>
                );
              }
              const template = templateMap.get(option.value);
              if (!template) return option.label;
              return (
                <span className="flex items-center gap-2">
                  <Chip
                    label={MESSAGE_TEMPLATE_TYPE_LABELS[template.type]}
                    tone={MESSAGE_TEMPLATE_TYPE_TONES[template.type]}
                  />
                  <span className="min-w-0 truncate">{template.title}</span>
                </span>
              );
            }}
          />
        </div>
        <NormalButton
          text="템플릿 불러오기"
          onClick={onApplyTemplate}
          className="h-10 w-full px-4"
        />
      </div>
    </div>
  );
}

export default SendMessageHeader;

import NormalButton from '@/shared/button/NormalButton';
import Chip from '@/shared/chip/Chip';
import {
  MESSAGE_TEMPLATE_TYPE_LABELS,
  MESSAGE_TEMPLATE_TYPE_TONES,
} from '@/constants/messageTemplate';
import type { MessageTemplate } from '@/types/messageTemplate';
import { useEffect, useMemo, useRef, useState } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const selectedTemplate = useMemo(
    () => templates.find((template) => String(template.id) === selectedTemplateId),
    [templates, selectedTemplateId],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (!dropdownRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between flex-wrap">
      <div>
        <p className="text-lg font-bold text-gray-900">메시지 작성</p>
        <p className="text-xs text-gray-500">
          {selectedStudentName} · {selectedStudentGroup}
        </p>
      </div>
      <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
        <div className="relative w-full md:min-w-48" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-primary"
          >
            {selectedTemplate ? (
              <span className="flex min-w-0 items-center gap-2">
                <Chip
                  label={MESSAGE_TEMPLATE_TYPE_LABELS[selectedTemplate.type]}
                  tone={MESSAGE_TEMPLATE_TYPE_TONES[selectedTemplate.type]}
                />
                <span className="min-w-0 truncate text-gray-900">
                  {selectedTemplate.title}
                </span>
              </span>
            ) : (
              <span className="text-gray-500">템플릿 선택</span>
            )}
            <span
              className={`ml-2 text-xs text-gray-500 transition ${
                isOpen ? 'rotate-180' : ''
              }`}
              aria-hidden
            >
              ▼
            </span>
          </button>
          {isOpen && (
            <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-[0_6px_20px_rgba(0,0,0,0.12)]">
              <ul className="flex max-h-64 flex-col gap-1 overflow-auto p-2 text-sm overscroll-contain">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectTemplate('');
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center rounded-md px-3 py-2 text-left transition ${
                      selectedTemplateId === ''
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    템플릿 선택
                  </button>
                </li>
                {templates.map((template) => {
                  const isSelected =
                    String(template.id) === String(selectedTemplateId);
                  return (
                    <li key={template.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onSelectTemplate(String(template.id));
                          setIsOpen(false);
                        }}
                        className={`flex w-full items-center gap-2 rounded-md border px-3 py-2 text-left transition ${
                          isSelected
                            ? 'border-primary bg-primary/10 text-primary shadow-[0_0_0_1px_rgba(97,129,216,0.35)]'
                            : 'border-transparent text-gray-700 hover:border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <Chip
                          label={MESSAGE_TEMPLATE_TYPE_LABELS[template.type]}
                          tone={MESSAGE_TEMPLATE_TYPE_TONES[template.type]}
                        />
                        <span className="min-w-0 truncate">
                          {template.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
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

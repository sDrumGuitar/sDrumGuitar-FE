import {
  DEFAULT_MESSAGE_TEMPLATE_TYPE,
  type MessageTemplateType,
} from '@/constants/messageTemplate';

interface TemplateFormValues {
  type: MessageTemplateType;
  title: string;
  content: string;
}

interface TemplateSummary {
  id: number;
  type: MessageTemplateType;
  title: string;
  content: string;
}

// 필수 필드가 모두 입력되었는지 판단
export const canSubmitTemplateForm = (form: TemplateFormValues) =>
  Boolean(form.type.trim() && form.title.trim() && form.content.trim());

// 신규 작성 폼이 기본값에서 변경되었는지 확인
export const isTemplateFormDirtyForCreate = (form: TemplateFormValues) =>
  form.type.trim() !== DEFAULT_MESSAGE_TEMPLATE_TYPE ||
  form.title.trim().length > 0 ||
  form.content.trim().length > 0;

// 선택된 템플릿과 현재 폼 값이 다른지 확인
export const isTemplateFormDirtyAgainstSelected = (
  form: TemplateFormValues,
  templates: TemplateSummary[],
  selectedTemplateId: number | null,
) => {
  if (!selectedTemplateId) return false;
  const selectedTemplate = templates.find(
    (template) => template.id === selectedTemplateId,
  );
  if (!selectedTemplate) return false;

  return (
    selectedTemplate.type !== form.type ||
    selectedTemplate.title !== form.title ||
    selectedTemplate.content !== form.content
  );
};

import { api } from '@/shared/api/axios';
import type { MessageTemplate } from '@/types/messageTemplate';
import type {
  CreateMessageTemplateApiResponse,
  CreateMessageTemplatePayload,
  GetMessageTemplatesApiResponse,
  GetMessageTemplatesProps,
  GetMessageTemplatesResponse,
  MessageTemplateApiItem,
} from './message.types';

export type {
  CreateMessageTemplatePayload,
  GetMessageTemplatesProps,
  GetMessageTemplatesResponse,
  MessageTemplateApiItem,
} from './message.types';

const mapMessageTemplate = (template: MessageTemplateApiItem): MessageTemplate => ({
  id: template.template_id,
  type: template.type,
  title: template.title,
  content: template.content,
  created_at: template.created_at,
  updated_at: template.updated_at,
});

const mapCreatedTemplate = (
  template: CreateMessageTemplateApiResponse,
): MessageTemplate => ({
  id: template.templateId,
  type: template.type,
  title: template.title,
  content: template.content,
  created_at: template.createdAt,
  updated_at: template.updatedAt,
});

// ====================
// GET : 메시지 템플릿 목록 불러오기
// ====================
export const getMessageTemplates = async ({
  page,
  size,
}: GetMessageTemplatesProps): Promise<GetMessageTemplatesResponse> => {
  try {
    const res = await api.get<GetMessageTemplatesApiResponse>(
      '/messages/templates',
      {
        params: { page, size },
      },
    );

    const templates = Array.isArray(res.data.templates)
      ? res.data.templates.map(mapMessageTemplate)
      : [];

    return {
      total_count: Number(res.data.total_count ?? templates.length),
      page: Number(res.data.page ?? page),
      size: Number(res.data.size ?? size),
      templates,
    };
  } catch (error) {
    console.error('Failed to fetch message templates:', error);
    return {
      total_count: 0,
      page,
      size,
      templates: [],
    };
  }
};

// ====================
// POST : 메시지 템플릿 생성
// ====================
export const createMessageTemplate = async (
  payload: CreateMessageTemplatePayload,
): Promise<MessageTemplate> => {
  const res = await api.post<CreateMessageTemplateApiResponse>(
    '/messages/templates',
    payload,
  );
  return mapCreatedTemplate(res.data);
};

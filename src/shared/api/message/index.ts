import { api } from '@/shared/api/axios';
import type { MessageTemplate } from '@/types/messageTemplate';
import type {
  CreateMessageTemplateApiResponse,
  CreateMessageTemplatePayload,
  GetMessageTemplatesApiResponse,
  GetMessageTemplatesProps,
  GetMessageTemplatesResponse,
  MessageTemplateApiResponse,
  UpdateMessageTemplatePayload,
} from './message.types';

export type {
  CreateMessageTemplatePayload,
  GetMessageTemplatesProps,
  GetMessageTemplatesResponse,
  UpdateMessageTemplatePayload,
} from './message.types';

const TEMPLATE_TYPE_TO_API: Record<string, string> = {
  ATTENDANCE: 'attended',
  ABSENT: 'absent',
  MAKEUP: 'makeup',
};

const TEMPLATE_TYPE_FROM_API: Record<string, MessageTemplate['type']> = {
  attended: 'ATTENDANCE',
  attendance: 'ATTENDANCE',
  absent: 'ABSENT',
  makeup: 'MAKEUP',
};

const normalizeTemplateTypeFromApi = (type: string): MessageTemplate['type'] => {
  const normalized = String(type).trim().toLowerCase();
  const mapped = TEMPLATE_TYPE_FROM_API[normalized];
  if (mapped) return mapped;
  return String(type).trim().toUpperCase() as MessageTemplate['type'];
};

const normalizeTemplateTypeToApi = (type: MessageTemplate['type']) =>
  TEMPLATE_TYPE_TO_API[type] ?? String(type).toLowerCase();

const mapMessageTemplate = (
  template: MessageTemplateApiResponse,
): MessageTemplate => ({
  id: Number(template.template_id ?? template.templateId ?? 0),
  type: normalizeTemplateTypeFromApi(template.type),
  title: template.title,
  content: template.content,
  created_at: template.created_at ?? template.createdAt ?? '',
  updated_at: template.updated_at ?? template.updatedAt ?? '',
});

const mapCreatedTemplate = (
  template: CreateMessageTemplateApiResponse,
): MessageTemplate => ({
  id: template.templateId,
  type: normalizeTemplateTypeFromApi(template.type),
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
    {
      ...payload,
      type: normalizeTemplateTypeToApi(payload.type),
    },
  );
  return mapCreatedTemplate(res.data);
};

// ====================
// PATCH : 메시지 템플릿 수정
// ====================
export const updateMessageTemplate = async (
  templateId: number,
  payload: UpdateMessageTemplatePayload,
): Promise<MessageTemplate> => {
  const body: Record<string, string> = {};

  if (payload.type) {
    body.type = normalizeTemplateTypeToApi(payload.type);
  }
  if (payload.title !== undefined) {
    body.title = payload.title;
  }
  if (payload.content !== undefined) {
    body.content = payload.content;
  }

  if (Object.keys(body).length === 0) {
    throw new Error('At least one field must be provided');
  }

  const res = await api.patch<MessageTemplateApiResponse>(
    `/messages/templates/${templateId}`,
    body,
  );

  return mapMessageTemplate(res.data);
};

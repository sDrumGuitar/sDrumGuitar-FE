import type { MessageTemplate } from '@/types/messageTemplate';
import type { MessageTemplateType } from '@/constants/messageTemplate';

export interface MessageTemplateApiResponse {
  template_id?: number;
  templateId?: number;
  type: string;
  title: string;
  content: string;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}

export interface CreateMessageTemplatePayload {
  type: MessageTemplateType;
  title: string;
  content: string;
}

export interface CreateMessageTemplateApiResponse {
  templateId: number;
  type: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateMessageTemplatePayload {
  type?: MessageTemplateType;
  title?: string;
  content?: string;
}

export interface GetMessageTemplatesApiResponse {
  total_count: number;
  page: number;
  size: number;
  templates: MessageTemplateApiResponse[];
}

export interface GetMessageTemplatesProps {
  page: number;
  size: number;
}

export interface GetMessageTemplatesResponse {
  total_count: number;
  page: number;
  size: number;
  templates: MessageTemplate[];
}

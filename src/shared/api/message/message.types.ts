import type { MessageTemplate } from '@/types/messageTemplate';

export interface MessageTemplateApiItem {
  template_id: number;
  type: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CreateMessageTemplatePayload {
  type: string;
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

export interface GetMessageTemplatesApiResponse {
  total_count: number;
  page: number;
  size: number;
  templates: MessageTemplateApiItem[];
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

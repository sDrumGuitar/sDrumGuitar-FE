import type { MessageTemplateType } from '@/constants/messageTemplate';
import type { Base } from './base';

export interface MessageTemplate extends Base {
  id: number;
  type: MessageTemplateType;
  title: string;
  content: string;
}

import type { Base } from './base';

export interface MessageTemplate extends Base {
  id: number;
  title: string;
  content: string;
}

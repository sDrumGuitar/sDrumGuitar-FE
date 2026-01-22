import type { Base } from './base';

export interface Student extends Base {
  id: number;
  name: string;
  age_group: 'preschool' | 'element' | 'middle' | 'high' | 'adult';
  phone: string;
  parent_phone: string;
  family_discount: boolean;
  memo: string | null;
}

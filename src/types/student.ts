export interface Student {
  id: number;
  name: string;
  age_group: 'preschool' | 'element' | 'middle' | 'high' | 'adult';
  phone: string;
  parent_phone: string;
  family_discount: boolean;
  memo: string | null;
  created_at: string;
  updated_at: string;
}

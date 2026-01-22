import type { Base } from './base';

export interface Course extends Base {
  id: number;
  student: CourseStudent;
  class_type: 'DRUM' | 'GUITAR';
  start_date: string;
  status: 'active' | 'paused' | 'ended';
  lesson_count: number;
  schedule: CourseSchedule[];
  invoice: CourseInvoice;
}

interface CourseStudent {
  student_id: number;
  name: string;
  age_group: 'preschool' | 'element' | 'middle' | 'high' | 'adult';
  phone: string;
  parent_phone: string;
}

interface CourseSchedule {
  weekday: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  time: string;
}

interface CourseInvoice {
  invoice_id: number;
  method: 'card' | 'cash';
  status: 'paid' | null;
  paid_at: string;
}

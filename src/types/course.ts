import type { Base } from './base';

export interface Course extends Base {
  id: number;
  student: CourseStudent;
  class_type: 'DRUM' | 'GUITAR' | null;
  start_date: string;
  status: 'active' | 'paused' | 'ended' | null;
  lesson_count: number;
  schedules: CourseSchedule[];
  invoice: CourseInvoice;
}

export interface CourseStudent {
  student_id: number;
  name: string;
  age_group: 'preschool' | 'element' | 'middle' | 'high' | 'adult' | null;
  phone: string;
  parent_phone: string;
}

type Weekday = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export interface CourseSchedule {
  weekday: Weekday;
  time: string;
}

export interface CourseInvoice {
  invoice_id: number;
  method: 'card' | 'cash' | null;
  status: 'paid' | null;
  paid_at: string;
}

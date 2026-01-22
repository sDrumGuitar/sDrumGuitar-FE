export const CLASS_TYPE_OPTIONS = [
  { label: '드럼', value: 'DRUM' },
  { label: '기타', value: 'GUITAR' },
] as const;

export const COURSE_STATUS_OPTIONS = [
  { label: '진행 중', value: 'active' },
  { label: '일시 중단', value: 'paused' },
  { label: '종료', value: 'ended' },
] as const;

export const PAYMENT_METHOD_OPTIONS = [
  { label: '카드', value: 'card' },
  { label: '현금', value: 'cash' },
] as const;

export const LESSON_COUNT = [
  { label: '4회', value: '4' },
  { label: '8회', value: '8' },
  { label: '12회', value: '12' },
] as const;

export const WEEKDAY_OPTIONS = [
  { label: '월', value: 'MON' },
  { label: '화', value: 'TUE' },
  { label: '수', value: 'WED' },
  { label: '목', value: 'THU' },
  { label: '금', value: 'FRI' },
  { label: '토', value: 'SAT' },
  { label: '일', value: 'SUN' },
] as const;

export const PAYMENT_STATUS_OPTIONS = [
  { label: '미결제', value: 'unpaid' },
  { label: '결제 완료', value: 'paid' },
] as const;

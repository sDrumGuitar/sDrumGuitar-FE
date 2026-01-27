export const STATUS_OPTIONS = [
  { label: '미납', value: 'unpaid' },
  { label: '완료', value: 'paid' },
] as const;

export const METHOD_OPTIONS = [
  { label: '카드', value: 'card' },
  { label: '현금', value: 'cash' },
] as const;

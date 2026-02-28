// 결제 방법
export const PAYMENT_METHOD_OPTIONS = [
  { label: '카드', value: 'CARD' },
  { label: '현금', value: 'CASH' },
] as const;

// 결제 상태
export const PAYMENT_STATUS_OPTIONS = [
  { label: '미결제', value: 'UNPAID' },
  { label: '결제 완료', value: 'PAID' },
] as const;

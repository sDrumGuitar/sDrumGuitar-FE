import type { InvoiceStatus, PaymentMethod } from '../types';

export function classTypeLabel(v: string) {
  if (v === 'DRUM') return '드럼';
  if (v === 'GUITAR') return '기타';
  if (v === 'PIANO') return '피아노';
  if (v === 'VOCAL') return '보컬';
  return v;
}

// 청구 상태 라벨
export function statusLabel(v: InvoiceStatus) {
  return v === 'paid' ? '완료' : '미납';
}

// 납부 방법 라벨
export function methodLabel(v: PaymentMethod) {
  if (v === 'card') return '카드';
  if (v === 'cash') return '현금';
  return '-';
}

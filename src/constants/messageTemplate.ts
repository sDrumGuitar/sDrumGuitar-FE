export const MESSAGE_TEMPLATE_TYPES = [
  'ATTENDANCE',
  'LATE',
  'ABSENT',
  'MAKEUP',
  'ROLLOVER',
  'INVOICE_UNPAID',
  'CUSTOM',
] as const;

export const MESSAGE_TEMPLATE_TYPE_LABELS: Record<MessageTemplateType, string> = {
  ATTENDANCE: '출석',
  LATE: '지각',
  ABSENT: '결석',
  MAKEUP: '보강',
  ROLLOVER: '이월',
  INVOICE_UNPAID: '청구서 미납',
  CUSTOM: '커스텀',
};

export const MESSAGE_TEMPLATE_TYPE_STYLES: Record<
  MessageTemplateType,
  { background: string; text: string; border: string }
> = {
  ATTENDANCE: {
    background: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  LATE: {
    background: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  ABSENT: {
    background: 'bg-rose-100',
    text: 'text-rose-700',
    border: 'border-rose-200',
  },
  MAKEUP: {
    background: 'bg-sky-100',
    text: 'text-sky-700',
    border: 'border-sky-200',
  },
  ROLLOVER: {
    background: 'bg-indigo-100',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
  },
  INVOICE_UNPAID: {
    background: 'bg-orange-100',
    text: 'text-orange-700',
    border: 'border-orange-200',
  },
  CUSTOM: {
    background: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
  },
};

export const MESSAGE_TEMPLATE_TYPE_TONES: Record<
  MessageTemplateType,
  'emerald' | 'amber' | 'rose' | 'sky' | 'indigo' | 'orange' | 'slate'
> = {
  ATTENDANCE: 'emerald',
  LATE: 'amber',
  ABSENT: 'rose',
  MAKEUP: 'sky',
  ROLLOVER: 'indigo',
  INVOICE_UNPAID: 'orange',
  CUSTOM: 'slate',
};

export const DEFAULT_MESSAGE_TEMPLATE_TYPE: MessageTemplateType =
  'ATTENDANCE';

export type MessageTemplateType = (typeof MESSAGE_TEMPLATE_TYPES)[number];

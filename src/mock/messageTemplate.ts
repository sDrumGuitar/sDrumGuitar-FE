import type { MessageTemplate } from '@/types/messageTemplate';

export const MockMessageTemplate: MessageTemplate[] = [
  {
    id: 1,
    type: 'ATTENDANCE',
    title: '출석',
    content: '오늘 출석했습니다~\n좋은 하루 되세요 :)',
    created_at: '2026-02-01 09:00',
    updated_at: '2026-02-01 09:00',
  },
  {
    id: 2,
    type: 'LATE',
    title: '지각',
    content: '오늘 수업에 약 10분 지각 예정입니다.\n양해 부탁드립니다.',
    created_at: '2026-02-01 09:10',
    updated_at: '2026-02-01 09:10',
  },
  {
    id: 3,
    type: 'ABSENT',
    title: '결석',
    content: '금일 개인 사정으로 결석합니다.\n다음 수업 때 뵙겠습니다.',
    created_at: '2026-02-02 09:00',
    updated_at: '2026-02-02 09:00',
  },
  {
    id: 4,
    type: 'INVOICE_UNPAID',
    title: '청구서 미납',
    content:
      '안녕하세요. 이번 달 수강료가 아직 확인되지 않았습니다.\n확인 후 회신 부탁드립니다.',
    created_at: '2026-02-03 12:00',
    updated_at: '2026-02-03 12:00',
  },
  {
    id: 5,
    type: 'MAKEUP',
    title: '보강',
    content: '결석 보강 수업 일정 안내드립니다.\n가능한 시간 회신 부탁드립니다.',
    created_at: '2026-02-04 18:00',
    updated_at: '2026-02-04 18:00',
  },
  {
    id: 6,
    type: 'ROLLOVER',
    title: '이월',
    content: '잔여 수업은 다음 달로 이월 처리되었습니다.\n감사합니다.',
    created_at: '2026-02-05 19:00',
    updated_at: '2026-02-05 19:00',
  },
  {
    id: 7,
    type: 'INVOICE_UNPAID',
    title: '결제 방법 안내',
    content:
      '수강료 결제는 계좌이체/카드결제 모두 가능합니다.\n원하시는 방법으로 진행해주세요.',
    created_at: '2026-02-06 16:00',
    updated_at: '2026-02-06 16:00',
  },
  {
    id: 8,
    type: 'CUSTOM',
    title: '인사',
    content: '안녕하세요 :) 이번 달도 잘 부탁드립니다.',
    created_at: '2026-02-07 10:00',
    updated_at: '2026-02-07 10:00',
  },
];

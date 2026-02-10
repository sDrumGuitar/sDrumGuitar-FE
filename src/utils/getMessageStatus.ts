export function getMessageStatus(status: string) {
  switch (status) {
    case 'sent':
      return '완료';
    case 'scheduled':
      return '예약 대기중';
    default:
      break;
  }
}

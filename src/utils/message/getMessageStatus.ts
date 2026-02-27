/**
 * 메시지 상태 값을 라벨로 변환합니다.
 * @param status 메시지 상태 값
 * @returns 메시지 상태 라벨
 * 예시 : getMessageStatus('sent') -> '완료'
 */
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

/**
 * ISO string을 한국식 날짜 형식으로 변환합니다.
 * @param isoString ISO string
 * @returns 한국식 날짜 형식
 * 예시 : 2026-02-27T10:33:14+09:00 -> 2026년 02월 27일
 */
export function formatToKoreanDate(isoString: string) {
  if (!isoString) return '';

  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}년 ${month}월 ${day}일`;
}

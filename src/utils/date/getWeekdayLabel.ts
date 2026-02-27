import { WEEKDAY_OPTIONS } from '@/constants/course';

/**
 * 요일 값을 라벨로 변환합니다.
 * @param value 요일 값
 * @returns 요일 라벨
 * 예시 : getWeekdayLabel('mon') -> '월'
 */
export function getWeekdayLabel(
  value: (typeof WEEKDAY_OPTIONS)[number]['value'],
) {
  return WEEKDAY_OPTIONS.find((o) => o.value === value)?.label ?? '';
}

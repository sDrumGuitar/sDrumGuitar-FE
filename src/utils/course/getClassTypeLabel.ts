import { CLASS_TYPE_OPTIONS } from '@/constants/course';

/**
 * 수업 유형 값을 라벨로 변환합니다.
 * @param value 수업 유형 값
 * @returns 수업 유형 라벨
 * 예시 : getClassTypeLabel('group') -> '그룹'
 */
export function getClassTypeLabel(
  value: (typeof CLASS_TYPE_OPTIONS)[number]['value'] | null,
) {
  if (!value) return '';

  return CLASS_TYPE_OPTIONS.find((o) => o.value === value)?.label ?? '';
}

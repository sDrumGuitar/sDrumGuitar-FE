import { AGE_GROUP_OPTIONS } from '@/constants/student';

/**
 * 나이 그룹 값을 라벨로 변환합니다.
 * @param value 나이 그룹 값
 * @returns 나이 그룹 라벨
 * 예시 : getAgeGroupLabel('elementary') -> '초등'
 */
export function getAgeGroupLabel(
  value: (typeof AGE_GROUP_OPTIONS)[number]['value'] | null,
) {
  if (!value) return '';

  return AGE_GROUP_OPTIONS.find((o) => o.value === value)?.label ?? '';
}

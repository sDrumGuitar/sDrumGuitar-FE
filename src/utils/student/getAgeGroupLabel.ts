import { AGE_GROUP_OPTIONS } from '@/constants/student';
import type { Student } from '@/types/student';

/**
 * 나이 그룹 값을 라벨로 변환합니다.
 * @param value 나이 그룹 값
 * @returns 나이 그룹 라벨
 * 예시 : getAgeGroupLabel('elementary') -> '초등'
 */
export function getAgeGroupLabel(
  value: Student['age_group'] | null,
) {
  if (!value) return '';

  const normalized = String(value).toUpperCase();
  const resolved =
    normalized === 'ELEMENTARY' ? 'ELEMENT' : normalized;

  return (
    AGE_GROUP_OPTIONS.find((o) => o.value === resolved)?.label ?? ''
  );
}

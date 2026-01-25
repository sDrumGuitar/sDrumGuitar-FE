import { AGE_GROUP_OPTIONS } from '@/constants/student';

export function getAgeGroupLabel(
  value: (typeof AGE_GROUP_OPTIONS)[number]['value'] | null,
) {
  if (!value) return '';

  return AGE_GROUP_OPTIONS.find((o) => o.value === value)?.label ?? '';
}

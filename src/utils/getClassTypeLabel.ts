import { CLASS_TYPE_OPTIONS } from '@/constants/course';

export function getClassTypeLabel(
  value: (typeof CLASS_TYPE_OPTIONS)[number]['value'] | null,
) {
  if (!value) return '';

  return CLASS_TYPE_OPTIONS.find((o) => o.value === value)?.label ?? '';
}

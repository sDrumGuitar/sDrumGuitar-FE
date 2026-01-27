import { WEEKDAY_OPTIONS } from '@/constants/course';

export function getWeekdayLabel(
  value: (typeof WEEKDAY_OPTIONS)[number]['value'],
) {
  return WEEKDAY_OPTIONS.find((o) => o.value === value)?.label ?? '';
}

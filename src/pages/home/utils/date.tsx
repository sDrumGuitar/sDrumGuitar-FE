const WEEKDAY_VALUES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'] as const;

export type WeekdayValue = (typeof WEEKDAY_VALUES)[number];

export const getWeekdayValueFromDate = (date: Date): WeekdayValue =>
  WEEKDAY_VALUES[date.getDay()];

export const toDateKey = (value: Date) =>
  `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;

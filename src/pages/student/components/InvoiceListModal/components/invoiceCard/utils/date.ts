import dayjs from 'dayjs';

// 날짜 문자열이나 숫자값을 dayjs 객체로 변환하는 함수
export function normalizeToDayjs(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === '') return null;

  if (typeof value === 'number') {
    return value < 1_000_000_000_000 ? dayjs.unix(value) : dayjs(value);
  }

  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^\d+$/.test(trimmed)) {
    const numeric = Number(trimmed);
    return numeric < 1_000_000_000_000 ? dayjs.unix(numeric) : dayjs(numeric);
  }

  return dayjs(trimmed);
}

// "2026-01-17T15:30:00" -> "2026-01-17"
export function toDateOnly(value: number | string) {
  const parsed = normalizeToDayjs(value);
  if (!parsed || !parsed.isValid()) return '';
  return parsed.format('YYYY-MM-DD');
}

// "2026-01-17" -> "2026-01-17T00:00:00"
export function fromDateOnly(v: string) {
  if (!v) return null;
  return `${v}T00:00:00`;
}

export function formatDateLabel(value: string | number | null) {
  const parsed = normalizeToDayjs(value);
  return parsed && parsed.isValid() ? parsed.format('YYYY / MM / DD') : '-';
}

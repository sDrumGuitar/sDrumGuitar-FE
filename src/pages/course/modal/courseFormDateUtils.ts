const hasIsoTimezone = (value: string) =>
  /([zZ]|[+-]\d{2}:\d{2})$/.test(value);

const formatTimezoneOffset = (date: Date) => {
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? '+' : '-';
  const absMinutes = Math.abs(offsetMinutes);
  const hours = String(Math.floor(absMinutes / 60)).padStart(2, '0');
  const minutes = String(absMinutes % 60).padStart(2, '0');
  return `${sign}${hours}:${minutes}`;
};

const formatDateOnly = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  const yyyy = parsed.getFullYear();
  const mm = String(parsed.getMonth() + 1).padStart(2, '0');
  const dd = String(parsed.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

const formatLocalIsoWithOffset = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  const yyyy = parsed.getFullYear();
  const mm = String(parsed.getMonth() + 1).padStart(2, '0');
  const dd = String(parsed.getDate()).padStart(2, '0');
  const hh = String(parsed.getHours()).padStart(2, '0');
  const mi = String(parsed.getMinutes()).padStart(2, '0');
  const ss = String(parsed.getSeconds()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}:${ss}${formatTimezoneOffset(
    parsed,
  )}`;
};

export const toInvoicePaidAt = (rawValue: string, status: 'PAID' | 'UNPAID') =>
  status === 'PAID'
    ? hasIsoTimezone(rawValue)
      ? rawValue
      : rawValue.includes('T')
        ? formatLocalIsoWithOffset(rawValue)
        : `${formatDateOnly(rawValue)}T00:00:00${formatTimezoneOffset(
            new Date(rawValue),
          )}`
    : null;

export const toDateOnly = formatDateOnly;

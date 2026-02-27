const formatSeoulNumber = (digits: string) => {
  if (digits.length <= 2) return digits;
  if (digits.length <= 5) {
    return `${digits.slice(0, 2)}-${digits.slice(2)}`;
  }
  if (digits.length <= 9) {
    return `${digits.slice(0, 2)}-${digits.slice(2, digits.length - 4)}-${digits.slice(-4)}`;
  }
  return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
};

const formatMobileNumber = (digits: string) => {
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  if (digits.length <= 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, digits.length - 4)}-${digits.slice(-4)}`;
  }
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};

export const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('02')) {
    return formatSeoulNumber(digits);
  }
  return formatMobileNumber(digits);
};

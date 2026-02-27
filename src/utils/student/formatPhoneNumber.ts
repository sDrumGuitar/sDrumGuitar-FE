/**
 * 서울 지역번호 전화번호를 포맷합니다.
 * @param digits 전화번호 숫자만
 * @returns 포맷된 전화번호
 * 예시 : formatSeoulNumber('021234567') -> '02-1234-567'
 */
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

/**
 * 휴대폰 번호를 포맷합니다.
 * @param digits 전화번호 숫자만
 * @returns 포맷된 전화번호
 * 예시 : formatMobileNumber('0101234567') -> '010-1234-567'
 */
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

/**
 * 전화번호를 포맷합니다.
 * @param value 전화번호
 * @returns 포맷된 전화번호
 * 예시 : formatPhoneNumber('0101234567') -> '010-1234-567'
 */
export const formatPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('02')) {
    return formatSeoulNumber(digits);
  }
  return formatMobileNumber(digits);
};

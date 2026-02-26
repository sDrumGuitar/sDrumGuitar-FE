import type { Student } from '@/types/student';
import type { StudentFormState } from './studentFormTypes';
import { formatPhoneNumber } from '@/shared/utils/phone';

export const mapStudentToForm = (student: Student): StudentFormState => {
  return {
    name: student.name,
    ageGroup: student.age_group,
    phone: formatPhoneNumber(student.phone),
    parentPhone: formatPhoneNumber(student.parent_phone),
    familyDiscount: student.family_discount,
    memo: student.memo ?? '',
  };
};

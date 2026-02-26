import type { Student } from '@/types/student';

export interface StudentFormState {
  name: string;
  ageGroup: Student['age_group'] | '';
  phone: string;
  parentPhone: string;
  familyDiscount: boolean;
  memo: string;
}

export const INITIAL_FORM: StudentFormState = {
  name: '',
  ageGroup: '',
  phone: '',
  parentPhone: '',
  familyDiscount: false,
  memo: '',
};

export const isValidStudentForm = (form: StudentFormState) => {
  return (
    form.name.trim() !== '' &&
    String(form.ageGroup).trim() !== '' &&
    form.phone.trim() !== '' &&
    form.parentPhone.trim() !== ''
  );
};

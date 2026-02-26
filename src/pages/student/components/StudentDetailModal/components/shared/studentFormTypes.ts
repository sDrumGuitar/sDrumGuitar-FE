import type { Student } from '@/types/student';

// 학생 폼의 상태 타입 정의
export interface StudentFormState {
  name: string;
  ageGroup: Student['age_group'] | '';
  phone: string;
  parentPhone: string;
  familyDiscount: boolean;
  memo: string;
}

// 학생 폼의 초기 상태
export const INITIAL_FORM: StudentFormState = {
  name: '',
  ageGroup: '',
  phone: '',
  parentPhone: '',
  familyDiscount: false,
  memo: '',
};

// 학생 폼의 유효성 검사 함수 - 필수 항목이 모두 입력되었는지 확인
export const isValidStudentForm = (form: StudentFormState) => {
  return (
    form.name.trim() !== '' &&
    String(form.ageGroup).trim() !== '' &&
    form.phone.trim() !== '' &&
    form.parentPhone.trim() !== ''
  );
};

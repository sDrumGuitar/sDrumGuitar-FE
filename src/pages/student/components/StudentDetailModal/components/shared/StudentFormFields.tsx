import {
  FormField,
  TextInput,
  Select,
  NumberInput,
  Textarea,
  RadioGroup,
} from '@/shared/form';
import {
  AGE_GROUP_OPTIONS,
  FAMILY_DISCOUNT_OPTIONS,
} from '@/constants/student';
import { formatPhoneNumber } from '@/utils/phone';
import type { StudentFormState } from './studentFormTypes';

interface StudentFormFieldsProps {
  form: StudentFormState;
  disabled?: boolean;
  showFamilyDiscount?: boolean;
  onChange: <K extends keyof StudentFormState>(
    key: K,
    value: StudentFormState[K],
  ) => void;
}

// 학생 폼 필드 컴포넌트 - 학생 상세 보기 및 생성/수정 폼에서 공통으로 사용
export default function StudentFormFields({
  form,
  disabled = false,
  showFamilyDiscount = false,
  onChange,
}: StudentFormFieldsProps) {
  return (
    <>
      <FormField label="이름">
        <TextInput
          type="text"
          value={form.name}
          disabled={disabled}
          onChange={(v) => onChange('name', v)}
        />
      </FormField>

      <FormField label="구분">
        <Select
          options={AGE_GROUP_OPTIONS}
          value={form.ageGroup}
          disabled={disabled}
          onChange={(v) =>
            onChange('ageGroup', v as StudentFormState['ageGroup'])
          }
        />
      </FormField>

      <FormField label="전화번호">
        <NumberInput
          value={form.phone}
          disabled={disabled}
          onChange={(v) => onChange('phone', v)}
          placeholder="숫자만 입력"
          formatter={formatPhoneNumber}
        />
      </FormField>

      <FormField label="학부모 전화번호">
        <NumberInput
          value={form.parentPhone}
          disabled={disabled}
          onChange={(v) => onChange('parentPhone', v)}
          placeholder="숫자만 입력"
          formatter={formatPhoneNumber}
        />
      </FormField>

      {showFamilyDiscount && (
        <FormField label="가족 할인">
          <RadioGroup
            options={FAMILY_DISCOUNT_OPTIONS}
            value={String(form.familyDiscount)}
            disabled={disabled}
            onChange={(v) => onChange('familyDiscount', v === 'true')}
          />
        </FormField>
      )}

      <FormField label="메모">
        <Textarea
          value={form.memo}
          disabled={disabled}
          onChange={(v) => onChange('memo', v)}
        />
      </FormField>
    </>
  );
}

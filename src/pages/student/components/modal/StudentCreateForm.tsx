import { useEffect, useState } from 'react';
import {
  FormField,
  TextInput,
  Select,
  NumberInput,
  Textarea,
} from '@/shared/form/index';
import { AGE_GROUP_OPTIONS } from '@/constants/student';
import NormalButton from '@/shared/button/NormalButton';
import { createStudent } from '@/shared/api/students';
import { useStudentModalStore } from '@/store/studentModalStore';
import { formatPhoneNumber } from '@/shared/utils/phone';

interface StudentFormState {
  name: string;
  ageGroup: string;
  phone: string;
  parentPhone: string;
  // familyDiscount: boolean | null;
  memo: string;
}

const INITIAL_FORM: StudentFormState = {
  name: '',
  ageGroup: '',
  phone: '',
  parentPhone: '',
  // familyDiscount: null,
  memo: '',
};

interface StudentCreateFormProps {
  onDirtyChange: (dirty: boolean) => void;
  onSuccess: () => void;
}
function StudentCreateForm({
  onDirtyChange,
  onSuccess,
}: StudentCreateFormProps) {
  const { close } = useStudentModalStore();
  const [form, setForm] = useState<StudentFormState>(INITIAL_FORM);
  const isDirty = JSON.stringify(form) !== JSON.stringify(INITIAL_FORM);

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  const updateForm = <K extends keyof StudentFormState>(
    key: K,
    value: StudentFormState[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isValidForm = (form: StudentFormState) => {
    return (
      form.name.trim() !== '' &&
      form.ageGroup.trim() !== '' &&
      form.phone.trim() !== '' &&
      form.parentPhone.trim() !== ''
      // && form.familyDiscount !== null
    );
  };

  const isValid = isValidForm(form);
  const canSubmit = isDirty && isValid;

  const handleSubmit = async () => {
    if (!canSubmit) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      await createStudent({
        name: form.name,
        age_group: form.ageGroup,
        phone: form.phone,
        parent_phone: form.parentPhone,
        // family_discount: Boolean(form.familyDiscount),
        memo: form.memo,
      });

      setForm(INITIAL_FORM);
      onDirtyChange(false);
      onSuccess();
      close();
    } catch (error) {
      console.error('학생 등록 실패', error);
      alert('학생 등록에 실패했습니다.');
    }
  };

  return (
    <div className="space-y-3">
      <FormField label="이름">
        <TextInput
          type="text"
          value={form.name}
          onChange={(v) => updateForm('name', v)}
        />
      </FormField>

      <FormField label="구분">
        <Select
          options={AGE_GROUP_OPTIONS}
          value={form.ageGroup}
          onChange={(v) => updateForm('ageGroup', v)}
        />
      </FormField>

      <FormField label="전화번호">
        <NumberInput
          value={form.phone}
          onChange={(v) => updateForm('phone', v)}
          placeholder="숫자만 입력"
          formatter={formatPhoneNumber}
        />
      </FormField>

      <FormField label="학부모 전화번호">
        <NumberInput
          value={form.parentPhone}
          onChange={(v) => updateForm('parentPhone', v)}
          placeholder="숫자만 입력"
          formatter={formatPhoneNumber}
        />
      </FormField>

      {/* <FormField label="가족 할인">
        <RadioGroup
          options={FAMILY_DISCOUNT_OPTIONS}
          value={
            form.familyDiscount === null
              ? undefined
              : String(form.familyDiscount)
          }
          onChange={(v) => updateForm('familyDiscount', v === 'true')}
        />
      </FormField> */}

      <FormField label="메모">
        <Textarea value={form.memo} onChange={(v) => updateForm('memo', v)} />
      </FormField>

      <div className="w-full flex justify-end">
        <NormalButton
          onClick={handleSubmit}
          text="저장"
          disabled={!canSubmit}
        />
      </div>
    </div>
  );
}

export default StudentCreateForm;

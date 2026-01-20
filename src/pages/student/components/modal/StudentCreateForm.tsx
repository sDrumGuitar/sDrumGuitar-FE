import { useEffect, useState } from 'react';
import FormField from '@/shared/form/FormField';
import TextInput from '@/shared/form/TextInput';
import Select from '@/shared/form/Select';
import NumberInput from '@/shared/form/NumberInput';
import RadioGroup from '@/shared/form/RadioGroup';
import Textarea from '@/shared/form/Textarea';
import {
  AGE_GROUP_OPTIONS,
  FAMILY_DISCOUNT_OPTIONS,
} from '@/constants/student';

interface StudentFormState {
  name: string;
  ageGroup: string;
  phone: string;
  parentPhone: string;
  familyDiscount: boolean | null;
  memo: string;
}

const INITIAL_FORM: StudentFormState = {
  name: '',
  ageGroup: '',
  phone: '',
  parentPhone: '',
  familyDiscount: null,
  memo: '',
};

interface StudentCreateFormProps {
  onDirtyChange: (dirty: boolean) => void;
}
function StudentCreateForm({ onDirtyChange }: StudentCreateFormProps) {
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

  return (
    <div className="space-y-3">
      <FormField label="이름">
        <TextInput value={form.name} onChange={(v) => updateForm('name', v)} />
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
        />
      </FormField>

      <FormField label="학부모 전화번호">
        <NumberInput
          value={form.parentPhone}
          onChange={(v) => updateForm('parentPhone', v)}
          placeholder="숫자만 입력"
        />
      </FormField>

      <FormField label="가족 할인">
        <RadioGroup
          options={FAMILY_DISCOUNT_OPTIONS}
          value={
            form.familyDiscount === null
              ? undefined
              : String(form.familyDiscount)
          }
          onChange={(v) => updateForm('familyDiscount', v === 'true')}
        />
      </FormField>

      <FormField label="메모">
        <Textarea value={form.memo} onChange={(v) => updateForm('memo', v)} />
      </FormField>

      <button onClick={() => console.log(form)}>저장</button>
    </div>
  );
}

export default StudentCreateForm;

import {
  CLASS_TYPE_OPTIONS,
  LESSON_COUNT,
  PAYMENT_METHOD_OPTIONS,
  PAYMENT_STATUS_OPTIONS,
  WEEKDAY_OPTIONS,
} from '@/constants/course';
import {
  CheckboxGroup,
  FormField,
  RadioGroup,
  Select,
  TextInput,
} from '@/shared/form';
import { useEffect, useState } from 'react';
import CourseScheduleTimeList from './CourseScheduleTimeList';
import type { CourseSchedule } from '@/types/course';
import NormalButton from '@/shared/button/NormalButton';

interface CourseFormState {
  student: {
    student_id: number;
    name: string;
  };
  class_type: string;
  lesson_count: number;
  start_date: string;
  schedules: CourseSchedule[];
  invoice: {
    status: string | null;
    method: string;
    paid_at: string;
  };
}

const INITIAL_FORM: CourseFormState = {
  student: {
    student_id: 1,
    name: '',
  },
  class_type: '',
  lesson_count: 0,
  start_date: '',
  schedules: [],
  invoice: {
    status: null,
    method: '',
    paid_at: '',
  },
};

interface CourseCreateFormProps {
  onDirtyChange: (dirty: boolean) => void;
  onSuccess: () => void;
}

export default function CourseCreateForm({
  onDirtyChange,
  onSuccess,
}: CourseCreateFormProps) {
  const [form, setForm] = useState<CourseFormState>(INITIAL_FORM);
  const isDirty = JSON.stringify(form) !== JSON.stringify(INITIAL_FORM);

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  const updateForm = <K extends keyof CourseFormState>(
    key: K,
    value: CourseFormState[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const isBaseInfoValid =
    // 수강생 정보
    form.student.name.trim() !== '' &&
    // 수업 정보
    form.start_date.trim() !== '' &&
    form.lesson_count > 0 &&
    form.class_type !== undefined &&
    // 수강 일정
    form.schedules.length > 0 &&
    form.schedules.every((s) => s.time.trim() !== '');

  const isPaymentValid =
    form.invoice.status !== 'paid' ||
    (form.invoice.method !== undefined && form.invoice.paid_at.trim() !== '');

  const canSubmit = isBaseInfoValid && isPaymentValid;

  const handleSubmit = async () => {
    if (!canSubmit) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      // await createCourse({

      // });

      setForm(INITIAL_FORM);
      onDirtyChange(false);
      onSuccess();
      close();
    } catch (error) {
      console.error('수강 등록 실패', error);
      alert('수강 등록에 실패했습니다.');
    }
  };

  return (
    <div className="space-y-3">
      <FormField label="수강생">
        <TextInput
          type="text"
          value={form.student.name}
          onChange={(v) =>
            updateForm('student', {
              ...form.student,
              name: v,
            })
          }
        />
      </FormField>

      <FormField label="클래스">
        <Select
          options={CLASS_TYPE_OPTIONS}
          value={form.class_type || ''}
          onChange={(v) => updateForm('class_type', v)}
        />
      </FormField>

      {/* 가족 할인 */}

      <FormField label="수업 횟수">
        <Select
          options={LESSON_COUNT}
          value={form.lesson_count.toString()}
          onChange={(v) => updateForm('lesson_count', Number(v))}
        />
      </FormField>

      <FormField label="수강 시작 날짜">
        <TextInput
          type="date"
          value={form.start_date}
          onChange={(v) => updateForm('start_date', v)}
        />
      </FormField>

      <FormField label="수강 요일">
        <CheckboxGroup
          options={WEEKDAY_OPTIONS}
          values={form.schedules.map((s) => s.weekday as string)}
          onChange={(weekdays) => {
            const nextSchedules: CourseSchedule[] = weekdays.map((weekday) => {
              const existing = form.schedules.find(
                (s) => s.weekday === weekday,
              );

              return (
                existing ?? {
                  weekday: weekday as CourseSchedule['weekday'],
                  time: '',
                }
              );
            });

            updateForm('schedules', nextSchedules);
          }}
        />
      </FormField>

      <CourseScheduleTimeList
        schedules={form.schedules}
        onChange={(next) => updateForm('schedules', next)}
      />

      <FormField label="결제 여부">
        <RadioGroup
          options={PAYMENT_STATUS_OPTIONS}
          value={form.invoice.status === 'paid' ? 'paid' : 'unpaid'}
          onChange={(v) =>
            updateForm('invoice', {
              ...form.invoice,
              status: v === 'paid' ? 'paid' : null,
            })
          }
        />
      </FormField>

      {form.invoice.status === 'paid' && (
        <>
          <FormField label="결제 방식">
            <RadioGroup
              options={PAYMENT_METHOD_OPTIONS}
              value={form.invoice.method}
              onChange={(v) =>
                updateForm('invoice', {
                  ...form.invoice,
                  method: v,
                })
              }
            />
          </FormField>

          <FormField label="결제일">
            <TextInput
              type="date"
              value={form.invoice.paid_at}
              onChange={(v) =>
                updateForm('invoice', {
                  ...form.invoice,
                  paid_at: v,
                })
              }
            />
          </FormField>
        </>
      )}

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

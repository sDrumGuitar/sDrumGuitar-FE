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
import StudentSearchInput from './StudentSearchInput';
import { createCourse, updateCourse } from '@/shared/api/courses';
import { useCourseModalStore } from '@/store/courseModalStore';

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
    status: 'paid' | null;
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

interface CourseFormProps {
  onDirtyChange: (dirty: boolean) => void;
  onSuccess: () => void;
}

export default function CourseForm({
  onDirtyChange,
  onSuccess,
}: CourseFormProps) {
  const { mode, selectedCourse, setMode, close } = useCourseModalStore();
  const [form, setForm] = useState<CourseFormState>(INITIAL_FORM);
  const [initialForm, setInitialForm] = useState<CourseFormState>(INITIAL_FORM);

  const isViewMode = mode === 'DETAIL';
  const isDirty = JSON.stringify(form) !== JSON.stringify(initialForm);

  useEffect(() => {
    if ((mode === 'DETAIL' || mode === 'UPDATE') && selectedCourse) {
      const courseData = {
        ...selectedCourse,
        class_type: selectedCourse.class_type || '', // Handle null
        invoice: {
          status: selectedCourse.invoice.status,
          method: selectedCourse.invoice.method || '',
          paid_at: selectedCourse.invoice.paid_at || '',
        },
      };
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm(courseData);
      setInitialForm(courseData);
    } else {
      setForm(INITIAL_FORM);
      setInitialForm(INITIAL_FORM);
    }
  }, [mode, selectedCourse]);

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
    form.student.name.trim() !== '' &&
    form.start_date.trim() !== '' &&
    form.lesson_count > 0 &&
    form.class_type !== undefined &&
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
      const payload = {
        student: {
          student_id: form.student.student_id,
          name: form.student.name,
        },
        class_type: form.class_type,
        lesson_count: form.lesson_count,
        start_date: form.start_date,
        schedules: form.schedules,
        invoice: {
          status: form.invoice.status,
          ...(form.invoice.status === 'paid' && {
            method: form.invoice.method,
            paid_at: form.invoice.paid_at,
          }),
        },
      };

      if (mode === 'CREATE') {
        await createCourse(payload);
      } else if (mode === 'UPDATE' && selectedCourse) {
        await updateCourse(selectedCourse.id, payload);
      }

      setForm(INITIAL_FORM);
      onDirtyChange(false);
      onSuccess();
      close();
    } catch (error) {
      console.error('수강 정보 저장 실패', error);
      alert('수강 정보 저장에 실패했습니다.');
    }
  };

  return (
    <div className="space-y-3">
      <FormField label="수강생">
        <StudentSearchInput
          value={form.student.name}
          onSelect={(student) =>
            updateForm('student', {
              student_id: student.id,
              name: student.name,
            })
          }
          disabled={isViewMode}
        />
      </FormField>
      <FormField label="클래스">
        <Select
          options={CLASS_TYPE_OPTIONS}
          value={form.class_type || ''}
          onChange={(v) => updateForm('class_type', v)}
          disabled={isViewMode}
        />
      </FormField>

      <FormField label="수업 횟수">
        <Select
          options={LESSON_COUNT}
          value={form.lesson_count.toString()}
          onChange={(v) => updateForm('lesson_count', Number(v))}
          disabled={isViewMode}
        />
      </FormField>

      <FormField label="수강 시작 날짜">
        <TextInput
          type="date"
          value={form.start_date}
          onChange={(v) => updateForm('start_date', v)}
          disabled={isViewMode}
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
          disabled={isViewMode}
        />
      </FormField>

      <CourseScheduleTimeList
        schedules={form.schedules}
        onChange={(next) => updateForm('schedules', next)}
        disabled={isViewMode}
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
          disabled={isViewMode}
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
              disabled={isViewMode}
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
              disabled={isViewMode}
            />
          </FormField>
        </>
      )}

      <div className="w-full flex justify-end gap-2">
        {mode === 'DETAIL' ? (
          <NormalButton onClick={() => setMode('UPDATE')} text="수정" />
        ) : (
          <NormalButton
            onClick={handleSubmit}
            text="저장"
            disabled={!canSubmit || !isDirty}
          />
        )}
      </div>
    </div>
  );
}

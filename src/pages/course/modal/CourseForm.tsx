import {
  CLASS_TYPE_OPTIONS,
  LESSON_COUNT,
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
import type { Course, CourseSchedule } from '@/types/course';
import NormalButton from '@/shared/button/NormalButton';
import StudentSearchInput from './StudentSearchInput';
import { createCourse, updateCourse } from '@/shared/api/courses';
import { getStudent } from '@/shared/api/students';
import { useCourseModalStore } from '@/store/course/courseModalStore';
import { useDateModalStore } from '@/store/date/dateModalStore';
import CalendarModal from '@/shared/form/CalendarModal';
import { formatToKoreanDate } from '@/utils/date/formatKoreanDate';
import {
  PAYMENT_METHOD_OPTIONS,
  PAYMENT_STATUS_OPTIONS,
} from '@/constants/invoice';

interface CourseFormState {
  student: {
    student_id: number;
    name: string;
  };
  family_discount: boolean;
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
  family_discount: false,
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

const mapCourseToForm = (course: Course): CourseFormState => ({
  student: {
    student_id: course.student.student_id,
    name: course.student.name,
  },
  family_discount: false,
  class_type: course.class_type || '',
  lesson_count: course.lesson_count,
  start_date: course.start_date,
  schedules: course.schedules ?? [],
  invoice: {
    status: course.invoice.status,
    method: course.invoice.method || '',
    paid_at: course.invoice.paid_at || '',
  },
});

export default function CourseForm({
  onDirtyChange,
  onSuccess,
}: CourseFormProps) {
  const { mode, selectedCourse, setMode, close } = useCourseModalStore();
  const initialState =
    (mode === 'DETAIL' || mode === 'UPDATE') && selectedCourse
      ? mapCourseToForm(selectedCourse)
      : INITIAL_FORM;
  const [form, setForm] = useState<CourseFormState>(initialState);
  const [initialForm] = useState<CourseFormState>(initialState);

  const updateForm = <K extends keyof CourseFormState>(
    key: K,
    value: CourseFormState[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const { isOpen, open } = useDateModalStore();

  const isViewMode = mode === 'DETAIL';
  const isDirty = JSON.stringify(form) !== JSON.stringify(initialForm);

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

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
      const formatDateOnly = (value: string) => {
        const parsed = new Date(value);
        if (Number.isNaN(parsed.getTime())) return value;
        const yyyy = parsed.getFullYear();
        const mm = String(parsed.getMonth() + 1).padStart(2, '0');
        const dd = String(parsed.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
      };

      const invoiceStatus: 'PAID' | 'UNPAID' =
        form.invoice.status === 'paid' ? 'PAID' : 'UNPAID';
      const invoiceMethod: 'CARD' | 'CASH' | null =
        form.invoice.status === 'paid'
          ? form.invoice.method === 'card'
            ? 'CARD'
            : form.invoice.method === 'cash'
              ? 'CASH'
              : null
          : null;
      const invoicePaidAt: string | null =
        form.invoice.status === 'paid'
          ? form.invoice.paid_at.includes('T')
            ? form.invoice.paid_at
            : `${formatDateOnly(form.invoice.paid_at)}T00:00:00`
          : null;

      const payload = {
        student_id: form.student.student_id,
        class_type: form.class_type,
        family_discount: form.family_discount,
        lesson_count: form.lesson_count,
        start_date: formatDateOnly(form.start_date),
        schedules: form.schedules,
        invoice: {
          status: invoiceStatus,
          method: invoiceMethod,
          paid_at: invoicePaidAt,
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
          onSelect={async (student) => {
            updateForm('student', {
              student_id: student.id,
              name: student.name,
            });
            const { student: detail } = await getStudent(student.id);
            updateForm('family_discount', Boolean(detail?.family_discount));
          }}
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
        <div
          className={`border rounded-sm py-1 px-2 flex justify-between
        ${
          isViewMode
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'border-primary text-primary'
        }`}
        >
          <p>
            {form.start_date
              ? formatToKoreanDate(form.start_date)
              : '날짜를 선택해주세요.'}
          </p>
          <button
            onClick={open}
            disabled={isViewMode}
            className={`${isViewMode && 'cursor-none'}`}
          >
            선택
          </button>
        </div>
        {isOpen && (
          <CalendarModal onSelect={(date) => updateForm('start_date', date)} />
        )}
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

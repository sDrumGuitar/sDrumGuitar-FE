import ModalOpenButton from '@/shared/modal/ModalOpenButton';
import { useCourseModalStore } from '@/store/course/courseModalStore';

import TableSection from '../../shared/modal/TableSection';
import type { Course } from '@/types/course';

import CourseModal from './modal/CourseModal';
import { getWeekdayLabel } from '@/utils/date/getWeekdayLabel';
import { formatToKoreanDate } from '@/utils/date/formatKoreanDate';
import { getClassTypeLabel } from '@/utils/course/getClassTypeLabel';
import { getCourses } from '@/shared/api/courses';
import Chip from '@/shared/chip/Chip';
import RefreshButton from '@/shared/button/RefreshButton';
import { useQuery } from '@tanstack/react-query';

const formatToHourMinute = (time?: string) => {
  if (!time) return '';
  const parts = time.split(':');
  if (parts.length >= 2) {
    return `${parts[0] || '00'}:${parts[1] || '00'}`;
  }
  return time;
};

const getClassTone = (classType: Course['class_type']) => {
  if (classType === 'DRUM') return 'violet';
  if (classType === 'GUITAR') return 'emerald';
  return 'slate';
};

const getInvoiceChipProps = (status: Course['invoice']['status']) =>
  status === 'PAID'
    ? ({ label: '결제', tone: 'emerald' } as const)
    : ({ label: '미결제', tone: 'amber' } as const);

function CoursePage() {
  const { isOpen, openCreate, openDetail } = useCourseModalStore();
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['courses', { page: 1, size: 20 }],
    queryFn: () => getCourses({ page: 1, size: 20 }),
    staleTime: 1000 * 60 * 5,
    refetchOnMount: (query) => query.isStale(),
  });

  const courses = data?.courses ?? [];
  const isEmpty = courses.length === 0;
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <ModalOpenButton text="신규수강 추가" openModal={openCreate} />
        <RefreshButton
          onRefresh={async () => refetch()}
          isRefreshingExternal={isFetching}
        />
      </div>
      {isEmpty ? (
        <div className="py-10 text-center text-gray-500">
          <p>조회 내용이 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="mt-4 grid gap-3 lg:hidden">
            {courses.map((course) => {
              const scheduleText = course.schedules?.length
                ? course.schedules
                    .map(
                      (schedule) =>
                        `${getWeekdayLabel(schedule.weekday)} ${formatToHourMinute(schedule.time)}`,
                    )
                    .join(', ')
                : '-';

              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => openDetail(course)}
                  className="w-full rounded-2xl border border-gray-100 bg-white px-4 py-3 text-left shadow-sm transition active:scale-[0.99]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-base font-semibold text-gray-800">
                      {course.student?.name ?? ''}
                    </div>
                    <Chip {...getInvoiceChipProps(course.invoice?.status)} />
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {course.class_type ? (
                      <Chip
                        label={getClassTypeLabel(course.class_type)}
                        tone={getClassTone(course.class_type)}
                      />
                    ) : null}
                    <Chip label={`${course.lesson_count}회`} tone="slate" />
                  </div>
                  <div className="mt-3 space-y-1 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-gray-400">
                        요일/시간
                      </span>
                      <span className="flex-1">{scheduleText}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-gray-400">
                        결제일
                      </span>
                      <span className="flex-1">
                        {course.invoice?.paid_at
                          ? formatToKoreanDate(course.invoice?.paid_at)
                          : '-'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="hidden lg:block">
            <TableSection<Course>
              dataList={courses}
              headers={[
                '이름',
                '클래스',
                '수강 회차',
                '수강 요일 & 시간',
                '결제상태',
                '결제일',
              ]}
              getRows={(courses) => {
                if (!courses || courses.length === 0) return [];
                return courses.map((course) => [
                  course.student?.name ?? '',
                  course.class_type ? (
                    <Chip
                      label={getClassTypeLabel(course.class_type)}
                      tone={getClassTone(course.class_type)}
                    />
                  ) : (
                    ''
                  ),
                  <Chip label={`${course.lesson_count}회`} tone="slate" />,
                  course.schedules?.length
                    ? course.schedules
                        .map(
                          (schedule) =>
                            `${getWeekdayLabel(schedule.weekday)} ${formatToHourMinute(schedule.time)}`,
                        )
                        .join(', ')
                    : '',
                  <Chip {...getInvoiceChipProps(course.invoice?.status)} />,
                  course.invoice?.paid_at
                    ? formatToKoreanDate(course.invoice?.paid_at)
                    : '-',
                ]);
              }}
              onRowClick={(course) => openDetail(course)}
            />
          </div>
        </>
      )}
      {isOpen && <CourseModal onSuccess={refetch} />}
    </div>
  );
}
export default CoursePage;

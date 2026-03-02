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
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { GetCoursesResponse } from '@/shared/api/courses';

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
  const queryClient = useQueryClient();
  const homeCache = queryClient.getQueryData<GetCoursesResponse>([
    'home',
    'courses',
    1,
    3,
  ]);
  const homeCacheUpdatedAt = queryClient.getQueryState([
    'home',
    'courses',
    1,
    3,
  ])?.dataUpdatedAt;

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['courses', { page: 1, size: 20 }],
    queryFn: () => getCourses({ page: 1, size: 20 }),
    initialData: homeCache
      ? { ...homeCache, page: 1, size: 20 }
      : undefined,
    initialDataUpdatedAt: homeCache ? homeCacheUpdatedAt : undefined,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: (query) => query.isStale(),
  });

  const courses = data?.courses ?? [];
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <ModalOpenButton text="신규수업 추가" openModal={openCreate} />
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
            isFetching
              ? 'border-gray-200 text-gray-400 cursor-not-allowed'
              : 'border-primary text-primary hover:bg-primary/10 active:scale-95 active:bg-primary/20'
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
            className={isFetching ? 'animate-spin' : ''}
          >
            <path
              d="M16 10a6 6 0 1 1-1.76-4.24"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <path
              d="M16 4v4h-4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          최신화
        </button>
      </div>
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
      {isOpen && <CourseModal onSuccess={refetch} />}
    </div>
  );
}
export default CoursePage;

import ModalOpenButton from '@/shared/modal/ModalOpenButton';
import { useCourseModalStore } from '@/store/course/courseModalStore';

import TableSection from '../../shared/modal/TableSection';
import type { Course } from '@/types/course';
import { useEffect, useState } from 'react';

import CourseModal from './modal/CourseModal';
import { getWeekdayLabel } from '@/utils/date/getWeekdayLabel';
import { formatToKoreanDate } from '@/utils/date/formatKoreanDate';
import { getClassTypeLabel } from '@/utils/course/getClassTypeLabel';
import { getCourses } from '@/shared/api/courses';
import Chip from '@/shared/chip/Chip';

const formatToHourMinute = (time?: string) => {
  if (!time) return '';
  const [hour, minute] = time.split(':');
  if (!hour || !minute) return time;
  return `${hour}:${minute}`;
};

const getClassTone = (classType: Course['class_type']) => {
  if (classType === 'DRUM') return 'violet';
  if (classType === 'GUITAR') return 'emerald';
  return 'slate';
};

const getInvoiceTone = (status: Course['invoice']['status']) => {
  if (status === 'PAID') return 'emerald';
  return 'amber';
};

const getInvoiceLabel = (status: Course['invoice']['status']) =>
  status === 'PAID' ? '결제' : '미결제';

function CoursePage() {
  const { isOpen, openCreate, openDetail } = useCourseModalStore();
  const [courses, setCourses] = useState<Course[]>([]);

  const loadCourse = async () => {
    const { courses } = await getCourses({ page: 1, size: 20 });
    setCourses(courses);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCourse();
  }, []);
  return (
    <div>
      <ModalOpenButton text="신규수업 추가" openModal={openCreate} />
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
            <Chip
              label={getInvoiceLabel(course.invoice?.status)}
              tone={getInvoiceTone(course.invoice?.status)}
            />,
            course.invoice?.paid_at
              ? formatToKoreanDate(course.invoice?.paid_at)
              : '-',
          ]);
        }}
        onRowClick={(course) => openDetail(course)}
      />
      {isOpen && <CourseModal onSuccess={loadCourse} />}
    </div>
  );
}
export default CoursePage;

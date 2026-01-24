import ModalOpenButton from '@/shared/modal/ModalOpenButton';
import { useCourseModalStore } from '@/store/courseModalStore';
import TableSection from '../../shared/modal/TableSection';
import type { Course } from '@/types/course';
import { useEffect, useState } from 'react';
import { getCourses } from '@/shared/api/courses';
import CourseModal from './modal/CourseModal';

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
            course.class_type ?? '',
            String(course.lesson_count),
            course.schedules?.length
              ? course.schedules
                  .map((schedule) => `${schedule.weekday} ${schedule.time}`)
                  .join(', ')
              : '',
            course.invoice.status ?? 'unpaid',
            course.invoice?.paid_at ?? '',
          ]);
        }}
        onRowClick={(course) => openDetail(course)}
      />
      {isOpen && <CourseModal onSuccess={loadCourse} />}
    </div>
  );
}
export default CoursePage;

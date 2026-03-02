import { useEffect, useMemo, useState } from 'react';
import { getCourses } from '@/shared/api/courses';
import type { Course } from '@/types/course';

interface CoursesSummary {
  totalCount: number;
  courses: Course[];
  isLoading: boolean;
}

export const useCoursesSummary = () => {
  const [summary, setSummary] = useState<CoursesSummary>({
    totalCount: 0,
    courses: [],
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      const data = await getCourses({ page: 1, size: 3 });
      if (!isMounted) return;
      setSummary({
        totalCount: data.total_count,
        courses: data.courses,
        isLoading: false,
      });
    };

    fetchCourses();

    return () => {
      isMounted = false;
    };
  }, []);

  return useMemo(() => summary, [summary]);
};

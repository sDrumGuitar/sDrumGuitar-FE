import DashboardHeader from './components/DashboardHeader';
import { useLessonSummary } from './hooks/useLessonSummary';
import { useRolloverLessons } from './hooks/useRolloverLessons';
import { useCoursesSummary } from './hooks/useCoursesSummary';
import { useStudentsSummary } from './hooks/useStudentsSummary';
import { useMessageTemplatesSummary } from './hooks/useMessageTemplatesSummary';
import { useEffect, useRef, useState } from 'react';
import LessonSummaryCards from './components/sections/LessonSummaryCards';
import LessonDistributionSection from './components/sections/LessonDistributionSection';
import RolloverLessonSection from './components/sections/RolloverLessonSection';
import CoursesSection from './components/sections/CoursesSection';
import StudentsSection from './components/sections/StudentsSection';
import MessageTemplatesSection from './components/sections/MessageTemplatesSection';

function HomePage() {
  const lessonSummary = useLessonSummary();
  const rolloverSummary = useRolloverLessons();
  const coursesSummary = useCoursesSummary();
  const studentsSummary = useStudentsSummary();
  const templatesSummary = useMessageTemplatesSummary();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(0);
  const cooldownTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (cooldownSeconds <= 0) {
      if (cooldownTimerRef.current !== null) {
        window.clearInterval(cooldownTimerRef.current);
        cooldownTimerRef.current = null;
      }
      return;
    }

    if (cooldownTimerRef.current === null) {
      cooldownTimerRef.current = window.setInterval(() => {
        setCooldownSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    }

    return () => {
      if (cooldownTimerRef.current !== null) {
        window.clearInterval(cooldownTimerRef.current);
        cooldownTimerRef.current = null;
      }
    };
  }, [cooldownSeconds]);

  const handleRefresh = async () => {
    if (isRefreshing || cooldownSeconds > 0) return;
    setIsRefreshing(true);
    await Promise.all([
      lessonSummary.refetch(),
      rolloverSummary.refetch(),
      coursesSummary.refetch(),
      studentsSummary.refetch(),
      templatesSummary.refetch(),
    ]);
    setIsRefreshing(false);
    setCooldownSeconds(30);
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        cooldownSeconds={cooldownSeconds}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
      />

      <LessonSummaryCards
        isLoading={lessonSummary.isLoading || rolloverSummary.isLoading}
        monthTotal={lessonSummary.monthTotal}
        todayTotal={lessonSummary.todayTotal}
        rolloverTotal={rolloverSummary.totalCount}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <LessonDistributionSection
          isLoading={lessonSummary.isLoading}
          weekdayCounts={lessonSummary.weekdayCounts}
        />

        <RolloverLessonSection
          isLoading={rolloverSummary.isLoading}
          lessons={rolloverSummary.lessons}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <CoursesSection
          isLoading={coursesSummary.isLoading}
          totalCount={coursesSummary.totalCount}
          courses={coursesSummary.courses}
        />

        <StudentsSection
          isLoading={studentsSummary.isLoading}
          totalCount={studentsSummary.totalCount}
          students={studentsSummary.students}
        />

        <MessageTemplatesSection
          isLoading={templatesSummary.isLoading}
          totalCount={templatesSummary.totalCount}
          templates={templatesSummary.templates}
        />
      </div>
    </div>
  );
}

export default HomePage;

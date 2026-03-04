import DashboardHeader from './components/DashboardHeader';
import { useLessonSummary } from './hooks/useLessonSummary';
import { useRolloverLessons } from './hooks/useRolloverLessons';
import { useCoursesSummary } from './hooks/useCoursesSummary';
import { useStudentsSummary } from './hooks/useStudentsSummary';
import { useMessageTemplatesSummary } from './hooks/useMessageTemplatesSummary';
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

  const handleRefresh = async () => {
    await Promise.all([
      lessonSummary.refetch(),
      rolloverSummary.refetch(),
      coursesSummary.refetch(),
      studentsSummary.refetch(),
      templatesSummary.refetch(),
    ]);
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
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

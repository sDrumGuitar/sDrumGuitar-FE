import DashboardCard from './components/DashboardCard';
import SimpleList from './components/SimpleList';
import StatCard from './components/StatCard';
import WeekdayBarChart from './components/WeekdayBarChart';
import { useLessonSummary } from './hooks/useLessonSummary';
import { useRolloverLessons } from './hooks/useRolloverLessons';
import { useCoursesSummary } from './hooks/useCoursesSummary';
import { useStudentsSummary } from './hooks/useStudentsSummary';
import { useMessageTemplatesSummary } from './hooks/useMessageTemplatesSummary';
import { formatToKoreanDate } from '@/utils/date/formatKoreanDate';
import { CLASS_TYPE_OPTIONS } from '@/constants/course';
import {
  MESSAGE_TEMPLATE_TYPE_LABELS,
  MESSAGE_TEMPLATE_TYPE_STYLES,
} from '@/constants/messageTemplate';

const getClassTypeLabel = (value: string | null) =>
  CLASS_TYPE_OPTIONS.find((opt) => opt.value === value)?.label ?? '미지정';

function HomePage() {
  const lessonSummary = useLessonSummary();
  const rolloverSummary = useRolloverLessons();
  const coursesSummary = useCoursesSummary();
  const studentsSummary = useStudentsSummary();
  const templatesSummary = useMessageTemplatesSummary();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">대시보드</h2>
        <p className="text-sm text-gray-500">
          오늘과 이번 달 주요 지표를 한눈에 확인하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="이번 달 레슨"
          value={lessonSummary.isLoading ? '...' : lessonSummary.monthTotal}
          helper="건"
        />
        <StatCard
          title="오늘 레슨"
          value={lessonSummary.isLoading ? '...' : lessonSummary.todayTotal}
          helper="건"
        />
        <StatCard
          title="이월 레슨"
          value={rolloverSummary.isLoading ? '...' : rolloverSummary.totalCount}
          helper="건"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DashboardCard
          title="요일별 레슨 분포"
          subtitle="이번 달 레슨 수를 요일별로 집계했습니다."
        >
          {lessonSummary.isLoading ? (
            <p className="text-sm text-gray-400">레슨 데이터를 불러오는 중...</p>
          ) : (
            <WeekdayBarChart data={lessonSummary.weekdayCounts} />
          )}
        </DashboardCard>

        <DashboardCard title="이월 레슨 알림" subtitle="최근 이월 레슨 3건">
          {rolloverSummary.isLoading ? (
            <p className="text-sm text-gray-400">이월 레슨을 불러오는 중...</p>
          ) : (
            <SimpleList
              items={rolloverSummary.lessons}
              emptyText="이월 레슨이 없습니다."
              renderItem={(lesson) => (
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {lesson.name}
                    </p>
                    <p className="text-xs text-gray-500">{lesson.lesson_tag}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {lesson.start_at ? formatToKoreanDate(lesson.start_at) : '-'}
                  </div>
                </div>
              )}
            />
          )}
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <DashboardCard
          title="수강 현황"
          subtitle={`총 ${coursesSummary.totalCount}건`}
        >
          {coursesSummary.isLoading ? (
            <p className="text-sm text-gray-400">수강 정보를 불러오는 중...</p>
          ) : (
            <SimpleList
              items={coursesSummary.courses}
              emptyText="수강 데이터가 없습니다."
              renderItem={(course) => (
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {course.student.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {getClassTypeLabel(course.class_type)} · {course.lesson_count}회
                    </p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatToKoreanDate(course.start_date)}
                  </div>
                </div>
              )}
            />
          )}
        </DashboardCard>

        <DashboardCard
          title="학생 현황"
          subtitle={`총 ${studentsSummary.totalCount}명`}
        >
          {studentsSummary.isLoading ? (
            <p className="text-sm text-gray-400">학생 정보를 불러오는 중...</p>
          ) : (
            <SimpleList
              items={studentsSummary.students}
              emptyText="학생 데이터가 없습니다."
              renderItem={(student) => (
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {student.name}
                    </p>
                    <p className="text-xs text-gray-500">{student.phone}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {formatToKoreanDate(student.created_at)}
                  </div>
                </div>
              )}
            />
          )}
        </DashboardCard>

        <DashboardCard
          title="메시지 템플릿"
          subtitle={`총 ${templatesSummary.totalCount}개`}
        >
          {templatesSummary.isLoading ? (
            <p className="text-sm text-gray-400">템플릿을 불러오는 중...</p>
          ) : (
            <SimpleList
              items={templatesSummary.templates}
              emptyText="템플릿이 없습니다."
              renderItem={(template) => {
                const tone = MESSAGE_TEMPLATE_TYPE_STYLES[template.type];
                return (
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {template.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatToKoreanDate(template.created_at)}
                      </p>
                    </div>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${tone.background} ${tone.text} ${tone.border}`}
                    >
                      {MESSAGE_TEMPLATE_TYPE_LABELS[template.type]}
                    </span>
                  </div>
                );
              }}
            />
          )}
        </DashboardCard>
      </div>
    </div>
  );
}

export default HomePage;

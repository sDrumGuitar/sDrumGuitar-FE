import { LessonListHeader } from '@/constants/lesson';
import ModalWrapper from '@/shared/modal/ModalWrapper';
import TableSection from '@/shared/modal/TableSection';
import ConfirmModal from '@/shared/modal/ConfirmModal';

import { useLessonModalStore } from '@/store/schedule/lessonModalStore';
import { useMakeupMessageConfirmStore } from '@/store/message/makeupMessageConfirmStore';
import { useMessageSendModalStore } from '@/store/message/messageSendModalStore';
import type { Lesson } from '@/types/lesson';
import { useEffect, useState } from 'react';
import AttendanceButtonList from './components/AttendanceButtonList';
import type { CalendarData } from '@/types/schedule';
import LessonListModalHeader from './components/LessonListModalHeader';

interface LessonListModalProps {
  dataMap: CalendarData;
  onAttendanceUpdated: (
    lessonId: number,
    attendanceStatus: string | null,
  ) => void;
  onRefreshLessons: () => Promise<void>;
}

// 일자 별 수업 목록 모달 컴포넌트
export default function LessonListModal({
  dataMap,
  onAttendanceUpdated,
  onRefreshLessons,
}: LessonListModalProps) {
  // 모달을 닫는 함수와 선택된 날짜 정보
  const { close, selectedDate } = useLessonModalStore();
  const {
    isOpen: isOpenMakeupSendConfirm,
    context: makeupSendContext,
    close: closeMakeupSendConfirm,
  } = useMakeupMessageConfirmStore();
  const { open: openMessageSendModal } = useMessageSendModalStore();
  // 선택된 날짜에 해당하는 수업 목록을 상태로 관리
  const [lessons, setLessons] = useState<Lesson[]>([]);

  // 선택한 날짜가 변경될 때마다 해당 날짜의 수업 정보를 업데이트하는 useEffect
  useEffect(() => {
    if (!selectedDate) {
      setLessons([]);
      return;
    }

    const day = dataMap[selectedDate];
    setLessons(day ? day.lessons : []);
  }, [dataMap, selectedDate]);

  return (
    <ModalWrapper onClose={close}>
      {/* 1. 모달 헤더 */}
      <LessonListModalHeader />

      {/* 2. 회차 리스트 테이블 */}
      {/* 모바일: 카드형 레이아웃 */}
      <div className="sm:hidden max-h-[calc(100dvh-12rem)] overflow-y-auto space-y-3 pr-1">
        {lessons.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            <p>조회 내용이 없습니다.</p>
          </div>
        )}
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">이름</p>
                <p className="text-base font-semibold text-gray-800">
                  {lesson.name}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">결제일</p>
                <p className="text-sm text-gray-700">
                  {lesson.paid_at ? String(lesson.paid_at) : '-'}
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-sm text-gray-700">
              <div>
                <p className="text-xs text-gray-400">클래스</p>
                <p>{lesson.class_type ?? '-'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">수강 회차</p>
                <p>
                  {lesson.lesson_index != null
                    ? `${lesson.lesson_index}회차`
                    : '-'}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs text-gray-400 mb-2">출결</p>
              <AttendanceButtonList
                attendanceStatus={lesson.attendance_status}
                lessonId={lesson.id}
                lessonTag={lesson.lesson_tag}
                lessonName={lesson.name}
                lessonIndex={lesson.lesson_index}
                onAttendanceUpdated={onAttendanceUpdated}
                onRefreshLessons={onRefreshLessons}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 데스크탑: 테이블 레이아웃 */}
      <div className="hidden sm:block">
        <TableSection
          dataList={lessons}
          headers={LessonListHeader}
          getRows={(lessons) => {
            if (!lessons || lessons.length === 0) return [];
            return lessons.map((lesson) => [
              lesson.name,
              lesson.class_type,
              lesson.lesson_index != null ? `${lesson.lesson_index}회차` : '-',
              lesson.paid_at ? String(lesson.paid_at) : '-',
              <AttendanceButtonList
                attendanceStatus={lesson.attendance_status}
                lessonId={lesson.id}
                lessonTag={lesson.lesson_tag}
                lessonName={lesson.name}
                lessonIndex={lesson.lesson_index}
                onAttendanceUpdated={onAttendanceUpdated}
                onRefreshLessons={onRefreshLessons}
              />,
            ]);
          }}
        />
      </div>

      {/* 3. 보강 문자 보내기 확인 모달 */}
      <ConfirmModal
        isOpen={isOpenMakeupSendConfirm}
        title="보강 문자 보내기"
        description="보강 문자를 보내시겠습니까?"
        confirmText="보내기"
        cancelText="취소"
        onConfirm={() => {
          if (makeupSendContext) {
            openMessageSendModal(makeupSendContext);
          }
          closeMakeupSendConfirm();
        }}
        onCancel={closeMakeupSendConfirm}
      />
    </ModalWrapper>
  );
}

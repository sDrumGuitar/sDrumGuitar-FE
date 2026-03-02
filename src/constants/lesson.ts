// 수강 목록 헤더
export const LessonListHeader = [
  '이름',
  '클래스',
  '수강 회차',
  '결제일',
  '출결',
];

// 출결 색상
export const ATTENDANCE_COLORS = new Map([
  ['attended', '#3AA675'],
  ['absent', '#E87272'],
  ['makeup', '#EFA04C'],
  ['rollover', '#805AD5'],
]);

// 이월 수업 목록 헤더
export const CARRY_LESSON_LIST_HEADER = [
  '이름',
  '클래스',
  '기존 날짜',
  // '회차 정보',
  '등록하기',
];

// 모달에서 한 번에 보여줄 수 있는 최대 수업 개수
export const MAX_VISIBLE_LESSONS = 3;

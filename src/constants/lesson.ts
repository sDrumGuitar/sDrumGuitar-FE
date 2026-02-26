export const LessonListHeader = [
  '이름',
  '클래스',
  '수강 회차',
  '결제일',
  '출결',
];

export const ATTENDANCE_COLORS = new Map([
  ['attended', '#38A169'],
  ['absent', '#F76868'],
  ['makeup', '#FF7825'],
  ['rollover', '#805AD5'],
]);

export const CARRY_LESSON_LIST_HEADER = [
  '이름',
  '클래스',
  '기존 날짜',
  // '회차 정보',
  '등록하기',
];

// 모달에서 한 번에 보여줄 수 있는 최대 수업 개수
export const MAX_VISIBLE_LESSONS = 3;

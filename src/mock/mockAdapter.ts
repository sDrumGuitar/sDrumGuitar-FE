import type {
  AxiosAdapter,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

/*
 * 스크린샷/시연용 목업 어댑터
 * - VITE_USE_MOCK=true 일 때 axios 요청을 실제 서버 대신 여기서 응답
 * - 데이터는 메모리에만 존재하며 새로고침하면 초기화됨
 */

type Weekday = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
type AgeGroup = 'preschool' | 'element' | 'middle' | 'high' | 'adult';

const WEEKDAYS: Weekday[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const pad = (n: number) => String(n).padStart(2, '0');
const toDateKey = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(10, 0, 0, 0);
  return d.toISOString();
};

// ====================
// 학생
// ====================
const STUDENT_SEED: [string, AgeGroup, string, string, string | null][] = [
  ['김민준', 'element', '010-2345-1123', '010-8834-1123', '형제 할인 대상'],
  ['이서연', 'middle', '010-3456-2231', '010-7712-2231', null],
  ['박지호', 'high', '010-4567-3342', '010-6623-3342', '입시 준비 중'],
  ['최유진', 'adult', '010-5678-4453', '', '직장인, 저녁 수업 선호'],
  ['정하윤', 'element', '010-6789-5564', '010-5534-5564', null],
  ['강도윤', 'preschool', '', '010-4445-6675', '보호자 동행'],
  ['조서준', 'middle', '010-7890-6675', '010-3356-6675', null],
  ['윤지우', 'adult', '010-8901-7786', '', '밴드 활동 중'],
  ['장예린', 'high', '010-9012-8897', '010-2267-8897', null],
  ['임시우', 'element', '010-1234-9908', '010-1178-9908', '형제 할인 대상'],
  ['한수아', 'adult', '010-2345-0019', '', null],
  ['오건우', 'middle', '010-3456-1120', '010-9989-1120', null],
  ['서하은', 'element', '010-4567-2231', '010-8890-2231', '악보 읽기 연습 필요'],
  ['신준서', 'adult', '010-5678-3342', '', '주말 수업만 가능'],
  ['권채원', 'high', '010-6789-4453', '010-7701-4453', null],
  ['황이준', 'preschool', '', '010-6612-5564', null],
  ['안소율', 'middle', '010-7890-5564', '010-5523-5564', null],
  ['송현우', 'adult', '010-8901-6675', '', '기타 개인 장비 보유'],
  ['류지안', 'element', '010-9012-7786', '010-4434-7786', null],
  ['홍다인', 'adult', '010-0123-8897', '', null],
];

const students = STUDENT_SEED.map(
  ([name, age_group, phone, parent_phone, memo], i) => ({
    student_id: i + 1,
    name,
    age_group,
    phone,
    parent_phone,
    memo,
    family_discount: memo === '형제 할인 대상',
    created_at: daysAgo(120 - i * 4),
    updated_at: daysAgo(10 + i),
  }),
);

// ====================
// 수강
// ====================
const SCHEDULE_PATTERNS: { weekday: Weekday; time: string }[][] = [
  [{ weekday: 'MON', time: '15:00' }, { weekday: 'WED', time: '15:00' }],
  [{ weekday: 'TUE', time: '16:00' }],
  [{ weekday: 'THU', time: '17:00' }, { weekday: 'SAT', time: '11:00' }],
  [{ weekday: 'FRI', time: '19:00' }],
  [{ weekday: 'MON', time: '18:00' }],
  [{ weekday: 'WED', time: '14:00' }],
  [{ weekday: 'TUE', time: '19:30' }, { weekday: 'THU', time: '19:30' }],
  [{ weekday: 'SAT', time: '13:00' }],
];
const COURSE_STATUSES = ['ACTIVE', 'ACTIVE', 'ACTIVE', 'ACTIVE', 'PAUSED', 'ACTIVE', 'ENDED'] as const;

const courses = students.map((s, i) => {
  const lessonCount = [4, 8, 8, 12][i % 4];
  const paid = i % 5 !== 2;
  return {
    course_id: i + 1,
    student: {
      student_id: s.student_id,
      name: s.name,
      age_group: s.age_group.toUpperCase(),
      phone: s.phone,
      parent_phone: s.parent_phone,
    },
    class_type: (i % 3 === 1 ? 'GUITAR' : 'DRUM') as 'DRUM' | 'GUITAR',
    start_date: daysAgo(60 - i * 2).slice(0, 10),
    status: COURSE_STATUSES[i % COURSE_STATUSES.length],
    lesson_count: lessonCount,
    schedules: SCHEDULE_PATTERNS[i % SCHEDULE_PATTERNS.length],
    invoice: {
      invoice_id: 1000 + i,
      method: paid ? ((i % 2 ? 'CARD' : 'CASH') as 'CARD' | 'CASH') : null,
      status: (paid ? 'PAID' : 'UNPAID') as 'PAID' | 'UNPAID',
      paid_at: paid ? daysAgo(20 - (i % 10)) : null,
    },
    created_at: s.created_at,
    updated_at: s.updated_at,
  };
});

// ====================
// 레슨 (월별로 수강 스케줄에서 생성)
// ====================
const attendanceOverrides = new Map<number, string>();
const lessonCache = new Map<string, ReturnType<typeof buildMonth>>();

function buildMonth(year: number, month: number) {
  const today = toDateKey(new Date());
  const lastDay = new Date(year, month, 0).getDate();
  const counters = new Map<number, number>();
  const days: { date: string; lessons: Record<string, unknown>[] }[] = [];

  for (let day = 1; day <= lastDay; day++) {
    const date = new Date(year, month - 1, day);
    const dateKey = toDateKey(date);
    const weekday = WEEKDAYS[date.getDay()];
    const lessons: Record<string, unknown>[] = [];

    courses.forEach((course) => {
      if (course.status === 'ENDED') return;
      course.schedules
        .filter((schedule) => schedule.weekday === weekday)
        .forEach((schedule) => {
          const index = (counters.get(course.course_id) ?? 0) + 1;
          counters.set(course.course_id, index);
          const lessonId = year * 1_000_000 + month * 10_000 + day * 100 + course.course_id;
          const isPast = dateKey < today;
          const roll = (course.course_id + day) % 11;
          const defaultStatus = !isPast
            ? 'NOTYET'
            : roll === 0
              ? 'ABSENT'
              : roll === 5
                ? 'MAKEUP'
                : roll === 8
                  ? 'ROLLOVER'
                  : 'ATTENDED';
          const startAt = `${dateKey}T${schedule.time}:00+09:00`;
          lessons.push({
            lesson_id: lessonId,
            name: course.student.name,
            class_type: course.class_type,
            course_status: course.status,
            lesson_tag: 'NORMAL',
            attendance_status: attendanceOverrides.get(lessonId) ?? defaultStatus,
            before_at: startAt,
            start_at: startAt,
            lesson_index: ((index - 1) % course.lesson_count) + 1,
          });
        });
    });

    if (lessons.length) days.push({ date: dateKey, lessons });
  }

  return { year, month, days };
}

function getMonth(year: number, month: number) {
  const key = `${year}-${month}`;
  if (!lessonCache.has(key)) lessonCache.set(key, buildMonth(year, month));
  const data = lessonCache.get(key)!;
  // 출결 변경 사항 반영
  data.days.forEach((d) =>
    d.lessons.forEach((l) => {
      const override = attendanceOverrides.get(l.lesson_id as number);
      if (override) l.attendance_status = override;
    }),
  );
  return data;
}

function getRolloverLessons() {
  const now = new Date();
  const months = [
    [now.getFullYear(), now.getMonth() + 1],
    now.getMonth() === 0 ? [now.getFullYear() - 1, 12] : [now.getFullYear(), now.getMonth()],
  ];
  const lessons = months
    .flatMap(([y, m]) => getMonth(y, m).days.flatMap((d) => d.lessons))
    .filter((l) => l.attendance_status === 'ROLLOVER')
    .slice(0, 6);
  return { total_count: lessons.length, lessons };
}

// ====================
// 청구서
// ====================
const PRICE = { DRUM: 45000, GUITAR: 40000 };

function getInvoices(studentId: number) {
  const course = courses.find((c) => c.student.student_id === studentId);
  const classType = course?.class_type ?? 'DRUM';
  const lessonCount = course?.lesson_count ?? 8;
  const familyDiscount = students[studentId - 1]?.family_discount ?? false;
  const base = PRICE[classType] * lessonCount;
  const total = familyDiscount ? Math.round(base * 0.9) : base;

  return {
    student_id: studentId,
    items: [0, 1, 2].map((n) => {
      const paid = n > 0 || course?.invoice.status === 'PAID';
      return {
        invoice_id: studentId * 10 + n,
        enrollment_id: course?.course_id ?? studentId,
        issued_at: daysAgo(n * 30 + 3),
        paid_at: paid ? daysAgo(n * 30) : null,
        status: paid ? 'PAID' : 'UNPAID',
        method: paid ? (n % 2 ? 'CASH' : 'CARD') : null,
        class_type: classType,
        lesson_count: lessonCount,
        family_discount: familyDiscount,
        total_amount: total,
      };
    }),
  };
}

// ====================
// 메시지 템플릿
// ====================
let nextTemplateId = 9;
const templates = [
  ['ATTENDANCE', '출석 안내', '안녕하세요, 에스드럼기타입니다. {학생명} 학생이 오늘 수업에 정상 출석했습니다. 오늘도 수고 많으셨습니다!'],
  ['LATE', '지각 안내', '안녕하세요, 에스드럼기타입니다. {학생명} 학생이 아직 도착하지 않았습니다. 확인 부탁드립니다.'],
  ['ABSENT', '결석 안내', '안녕하세요, 에스드럼기타입니다. {학생명} 학생이 오늘 수업에 결석했습니다. 보강 일정은 추후 안내드리겠습니다.'],
  ['MAKEUP', '보강 일정 안내', '안녕하세요, 에스드럼기타입니다. {학생명} 학생의 보강 수업이 {날짜} {시간}에 예정되어 있습니다.'],
  ['ROLLOVER', '이월 안내', '안녕하세요, 에스드럼기타입니다. {학생명} 학생의 수업이 다음 달로 이월되었습니다.'],
  ['INVOICE_UNPAID', '수강료 납부 안내', '안녕하세요, 에스드럼기타입니다. {학생명} 학생의 이번 달 수강료가 아직 납부되지 않았습니다. 확인 부탁드립니다.'],
  ['CUSTOM', '휴원 안내', '안녕하세요, 에스드럼기타입니다. 추석 연휴 기간 동안 학원이 휴원합니다. 즐거운 명절 보내세요!'],
  ['CUSTOM', '발표회 안내', '안녕하세요, 에스드럼기타입니다. 연말 발표회가 12월 20일(토)에 진행됩니다. 많은 참여 부탁드립니다.'],
].map(([type, title, content], i) => ({
  template_id: i + 1,
  type,
  title,
  content,
  created_at: daysAgo(40 - i * 3),
  updated_at: daysAgo(10 - i),
}));

// ====================
// 라우팅
// ====================
type Handler = (
  match: RegExpMatchArray,
  config: InternalAxiosRequestConfig,
  body: Record<string, unknown>,
) => unknown;

const paginate = <T>(list: T[], params: { page?: number; size?: number }) => {
  const page = Number(params?.page ?? 1);
  const size = Number(params?.size ?? list.length);
  return {
    total_count: list.length,
    page,
    size,
    items: list.slice((page - 1) * size, page * size),
  };
};

const routes: [string, RegExp, Handler][] = [
  ['get', /^\/students$/, (_m, c) => {
    const { items, ...rest } = paginate(students, c.params);
    return { ...rest, students: items };
  }],
  ['get', /^\/students\/studentsInfo$/, (_m, c) =>
    students
      .filter((s) => s.name.includes(String(c.params?.name ?? '')))
      .map((s) => ({ student_id: s.student_id, name: s.name, phone: s.phone || s.parent_phone })),
  ],
  ['get', /^\/students\/(\d+)$/, (m) => students.find((s) => s.student_id === Number(m[1]))],
  ['post', /^\/students$/, (_m, _c, body) => {
    const student = { ...students[0], ...body, student_id: students.length + 1, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    students.unshift(student as (typeof students)[number]);
    return student;
  }],
  ['patch', /^\/students\/(\d+)$/, (m, _c, body) => {
    const student = students.find((s) => s.student_id === Number(m[1]));
    Object.assign(student ?? {}, body, { updated_at: new Date().toISOString() });
    return student;
  }],

  ['get', /^\/courses$/, (_m, c) => {
    const { items, ...rest } = paginate(courses, c.params);
    return { ...rest, courses: items };
  }],
  ['post', /^\/courses$/, (_m, _c, body) => ({ ...courses[0], ...body, course_id: courses.length + 1 })],
  ['patch', /^\/courses\/(\d+)$/, (m, _c, body) => {
    const course = courses.find((c) => c.course_id === Number(m[1]));
    Object.assign(course ?? {}, body);
    return course;
  }],

  ['get', /^\/invoices\/(\d+)$/, (m) => getInvoices(Number(m[1]))],
  ['patch', /^\/invoices\/(\d+)$/, (m, _c, body) => ({
    invoice_id: Number(m[1]),
    status: body.status,
    method: body.method ?? null,
    paid_at: body.paid_at ?? null,
    updated_at: new Date().toISOString(),
  })],

  ['get', /^\/lessons$/, (_m, c) => getMonth(Number(c.params?.year), Number(c.params?.month))],
  ['get', /^\/lessons\/rollover$/, () => getRolloverLessons()],
  ['patch', /^\/lessons\/(\d+)\/attendance$/, (m, _c, body) => {
    attendanceOverrides.set(Number(m[1]), String(body.attendance_status).toUpperCase());
    return { lesson_id: Number(m[1]), ...body };
  }],
  ['patch', /^\/lessons\/(\d+)\/makeup$/, (m, _c, body) => {
    attendanceOverrides.set(Number(m[1]), 'MAKEUP');
    return { lesson_id: Number(m[1]), ...body };
  }],
  ['post', /^\/lessons\/(\d+)\/rollover$/, (m, _c, body) => ({ lesson_id: Number(m[1]), ...body })],

  ['get', /^\/messages\/templates$/, (_m, c) => {
    const { items, ...rest } = paginate(templates, c.params);
    return { ...rest, templates: items };
  }],
  ['post', /^\/messages\/templates$/, (_m, _c, body) => {
    const now = new Date().toISOString();
    const template = { template_id: nextTemplateId++, type: String(body.type), title: String(body.title), content: String(body.content), created_at: now, updated_at: now };
    templates.unshift(template);
    return { ...template, createdAt: now, updatedAt: now };
  }],
  ['patch', /^\/messages\/templates\/(\d+)$/, (m, _c, body) => {
    const template = templates.find((t) => t.template_id === Number(m[1]));
    Object.assign(template ?? {}, body, { updated_at: new Date().toISOString() });
    return template;
  }],
  ['delete', /^\/messages\/templates\/(\d+)$/, (m) => {
    const index = templates.findIndex((t) => t.template_id === Number(m[1]));
    if (index >= 0) templates.splice(index, 1);
    return null;
  }],
];

export const mockAdapter: AxiosAdapter = async (config) => {
  const method = (config.method ?? 'get').toLowerCase();
  const url = (config.url ?? '').split('?')[0];
  const body =
    typeof config.data === 'string' ? JSON.parse(config.data || '{}') : (config.data ?? {});

  await new Promise((resolve) => setTimeout(resolve, 150));

  for (const [routeMethod, pattern, handler] of routes) {
    const match = url.match(pattern);
    if (routeMethod === method && match) {
      const data = handler(match, config, body);
      return {
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      } as AxiosResponse;
    }
  }

  console.warn(`[mock] unhandled request: ${method.toUpperCase()} ${url}`);
  return { data: {}, status: 200, statusText: 'OK', headers: {}, config } as AxiosResponse;
};

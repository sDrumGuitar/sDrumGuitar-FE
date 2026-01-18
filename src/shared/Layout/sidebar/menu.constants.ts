import type { MenuItem } from "./types";

export const MENU_LIST: MenuItem[] = [
  { href: "/home", label: "홈" },
  { href: "/student", label: "학생" },
  { href: "/course", label: "수강" },
  { href: "/schedule", label: "일정" },
  {
    href: "/message",
    label: "메시지",
    children: [
      { href: "/message/send", label: "문자 보내기" },
      { href: "/message/history", label: "발송 내역" },
      { href: "/message/template", label: "문자 템플릿" },
    ],
  },
];

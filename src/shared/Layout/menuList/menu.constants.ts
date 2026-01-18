import type { MenuItem } from "./types";
import {
  FiHome,
  FiUsers,
  FiBookOpen,
  FiCalendar,
  FiMessageSquare,
  FiSend,
  FiClock,
  FiFileText,
} from "react-icons/fi";

export const MENU_LIST: MenuItem[] = [
  {
    href: "/home",
    label: "홈",
    icon: FiHome,
  },
  {
    href: "/student",
    label: "학생",
    icon: FiUsers,
  },
  {
    href: "/course",
    label: "수강",
    icon: FiBookOpen,
  },
  {
    href: "/schedule",
    label: "일정",
    icon: FiCalendar,
  },
  {
    href: "/message",
    label: "메시지",
    icon: FiMessageSquare,
    children: [
      {
        href: "/message/send",
        label: "문자 보내기",
        icon: FiSend,
      },
      {
        href: "/message/history",
        label: "발송 내역",
        icon: FiClock,
      },
      {
        href: "/message/template",
        label: "문자 템플릿",
        icon: FiFileText,
      },
    ],
  },
];

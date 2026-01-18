import type { IconType } from "react-icons";

export interface MenuItem {
  href: string;
  label: string;
  icon?: IconType;
  children?: MenuItem[];
}

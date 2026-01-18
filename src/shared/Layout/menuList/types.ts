export interface MenuItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}

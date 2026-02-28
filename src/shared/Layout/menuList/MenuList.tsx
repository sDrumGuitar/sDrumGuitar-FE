import { useLocation } from 'react-router-dom';
import { MENU_LIST } from '@/constants/menu';
import { ChildMenu, ParentMenu } from './MenuItem';

export const MenuList = () => {
  const { pathname } = useLocation();
  const activeMenu = MENU_LIST.find(
    (menu) =>
      pathname === menu.href ||
      menu.children?.some((child) => pathname.startsWith(child.href))
  );

  return (
    <nav className="flex flex-col gap-2 px-2 pb-3 md:pb-0">
      <div className="flex md:flex-col flex-row gap-1 md:gap-1 overflow-x-auto md:overflow-visible">
        {MENU_LIST.map((menu) => {
          const isActive =
            pathname === menu.href ||
            menu.children?.some((c) => pathname.startsWith(c.href));

          return (
            <div key={menu.href} className="flex flex-col">
              <ParentMenu
                href={menu.href}
                label={menu.label}
                active={!!isActive}
                icon={menu.icon}
              />
            </div>
          );
        })}
      </div>

      {activeMenu?.children && (
        <div className="flex md:flex-col flex-row gap-1 md:gap-1 px-1 md:px-0 overflow-x-auto md:overflow-visible">
          {activeMenu.children.map((child) => (
            <ChildMenu key={child.href} {...child} />
          ))}
        </div>
      )}
    </nav>
  );
};

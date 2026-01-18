import { useLocation } from "react-router-dom";
import { MENU_LIST } from "./menu.constants";
import { ParentMenu, ChildMenu } from "./MenuItem";

export const MenuList = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex flex-col gap-1 px-2">
      {MENU_LIST.map((menu) => {
        const isActive =
          pathname === menu.href ||
          menu.children?.some((c) => pathname.startsWith(c.href));

        return (
          <div key={menu.href} className="flex flex-col gap-1">
            <ParentMenu
              href={menu.href}
              label={menu.label}
              active={!!isActive}
            />

            {menu.children && isActive && (
              <div className="flex flex-col gap-1">
                {menu.children.map((child) => (
                  <ChildMenu key={child.href} {...child} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

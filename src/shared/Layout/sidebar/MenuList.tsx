import { NavLink } from "react-router-dom";
import { MENU_LIST } from "./menu.constants";

export const MenuList = () => {
  const baseClass = "px-4 py-2 text-base transition-all duration-300";
  const activeClass = "bg-primary text-white font-bold text-lg";

  return (
    <nav className="flex flex-col">
      {MENU_LIST.map((menu) => (
        <NavLink
          key={menu.href}
          to={menu.href}
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          {menu.label}
        </NavLink>
      ))}
    </nav>
  );
};

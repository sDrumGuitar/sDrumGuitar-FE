import { NavLink } from "react-router-dom";
import type { MenuItem } from "./types";
import {
  parentBase,
  parentActive,
  parentInactive,
  childBase,
  childActive,
  childInactive,
} from "./styles";
import { cx } from "./utils";

export const ParentMenu = ({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) => (
  <NavLink
    to={href}
    className={() => cx(parentBase, active ? parentActive : parentInactive)}
  >
    {label}
  </NavLink>
);

export const ChildMenu = ({ href, label }: MenuItem) => (
  <NavLink
    to={href}
    className={({ isActive }) =>
      cx(childBase, isActive ? childActive : childInactive)
    }
  >
    {label}
  </NavLink>
);

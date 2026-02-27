import { NavLink } from 'react-router-dom';
import type { MenuItem } from '@/types/menu';
import { childBase, childActive, childInactive } from '../../menuList.styles';
import { cx } from '@/utils/cx';

export const ChildMenu = ({ href, label, icon: Icon }: MenuItem) => (
  <NavLink
    to={href}
    className={({ isActive }) =>
      cx(childBase, isActive ? childActive : childInactive)
    }
  >
    <span className="flex items-center gap-3">
      {Icon && <Icon className="text-lg" />}
      <span>{label}</span>
    </span>
  </NavLink>
);

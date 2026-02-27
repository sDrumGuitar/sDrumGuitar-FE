import { NavLink } from 'react-router-dom';

import { parentBase, parentActive, parentInactive } from '../../menuList.styles';
import { cx } from '@/utils/cx';

export const ParentMenu = ({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
  icon?: React.ElementType;
}) => (
  <NavLink
    to={href}
    className={() => cx(parentBase, active ? parentActive : parentInactive)}
  >
    <span className="flex items-center gap-3">
      {Icon && <Icon className="text-lg" />}
      <span>{label}</span>
    </span>
  </NavLink>
);

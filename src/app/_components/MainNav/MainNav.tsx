import { usePathname } from 'next/navigation';

import type { NavLinkProps } from '@/lib/components';
import { NavLink } from '@/lib/components';

interface Props {
  links: NavLinkProps[];
}

export function MainNav(props: Props) {
  const { links } = props;
  const path = usePathname();
  return (
    <div className="flex gap-8">
      {links.map(({ href, ...rest }) => (
        <NavLink key={href} isActive={path === href} href={href} {...rest} />
      ))}
    </div>
  );
}

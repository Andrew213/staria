import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavLinkProps } from '@/lib/components';

interface Props {
  links: NavLinkProps[];
  onLinkClick?: () => void;
}

export function MobileNav({ links, onLinkClick }: Props) {
  const path = usePathname();
  return (
    <div className="flex grow flex-col py-6">
      {links.map((linkProps) => (
        <div key={linkProps.href} className="px-3 py-4">
          <Link
            href={linkProps.href}
            onClick={onLinkClick}
            color="gray"
            className={cn('text-md !font-medium text-gray-600 hover:text-gray-900 focus:text-gray-600', {
              '!font-semibold text-gray-900': linkProps.href === path,
            })}
          >
            {linkProps.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

import cn from 'classnames';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type React from 'react';

export type NavLinkProps = {
  title: React.ReactNode;
  href: string;
  className?: string | undefined;
  onClick?: () => void;
  external?: boolean;
  isActive?: boolean;
} & LinkProps;

export function NavLink(props: NavLinkProps) {
  const { title, href, className, onClick, external, isActive, ...rest } = props;

  return (
    <Link
      target={external ? '_blank' : undefined}
      onClick={onClick}
      href={href}
      className={cn(
        'text-md font-medium text-gray-600 hover:text-black dark:text-gray-blue-200 dark:hover:text-white',
        className,
        {
          '!font-semibold text-gray-900 dark:text-white': isActive,
        },
      )}
      {...rest}
    >
      {title}
    </Link>
  );
}

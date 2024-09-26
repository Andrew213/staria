import cn from 'classnames';
import NextLink from 'next/link';
import type React from 'react';

type Size = 'sm' | 'lg' | 'xl';
type Color = 'gray';

interface Props {
  content: React.ReactNode;
  size: Size;
  color: Color;
  href: string;
  onClick?: () => void;
  target?: string;
  className?: string;
}

export function Link(props: Props) {
  const { content, size, color, href, onClick, target, className } = props;

  return (
    <NextLink
      className={cn(
        'font-semibold transition-all duration-200 ease-linear',
        {
          'text-sm': size === 'sm',
          'text-md': size === 'lg',
          'text-xl': size === 'xl',
          'text-gray-600 hover:text-gray-900 focus:text-gray-600 dark:text-gray-blue-100 dark:hover:text-gray-blue-100 dark:focus:text-gray-blue-100':
            color === 'gray',
        },
        { [className!]: className },
      )}
      href={href}
      target={target}
      onClick={onClick}
    >
      {content}
    </NextLink>
  );
}

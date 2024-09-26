import cn from 'classnames';
import Link from 'next/link';

import { ArrowIcon } from '@/assets/icons';

import type { PaginationProps } from './Pagination';
import { getFullHref, getNavItems } from './utils';

export function DesktopPagination({ totalPages, current, uriParams }: PaginationProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <Link
        className={cn('flex items-center gap-2', {
          ['invisible']: current === 1,
        })}
        href={getFullHref(uriParams, current - 1)}
        scroll={false}
        shallow
      >
        <span className="size-5 rotate-180 stroke-gray-600">
          <ArrowIcon />
        </span>
        <span className="text-sm font-semibold text-gray-600">Previous</span>
      </Link>
      <div className="flex gap-1">
        {getNavItems(totalPages, current).map(({ label, value }) => (
          <Link
            className={cn(
              `flex h-10 min-w-10 items-center justify-center rounded-2 p-3 text-center text-sm font-medium text-gray-600 outline-none transition-shadow hover:bg-primary-500 hover:text-white focus:shadow-focus-ring-1`,
              {
                ['bg-primary-500 text-white']: value === current,
              },
            )}
            key={label + value}
            href={getFullHref(uriParams, value)}
            scroll={false}
            shallow
          >
            {label}
          </Link>
        ))}
      </div>
      <Link
        className={cn('flex items-center gap-2', {
          ['invisible']: current === totalPages,
        })}
        href={getFullHref(uriParams, current + 1)}
        scroll={false}
        shallow
      >
        <span className="text-sm font-semibold text-gray-600">Next</span>
        <span className="size-5 stroke-gray-600">
          <ArrowIcon />
        </span>
      </Link>
    </div>
  );
}

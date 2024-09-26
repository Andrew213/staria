import cn from 'classnames';
import Link from 'next/link';

import { ArrowIcon } from '@/assets/icons';

import type { PaginationProps } from './Pagination';
import { getFullHref } from './utils';

export function MobilePagination({ totalPages, current, uriParams }: PaginationProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <Link
        className={cn(
          'flex size-9 items-center justify-center rounded-2 border border-gray-300 transition hover:bg-gray-50',
          {
            ['invisible']: current === 1,
          },
        )}
        href={getFullHref(uriParams, current - 1)}
        scroll={false}
        shallow
      >
        <span className="size-5 rotate-180 stroke-gray-700">
          <ArrowIcon />
        </span>
      </Link>
      <div className="font-rubik text-sm text-gray-700">
        Page {current} of {totalPages}
      </div>
      <Link
        className={cn(
          'flex size-9 items-center justify-center rounded-2 border border-gray-300 transition hover:bg-gray-50',
          {
            ['invisible']: current === totalPages,
          },
        )}
        href={getFullHref(uriParams, current + 1)}
        scroll={false}
        shallow
      >
        <span className="size-5 stroke-gray-700">
          <ArrowIcon />
        </span>
      </Link>
    </div>
  );
}

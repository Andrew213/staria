'use client';

import NoSsr from '@/core/NoSsr/NoSsr';
import { useBreakpoint } from '@/lib/hooks';

import { DesktopPagination } from './DesktopPagination';
import { MobilePagination } from './MobilePagination';
import type { URIParams } from './types';

interface Props {
  totalPages: number;
  current: number;
  uriParams: URIParams;
}

function Pagination({ totalPages = 1, current = 1, uriParams }: Props) {
  const { isBelowMd } = useBreakpoint('md');
  if (!totalPages || !current) return null;
  return (
    <NoSsr>
      <div className="border-t border-gray-200 pt-4 md:pt-5">
        {isBelowMd ? (
          <MobilePagination totalPages={totalPages} current={current} uriParams={uriParams} />
        ) : (
          <DesktopPagination totalPages={totalPages} current={current} uriParams={uriParams} />
        )}
      </div>
    </NoSsr>
  );
}

export { Pagination };
export type { Props as PaginationProps };

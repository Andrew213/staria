import Link from 'next/link';

import { ArrowUpRightIcon } from '@/assets/icons';

interface Props {
  href: string;
  title: string;
}

export function ReadLink({ href, title }: Props) {
  return (
    <Link className="flex items-center gap-2 text-md font-semibold text-primary-500" href={href}>
      {title}
      <div className="size-5 text-primary-500">
        <ArrowUpRightIcon />
      </div>
    </Link>
  );
}

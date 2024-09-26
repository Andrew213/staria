import cn from 'classnames';
import Link from 'next/link';

import { QuestionMarkIcon } from '@/assets/icons';

interface Props {
  text: string;
  linkHref: string;
  linkText: string;
  isIconShown?: boolean;
  className?: string;
}

export function TextWithLink(props: Props) {
  const { text, linkHref, linkText, isIconShown, className } = props;

  return (
    <div className={cn('mt-8 flex w-full items-center justify-center gap-1', className)}>
      {isIconShown && <QuestionMarkIcon className="size-5" />}
      <p className="font-rubik text-sm font-semibold text-gray-600 dark:text-gray-blue-100">{text}</p>
      <Link href={linkHref} className="text-sm font-semibold text-primary-500 dark:text-primary-300">
        {linkText}
      </Link>
    </div>
  );
}

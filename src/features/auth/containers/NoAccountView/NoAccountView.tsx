import Link from 'next/link';

import { EmailIcon } from '@/assets/icons';
import { Button, FeaturedIcon } from '@/lib/components';
import type { SignInErrors } from '@/types';

import { data } from './constants';

const { errorsMessages, button, link } = data;

interface Props {
  setState: (a: boolean) => void;
  errorMessage: SignInErrors;
}

export function NoAccountView({ setState, errorMessage }: Props) {
  const err = errorsMessages[errorMessage];
  return (
    <div className="flex flex-col items-center lg:mb-[172px] lg:mt-16">
      <FeaturedIcon Icon={EmailIcon} color="error" theme="light-circle-outline" size="xl" />
      <div className="my-6 flex flex-col items-center gap-3 text-center">
        <h1 className="text-display-xs font-semibold text-gray-900 2xl:text-display-sm dark:text-white">
          {err?.message || errorsMessages.Unauthorized.message}
        </h1>
        <p className="font-rubik text-md font-normal text-gray-600 dark:text-gray-100">
          {err?.description || errorsMessages.Unauthorized.description}
        </p>
      </div>
      <div className="flex flex-col items-center gap-6 text-center">
        <Button
          onClick={() => setState(true)}
          size="lg"
          color="primary"
          content={button.text}
          href={button.href}
          className="w-full"
        />
        <div className="flex items-center gap-1">
          <span className="font-rubik text-sm font-normal text-gray-600 dark:text-gray-100">{link.text}</span>
          <Link href={link.linkHref} className="text-sm font-semibold text-primary-500 dark:text-primary-300">
            {link.linkText}
          </Link>
        </div>
      </div>
    </div>
  );
}

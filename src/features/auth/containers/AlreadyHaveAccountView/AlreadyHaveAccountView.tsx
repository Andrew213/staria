'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { EmailIcon } from '@/assets/icons';
import { FeaturedIcon } from '@/lib/components';
import { routes } from '@/routes';

import { data } from './constants';

const { title, supportingText, email, link } = data;

interface Props {
  setSignUpState: (a: null) => void;
}

export function AlreadyHaveAccountView({ setSignUpState }: Props) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  return (
    <div className="flex flex-col items-center lg:mb-[248px] lg:mt-[141px]">
      <FeaturedIcon Icon={EmailIcon} color="error" theme="light-circle-outline" size="xl" />
      <div className="mb-8 mt-6 flex flex-col items-center gap-4 text-center">
        <h1 className="text-display-xs font-semibold text-gray-900 2xl:text-display-sm dark:text-white">{title}</h1>
        <p className="font-rubik text-md font-normal text-gray-600 dark:text-gray-blue-100">
          {supportingText.firstText}
        </p>
        <p className="font-rubik text-md font-normal text-gray-600 dark:text-gray-blue-100">
          {supportingText.lastText}
        </p>
        <Link href={email.linkHref} className="text-sm font-semibold text-gray-900 dark:text-white">
          {email.linkText}
        </Link>
      </div>
      <div className="flex items-center gap-1">
        <span className="font-rubik text-sm font-normal text-gray-600 dark:text-gray-100">{link.firstText}</span>
        <Link
          href={redirect ? routes.signup.getRedirectPath({ redirect }) : routes.signup.getRedirectPath()}
          onClick={() => setSignUpState(null)}
          className="text-sm font-semibold text-primary-500 dark:text-primary-300"
        >
          {link.linkText}
        </Link>
        <span className="font-rubik text-sm font-normal text-gray-600 dark:text-gray-100">{link.lastText}</span>
      </div>
    </div>
  );
}

import Link from 'next/link';

import { EmailDeclineIcon } from '@/assets/icons';

import { data } from './constants';

interface Props {
  email: string | null;
}

const { title, supportingText, link } = data;

export function DeclineNotification(props: Props) {
  const { email } = props;

  return (
    <div className="flex flex-col items-center pb-8 lg:mt-[-84px] xl:p-0">
      <EmailDeclineIcon className="mb-6" />
      <div className="mb-8 flex flex-col items-center gap-4 text-center">
        <h1 className="text-display-xs font-semibold text-gray-900 2xl:text-display-sm">{title}</h1>
        <p className="font-rubik text-md font-normal text-gray-600">{supportingText.firstText}</p>
        <p className="font-rubik text-md font-normal text-gray-600">{supportingText.lastText}</p>
        {email && <p className="text-md font-bold text-gray-900">{email}</p>}
      </div>
      <div className="flex items-center gap-1">
        <span className="font-rubik text-sm font-normal text-gray-600">{link.firstText}</span>
        <Link href={link.linkHref} className="text-sm font-semibold text-primary-500">
          {link.linkText}
        </Link>
        <span className="font-rubik text-sm font-normal text-gray-600">{link.lastText}</span>
      </div>
    </div>
  );
}

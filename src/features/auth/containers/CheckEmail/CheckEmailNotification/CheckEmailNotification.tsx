import { EmailIcon } from '@/assets/icons';
import { FeaturedIcon } from '@/lib/components';

import { data } from './constants';

interface Props {
  email?: string;
  password?: string;
}

const { title, supportingText } = data;

export function CheckEmailNotification({ email }: Props) {
  return (
    <div className="flex flex-col items-center lg:mb-[248px] lg:mt-[141px]">
      <FeaturedIcon Icon={EmailIcon} color="primary" theme="light-circle-outline" size="xl" />
      <div className="mb-8 mt-6 flex flex-col items-center gap-3 text-center">
        <h1 className="text-display-xs font-semibold text-gray-900 2xl:text-display-sm dark:text-white">{title}</h1>
        <p className="font-rubik text-md font-normal text-gray-600 dark:text-gray-blue-100">{supportingText}</p>
        {email && <p className="text-md font-bold text-gray-900 dark:text-white">{email}</p>}
      </div>
    </div>
  );
}

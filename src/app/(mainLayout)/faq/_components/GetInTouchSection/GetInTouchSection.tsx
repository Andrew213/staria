import { CONTACT_FORM_LINK } from '@/env';
import { Button } from '@/lib/components';
import { routes } from '@/routes';

import { data } from './constants';

const { heading, subheading, buttonText } = data;

export function GetInTouchSection() {
  return (
    <div className="flex flex-col gap-6 rounded-4 border border-gray-200 bg-gray-50 px-5 py-8 lg:flex-row lg:items-start lg:justify-between lg:border-0 lg:p-8">
      <div className="flex flex-col gap-2">
        <p className="text-xl font-semibold text-gray-900">{heading}</p>
        <p className="font-rubik text-md font-normal text-gray-600 lg:text-lg">{subheading}</p>
      </div>
      <Button
        content={buttonText}
        href={`${routes.contact.getRedirectPath()}#${CONTACT_FORM_LINK}`}
        size="xl"
        color="primary"
        className="max-w-[141px]"
        animate
      />
    </div>
  );
}

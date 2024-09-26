import Image from 'next/image';

import { CONTACT_FORM_LINK } from '@/env';
import { Button } from '@/lib/components';
import { routes } from '@/routes';

import { data } from './constants';

const { heading, subheading, supportingText, buttonText, image } = data;

export function PhilosophyContentSection() {
  return (
    <div className="m-auto flex w-full max-w-screen-xl flex-col gap-12 pb-16 pt-8 xl:flex-row xl:gap-10 xl:py-24">
      <div className="px-4 xl:pl-8 xl:pr-0">
        <div className="m-auto flex max-w-screen-md flex-col gap-8 xl:max-w-[604px] xl:gap-10">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-primary-700">{subheading}</p>
            <h2 className="max-w-[300px] text-display-md font-semibold tracking-tight text-gray-900 sm:max-w-full xl:text-display-lg xl:tracking-display-lg">
              {heading}
            </h2>
          </div>
          <div className="flex flex-col gap-6 xl:gap-7">
            {supportingText.map((item, i) => (
              <p key={i + item} className="font-rubik text-md text-gray-600 xl:text-lg">
                {item}
              </p>
            ))}
          </div>
          <div className="flex flex-col xl:flex-row">
            <Button
              size="xl"
              color="primary"
              content={buttonText}
              href={`${routes.contact.getRedirectPath()}#${CONTACT_FORM_LINK}`}
              animate
            />
          </div>
        </div>
      </div>
      <div className="px-4 xl:p-0">
        <div className="m-auto aspect-[343/240] max-w-screen-md overflow-hidden rounded-3 xl:size-full xl:rounded-6">
          <Image
            className="size-full object-cover lg:hidden"
            src={image.mobile}
            width={1029}
            height={720}
            alt={image.alt}
          />
          <Image
            className="hidden size-full object-cover lg:block"
            src={image.desktop}
            width={1208}
            height={1632}
            alt={image.alt}
          />
        </div>
      </div>
    </div>
  );
}

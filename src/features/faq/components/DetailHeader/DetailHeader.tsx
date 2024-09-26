'use client';

import type { FaqTextChild } from '@/types';

import { getContent } from '../../utils';

interface Props {
  heading: string;
  supportingText: FaqTextChild[] | string;
}

export function DetailHeader({ heading, supportingText }: Props) {
  return (
    <div className="py-16">
      <div className="m-auto flex max-w-screen-md flex-col items-center px-4 lg:max-w-screen-xl lg:px-8">
        <div className="z-10 m-auto flex max-w-[904px] flex-col gap-12 text-left lg:h-max lg:self-end lg:text-center xl:gap-20">
          <h1 className="text-display-md font-semibold tracking-display-md text-gray-900 xl:mb-2 xl:text-display-xl xl:tracking-display-xl">
            {heading}
          </h1>

          <p className="rounded-4 bg-gray-100 p-8 text-left font-rubik text-lg text-gray-600 xl:text-lg">
            {getContent(supportingText)}
          </p>
        </div>
      </div>
    </div>
  );
}

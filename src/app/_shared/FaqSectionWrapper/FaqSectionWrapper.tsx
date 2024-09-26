import type React from 'react';

import { data } from './data';

interface Props {
  children: React.ReactNode;
}

export function FaqSectionWrapper(props: Props) {
  return (
    <div className="flex w-full max-w-[832px] flex-col gap-12 px-4 py-16 lg:gap-16 lg:px-8 lg:py-24">
      <div className="flex flex-col gap-4 lg:gap-5">
        <h2 className="text-center text-display-md font-semibold tracking-tight text-gray-900 lg:text-display-md">
          {data.title}
        </h2>
        <p className="hidden text-center font-rubik text-lg text-gray-600 lg:block lg:text-xl">{data.description}</p>
      </div>
      {props.children}
    </div>
  );
}

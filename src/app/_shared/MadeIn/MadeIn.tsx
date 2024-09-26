import Image from 'next/image';
import Link from 'next/link';
import Markdown from 'react-markdown';

import { IMAGES_CDN_URL } from '@/env';

import { data } from './constants';

export function MadeIn() {
  return (
    <div className="w-full max-w-screen-xl px-4 py-6 lg:py-20 lg:pl-8 lg:pr-6">
      <div className="flex flex-col rounded-6 bg-gray-50 pt-8 text-center shadow-section-card-2 lg:flex-row lg:items-center lg:px-16 lg:py-8 lg:text-left">
        <div className="w-[141px] shrink-0">
          <Image src={`${IMAGES_CDN_URL}/so-fit.png`} width={141} height={140} alt={data.title} />
        </div>
        <div className="flex flex-col gap-6 px-6 pb-10 pt-4 lg:gap-4 lg:px-14 lg:py-2">
          <h2 className="text-left text-display-md font-semibold tracking-tight text-gray-900 lg:text-display-md">
            {data.title}
          </h2>
          <div className="text-left font-rubik text-lg text-gray-600">
            <Markdown
              components={{
                a: ({ children, href }) => (
                  <Link className="text-primary-500" href={href ?? ''} target="_blank">
                    {children}
                  </Link>
                ),
              }}
            >
              {data.description}
            </Markdown>
          </div>
        </div>
      </div>
    </div>
  );
}

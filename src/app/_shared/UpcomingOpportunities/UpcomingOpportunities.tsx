import { Suspense } from 'react';
import { twMerge } from 'tailwind-merge';

import { Deals } from './components';
import { TEXTS } from './data';
import type { PropsWithClassName } from '../types';

interface Props extends PropsWithClassName {
  title?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  communityName?: string;
}

export function UpcomingOpportunities({
  className,
  title = TEXTS.title,
  titleClassName,
  subtitleClassName,
  communityName,
}: Props) {
  return (
    <section className={className}>
      <h2
        className={twMerge(
          'mb-5 text-[36px]/[44px] font-semibold tracking-tight text-gray-900 dark:text-white',
          titleClassName,
        )}
      >
        {title}
      </h2>
      <p
        className={twMerge(
          'mb-8 font-rubik text-lg text-gray-600 lg:mb-12 lg:text-xl dark:text-gray-blue-100',
          subtitleClassName,
        )}
      >
        {TEXTS.subtitle}
      </p>
      <Suspense
        fallback={<p className="text-md text-gray-600 lg:text-lg dark:text-gray-blue-100">Deals are being loaded</p>}
      >
        <Deals communityName={communityName} />
      </Suspense>
    </section>
  );
}

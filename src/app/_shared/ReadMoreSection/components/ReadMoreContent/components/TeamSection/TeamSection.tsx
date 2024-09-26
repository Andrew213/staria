'use client';

import cn from 'classnames';
import Image from 'next/image';
import { useState } from 'react';

import type { DealMember } from '@/app/_shared/types';
import { Button } from '@/lib/components';
import { getSocialIcon } from '@/utils';

import { data } from './constants';

interface Props {
  name: string;
  members: DealMember[];
  ticker: string;
}

export function TeamSection({ name, members, ticker }: Props) {
  const [isLoadMore, setIsLoadMore] = useState(false);

  return (
    <div className="px-0 py-6 lg:px-8">
      <h2 id={data.sectionId} className="mb-3 text-md font-medium text-gray-900 dark:text-white">
        {data.title + name + ` (${ticker}) `}
      </h2>
      <p className="mb-10 font-rubik text-md font-normal text-gray-600 dark:text-gray-blue-100">{data.subtitle}</p>
      <ul className="flex flex-wrap gap-x-8 gap-y-12 max-lg:px-4">
        {members
          .toSorted((a, b) => a.order - b.order)
          .map(({ avatarUrl, name, position, id, socials }, index) => {
            return (
              <li
                key={id}
                className={cn(
                  {
                    hidden: index >= data.maxItems && !isLoadMore,
                  },
                  `w-full max-w-[150px] shrink-0 grow-0 flex-col gap-6 max-lg:max-w-[139px]`,
                )}
              >
                <Image
                  width={150}
                  className="h-[200px] w-full rounded-4 bg-[#E0E0E0] object-cover"
                  height={200}
                  src={avatarUrl ?? ''}
                  alt={`photo of ${name}`}
                />
                <div>
                  <p className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{name}</p>
                  <p className="font-rubik text-lg font-normal text-primary-700 dark:text-primary-300">{position}</p>
                </div>
                <div className="flex flex-wrap gap-5">
                  {socials?.map(({ type, url }, index) => {
                    return (
                      <a
                        key={index}
                        className="size-6 text-gray-400 dark:text-gray-blue-200"
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {getSocialIcon(type)}
                      </a>
                    );
                  })}
                </div>
              </li>
            );
          })}
      </ul>
      {members.length > data.maxItems && !isLoadMore && (
        <div className="mt-10 flex items-center gap-2 py-2">
          <div className="h-px w-full bg-gray-200 dark:bg-gray-blue-500" />
          <Button
            className="min-w-[120px]"
            color="secondary-gray"
            size="md"
            content={data.buttonText}
            onClick={() => {
              setIsLoadMore(true);
            }}
          />
          <div className="h-px w-full bg-gray-200 dark:bg-gray-blue-500" />
        </div>
      )}
    </div>
  );
}

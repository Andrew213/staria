'use client';

import { useState } from 'react';
import { twJoin } from 'tailwind-merge';

import { Button } from '@/lib/components';

import { ReadMoreContent } from './components';
import { data } from './constants';
import type { DealMember } from '../types';

interface Props {
  text: string;
  name: string;
  members: DealMember[];
  ticker: string;
}

export function ReadMoreSection({ text, name, members, ticker }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {!isOpen && (
        <div className="flex items-center gap-2 py-2">
          <div className="h-px w-full bg-gray-200 dark:bg-gray-blue-500" />
          <Button
            className="min-w-30 dark:!border dark:border-gray-blue-500 dark:!bg-downriver dark:hover:text-white"
            color="secondary-gray"
            size="md"
            content={data.buttonText}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
          <div className="h-px w-full bg-gray-200 dark:bg-gray-blue-500" />
        </div>
      )}
      <div
        className={twJoin(
          'ease mt-6 transition-all duration-500',
          !isOpen ? 'pointer-events-none max-h-[340px] overflow-hidden opacity-[.2]' : 'max-h-[99999px]',
        )}
      >
        <ReadMoreContent ticker={ticker} text={text} members={members} name={name} />
      </div>
    </div>
  );
}

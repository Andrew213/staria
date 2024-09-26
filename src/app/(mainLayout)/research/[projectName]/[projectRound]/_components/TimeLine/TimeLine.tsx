'use client';

import cn from 'classnames';

import type { DealInvestmentPhase } from '@/app/_shared/types';

import { data } from './constants';
import { TimeLineDropDown } from '../TimeLineDropDown/TimeLineDropDown';
import { Timer } from '../Timer/Timer';

const { items } = data;

interface Props {
  activeStep?: number;
  currentPhase: string;
  phases: DealInvestmentPhase[];
}

export function TimeLine({ activeStep = 0, phases, currentPhase }: Props) {
  return (
    <div className="px-4 py-2 lg:px-8 lg:pb-10 lg:pt-0">
      <TimeLineDropDown noDataText={data.noDataText} items={items} />
      <div className="hidden w-full items-center gap-[78px] rounded-3 border border-gray-300 bg-gray-25 px-8 py-4 lg:flex">
        {items.map((el, index) => {
          const isLastEl = index === items.length - 1;
          return (
            <div
              key={el.id}
              className={cn('flex items-center', {
                'gap-16': !isLastEl,
              })}
            >
              {!isLastEl && (
                <div className="right-0 inline-block size-3 -rotate-45 border-b-2 border-r-2 border-gray-600"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

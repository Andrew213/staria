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
  const phaseData = phases.find((phase) => phase.type === currentPhase);

  return (
    <div className="px-4 py-2 lg:px-8 lg:pb-10 lg:pt-0">
      <TimeLineDropDown noDataText={data.noDataText} items={items} />
      <div className="hidden w-full items-center gap-[78px] rounded-3 border border-gray-300 bg-gray-25 px-8 py-4 lg:flex">
        {items.map((el, index) => {
          const isLastEl = index === items.length - 1;
          const isActiveStep = activeStep === el.id;
          return (
            <div
              key={el.id}
              className={cn('flex items-center', {
                'gap-16': !isLastEl,
              })}
            >
              <div className="flex w-full max-w-[382px] items-center gap-4">
                <div
                  className={cn('rounded-full border border-gray-300 py-2 pl-3.75 pr-3.5 text-lg lg:text-xl', {
                    'border-primary-200 bg-primary-500 text-white': isActiveStep && phaseData?.isActive,
                  })}
                >
                  {el.id}.
                </div>
                <div className="text-gray-600">
                  <p
                    className={cn('text-lg', {
                      'text-gray-800': isActiveStep && phaseData?.isActive,
                    })}
                  >
                    {el.title}
                  </p>

                  {isActiveStep && phaseData?.isActive ? (
                    <div className="block text-xs text-primary-500">{data.openText}</div>
                  ) : (
                    <p className="text-xs">
                      {index > activeStep
                        ? ((phaseData?.startDate && phaseData?.isActive && (
                            <>
                              Starts in: <Timer date={phaseData?.startDate} />
                            </>
                          )) ??
                          data.noDataText)
                        : ((phaseData?.startDate && phaseData?.endDate && phaseData?.isActive && (
                            <>
                              Ended on{' '}
                              {new Date(phaseData.startDate).toLocaleDateString('en-US', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                              })}
                            </>
                          )) ??
                          data.noDataText)}
                    </p>
                  )}
                </div>
              </div>
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

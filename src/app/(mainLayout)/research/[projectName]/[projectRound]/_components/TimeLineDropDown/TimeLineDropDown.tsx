import cn from 'classnames';
import { useState } from 'react';

import { data } from '../TimeLine/constants';

interface itemT {
  id: number;
  title: string;
  date?: string;
  status: number;
}

interface Props {
  activeStep?: itemT;
  noDataText: string;
  items: itemT[];
  time?: Date;
}

export function TimeLineDropDown({ activeStep, noDataText, items }: Props) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setIsDropDownOpen((prev) => !prev);
        }}
        className={cn(
          'mx-auto mb-4 block flex w-full cursor-pointer items-center justify-between self-center rounded-3 border border-gray-300 bg-gray-25 p-4 text-start transition-all duration-500 ease-out lg:hidden',
          {
            hidden: isDropDownOpen,
          },
        )}
      >
        <div className="flex w-full max-w-[282px] items-center gap-4">
          <div
            className={cn('rounded-full border border-gray-300 py-2 pl-3.75 pr-3.5 text-lg lg:text-xl', {
              'border-primary-200 bg-primary-500 text-white': activeStep,
            })}
          >
            {activeStep ? activeStep.id : data.items[0].id}.
          </div>
          <div className="text-gray-600">
            <p
              className={cn('text-lg', {
                'text-gray-800': activeStep,
              })}
            >
              {activeStep ? activeStep.title : data.items[0].title}
            </p>

            {activeStep ? (
              <p className="block text-xs text-primary-500">{data.openText}</p>
            ) : (
              <p className="text-xs">{noDataText}</p>
            )}
          </div>
        </div>

        <div
          className={cn(
            'ease right-0 mb-4 inline-block size-3 -rotate-45 border-b-2 border-r-2 border-gray-600 transition-all duration-200',
          )}
        ></div>
      </button>
      <div
        onClick={() => {
          setIsDropDownOpen(false);
        }}
        className={cn('mb-4 hidden w-full rounded-3 border border-gray-300 bg-gray-25', {
          '!block lg:!hidden': isDropDownOpen,
        })}
      >
        <div className="flex w-full flex-col gap-8 p-4">
          {items.map((el) => {
            const isActiveStep = activeStep?.id === el.id;
            return (
              <div key={el.id} className="flex w-full items-center justify-between">
                <div className="flex w-full items-center gap-4">
                  <div
                    className={cn('rounded-full border border-gray-300 py-2 pl-3.75 pr-3.5 text-lg lg:text-xl', {
                      'border-primary-200 bg-primary-500 text-white': isActiveStep,
                    })}
                  >
                    {el.id}.
                  </div>
                  <div className="text-gray-600">
                    <p
                      className={cn('text-lg', {
                        'text-gray-800': isActiveStep,
                      })}
                    >
                      {el.title}
                    </p>
                    {isActiveStep ? (
                      <p className="block text-xs text-primary-500">{data.openText}</p>
                    ) : (
                      <p className="text-xs">{noDataText}</p>
                    )}
                  </div>
                </div>

                {(isActiveStep || el.id === 1) && (
                  <div className="right-0 inline-block size-3 -rotate-45 border-b-2 border-r-2 border-gray-600"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

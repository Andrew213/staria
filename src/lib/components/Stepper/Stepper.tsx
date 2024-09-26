import cn from 'classnames';
import { Fragment, useState } from 'react';

type Size = 'sm' | 'md';

interface Props {
  activeStep: number;
  items: { title: string; description?: string }[];
  size?: Size;
}

// TODO use this component for research page

export function Stepper({ activeStep, items, size = 'md' }: Props) {
  return (
    <div className="">
      <TimeLineDropDown items={items} activeStep={activeStep} size={size} />
      <div className="hidden w-full items-center justify-between rounded-3 border border-gray-200 bg-gray-25 px-8 py-4 lg:flex lg:py-5">
        {items.map((el, index) => {
          const isLastEl = index === items.length - 1;
          const isActiveStep = activeStep === index + 1;
          return (
            <Fragment key={index}>
              <div className={cn('flex items-center')}>
                <div className="flex items-center gap-4">
                  <div
                    className={cn('flex items-center justify-center rounded-full border border-gray-300', {
                      'border-primary-200 bg-primary-500 text-white': isActiveStep,
                      'size-10 text-lg': size === 'sm',
                      'text-lg lg:text-xl': size === 'md',
                    })}
                  >
                    {index + 1}.
                  </div>
                  <div className="text-gray-600">
                    <p
                      className={cn({
                        'text-gray-800': isActiveStep,
                        'text-lg': size === 'md',
                        'text-md': size === 'sm',
                      })}
                    >
                      {el.title}
                    </p>

                    {el.description && <p className="text-xs">{el.description}</p>}
                  </div>
                </div>
              </div>
              {!isLastEl && (
                <div className="inline-block size-3 shrink-0 -rotate-45 border-b-2 border-r-2 border-gray-600" />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

interface TimeLineDropDownProps {
  activeStep: number;
  items: { title: string; description?: string }[];
  size?: Size;
}

function TimeLineDropDown({ activeStep, items, size = 'md' }: TimeLineDropDownProps) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setIsDropDownOpen((prev) => !prev);
        }}
        className={cn(
          'mx-auto block flex w-full cursor-pointer items-center justify-between self-center rounded-3 border border-gray-300 bg-gray-25 p-4 text-start transition-all duration-500 ease-out lg:hidden',
          {
            hidden: isDropDownOpen,
          },
        )}
      >
        <div className="flex w-full max-w-[282px] items-center gap-4">
          <div
            className={cn('shrink-0 rounded-full border border-gray-300', {
              'border-primary-200 bg-primary-500 text-white': activeStep,
              'flex size-[34px] items-center justify-center text-sm': size === 'sm',
              'py-2 pl-3.75 pr-3.5 text-lg lg:text-xl': size === 'md',
            })}
          >
            {activeStep}.
          </div>
          <div className="text-gray-600">
            <p
              className={cn({
                'text-gray-800': activeStep,
                'text-sm': size === 'sm',
                'text-lg': size === 'md',
              })}
            >
              {items[activeStep - 1].title}
            </p>

            <p className="block text-xs text-primary-500">{items[activeStep - 1].description}</p>
          </div>
        </div>

        <div
          className={cn(
            'ease right-0 inline-block size-3 -rotate-45 border-b-2 border-r-2 border-gray-600 transition-all duration-200',
          )}
        />
      </button>
      <div
        onClick={() => {
          setIsDropDownOpen(false);
        }}
        className={cn('hidden w-full rounded-3 border border-gray-300 bg-gray-25', {
          '!block lg:!hidden': isDropDownOpen,
        })}
      >
        <div className="flex w-full flex-col gap-8 p-4">
          {items.map((el, index) => {
            const isActiveStep = activeStep === index + 1;
            return (
              <div key={el.title} className="flex w-full items-center justify-between">
                <div className="flex w-full items-center gap-4">
                  <div
                    className={cn('rounded-full border border-gray-300', {
                      'border-primary-200 bg-primary-500 text-white': isActiveStep,
                      'flex size-[34px] items-center justify-center text-sm': size === 'sm',
                      'py-2 pl-3.75 pr-3.5 text-lg lg:text-xl': size === 'md',
                    })}
                  >
                    {index + 1}.
                  </div>
                  <div className="text-gray-600">
                    <p
                      className={cn({
                        'text-gray-800': isActiveStep,
                        'text-sm': size === 'sm',
                        'text-lg': size === 'md',
                      })}
                    >
                      {el.title}
                    </p>

                    <p className="block text-xs text-primary-500">{el.description}</p>
                  </div>
                </div>

                {index === 0 && (
                  <div className="right-0 inline-block size-3 -rotate-45 border-b-2 border-r-2 border-gray-600" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

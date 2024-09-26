import { twJoin, twMerge } from 'tailwind-merge';

import type { PropsWithClassName } from '@/app/_shared/types';

import type { Step } from './types';

interface Props extends PropsWithClassName {
  type?: 'featured-icon';
  size?: 'sm' | 'md' | 'lg';
  connector?: boolean;
  steps: Step[];
  currentStepIndex: number;
  stepClassName?: string;
  connectorClassName?: string;
  stepTitleClassName?: string;
  completeStepClassName?: string;
  completeStepIconWrapperClassName?: string;
  completeStepIconClassName?: string;
  completeStepConnectorClassName?: string;
  completeStepTitleClassName?: string;
  currentStepIconClassName?: string;
  incompleteStepIconWrapperClassName?: string;
  incompleteStepIconClassName?: string;
  incompleteStepConnectorClassName?: string;
  incompleteStepTitleClassName?: string;
}

export default function ProgressSteps({
  className,
  type = 'featured-icon',
  size = 'md',
  connector = true,
  steps,
  currentStepIndex,
  stepClassName,
  connectorClassName,
  stepTitleClassName,
  completeStepClassName,
  completeStepIconWrapperClassName,
  completeStepIconClassName,
  completeStepConnectorClassName,
  completeStepTitleClassName,
  currentStepIconClassName,
  incompleteStepIconWrapperClassName,
  incompleteStepIconClassName,
  incompleteStepConnectorClassName,
  incompleteStepTitleClassName,
}: Props) {
  return (
    <ul className={className}>
      {steps.map(({ id, Icon, title, description }, index, array) => {
        const status = index < currentStepIndex ? 'complete' : index === currentStepIndex ? 'current' : 'incomplete';

        return (
          <li
            className={twMerge(
              type === 'featured-icon' && 'grid grid-cols-[48px_1fr] pb-1',
              type === 'featured-icon' && (size === 'sm' ? 'min-h-17 gap-x-3' : 'min-h-19.5 gap-x-4'),
              type === 'featured-icon' && status !== 'current' && 'opacity-60',
              stepClassName,
              type === 'featured-icon' && status === 'complete' && completeStepClassName,
            )}
            key={id}
          >
            <div className={twJoin(type === 'featured-icon' && 'flex flex-col items-center gap-y-1')}>
              <div
                className={twMerge(
                  type === 'featured-icon' &&
                    'flex size-12 items-center justify-center rounded-2.5 border border-gray-200 bg-white shadow-xs dark:border-primary-300 dark:bg-downriver',
                  type === 'featured-icon' && status === 'incomplete' && incompleteStepIconWrapperClassName,
                  type === 'featured-icon' && status === 'complete' && completeStepIconWrapperClassName,
                )}
              >
                <Icon
                  className={twMerge(
                    type === 'featured-icon' && 'text-gray-700 dark:text-primary-300',
                    type === 'featured-icon' && status === 'incomplete' && incompleteStepIconClassName,
                    type === 'featured-icon' && status === 'current' && currentStepIconClassName,
                    type === 'featured-icon' && status === 'complete' && completeStepIconClassName,
                  )}
                />
              </div>
              {connector && index < array.length - 1 && (
                <div
                  className={twMerge(
                    type === 'featured-icon' && 'w-0.5 grow rounded-0.5 bg-gray-200 dark:bg-gray-blue-500',
                    connectorClassName,
                    type === 'featured-icon' && status === 'incomplete' && incompleteStepConnectorClassName,
                    type === 'featured-icon' && status === 'complete' && completeStepConnectorClassName,
                  )}
                />
              )}
            </div>
            <div>
              <p
                className={twMerge(
                  type === 'featured-icon' && 'font-semibold text-gray-700 dark:text-white',
                  type === 'featured-icon' && (size === 'sm' ? 'pt-1 text-sm' : 'text-md'),
                  stepTitleClassName,
                  type === 'featured-icon' && status === 'incomplete' && incompleteStepTitleClassName,
                  type === 'featured-icon' && status === 'complete' && completeStepTitleClassName,
                )}
              >
                {title}
              </p>
              {description && (
                <p
                  className={twJoin(
                    'whitespace-pre',
                    type === 'featured-icon' && 'font-rubik text-sm text-gray-600 dark:text-gray-blue-100',
                    type === 'featured-icon' && size !== 'sm' && 'mt-0.5',
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

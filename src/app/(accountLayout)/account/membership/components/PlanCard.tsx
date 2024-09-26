import cn from 'classnames';
import Link from 'next/link';

import { CheckIcon } from '@/assets/icons';
import { Badge, Button, DiscountSticker } from '@/lib/components';
import { routes } from '@/routes';
import type { Plan } from '@/types';

import { data } from '../constants';

interface Props {
  title: string;
  offersCount?: number;
  icon: React.ReactNode;
  price: number;
  description: string;
  link: string;
  isActive?: boolean;
  activePlan: Plan | undefined;
  isChecked?: boolean;
  id: Plan;
  onClick: (id: Plan) => void;
  onUpgradeClick: (id: Plan) => void;
  showDiscountSticker?: boolean;
}

export function PlanCard({
  id,
  title,
  icon,
  price,
  description,
  isActive,
  isChecked,
  activePlan,
  offersCount,
  onClick,
  onUpgradeClick,
  showDiscountSticker,
}: Props) {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn('overflow-hidden rounded-3 bg-white', {
        'border border-gray-200': !isChecked,
        'border border-primary-600 shadow-1 shadow-primary-600': isChecked,
      })}
    >
      <div
        className={cn('flex items-center justify-between py-2 pl-2 pr-5', {
          'border-b border-gray-200': !isChecked,
          'border-b border-primary-600 bg-primary-50 shadow-1 shadow-primary-600': isChecked,
        })}
      >
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-full border-4 border-primary-50 bg-primary-100 lg:size-11.5 lg:border-[6px]">
            <div className="size-4 text-primary-600 lg:size-5">{icon}</div>
          </div>
          <h2
            className={cn('text-lg font-semibold text-gray-700', {
              'text-gray-700': !isChecked,
              'text-primary-800': isChecked,
            })}
          >
            {isActive ? `You are ${title.toUpperCase()}` : title.toUpperCase()}
          </h2>
        </div>
        {isActive && (
          <div className="rounded-full bg-primary-600 p-0.5">
            <CheckIcon className="size-3 lg:size-4 [&_path]:stroke-white" />
          </div>
        )}
      </div>
      <div className="flex flex-col-reverse items-start justify-between gap-1 p-4 lg:flex-row">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="mt-3 flex items-end gap-1 lg:mt-0">
              <p className="text-display-sm font-semibold tracking-tight text-gray-700 lg:text-display-md">${price}</p>
              <div className="mb-1 lg:-mt-1 lg:mb-0">
                <div className="hidden font-rubik text-md text-gray-500 line-through lg:block">{data.perYear}</div>
                <p className="text-nowrap text-sm font-semibold text-gray-600 max-lg:font-rubik lg:lg:text-lg lg:text-gray-700">
                  {data.forLife}
                </p>
              </div>
              {showDiscountSticker && (
                <div className="ml-2 mt-0.5 self-center lg:mb-[3px] lg:ml-1.5 lg:mt-0">
                  <DiscountSticker variant="pill" />
                </div>
              )}
            </div>
            <p className="font-rubik text-sm text-gray-600 lg:text-md">
              {description}{' '}
              {(!isActive || id === 'basic') && (
                <Link
                  className="relative ml-0.5 inline whitespace-nowrap text-primary-500 after:absolute after:inset-x-0 after:bottom-0.5 after:border-b after:border-primary-500 after:content-['']"
                  href={routes.pricing.getRedirectPath()}
                >
                  {data.linkText}
                </Link>
              )}
            </p>
          </div>
          {activePlan !== 'genesis-plus' && (
            <>
              {!isActive && id !== 'basic' && (
                <div className="self-start">
                  <Button
                    onClick={() => onUpgradeClick?.(id)}
                    size="lg"
                    color="primary"
                    content={data.upgradeButtonText}
                  />
                </div>
              )}
            </>
          )}

          {isActive && id !== 'basic' && (
            <Link className="text-md font-semibold text-primary-500" href={routes.pricing.getRedirectPath()}>
              See All Benefits
            </Link>
          )}
        </div>

        <div className="shrink-0">
          {isActive ? (
            <div className="hidden lg:block">
              <Badge
                size="md"
                color="gray-transparent"
                variant="square"
                dot="success"
                content={`${data.activeBadge} ${title.toUpperCase()}`}
              />
            </div>
          ) : (
            <div className="mb-3 lg:mb-0">
              <Badge size="md" color="primary" content={`${offersCount} ${data.offers}`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

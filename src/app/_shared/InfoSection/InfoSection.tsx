import cn from 'classnames';
import { useMemo } from 'react';

import { isNumber } from '@/utils';

import { data } from './constants';
import type { Deal } from '../types';

interface Props {
  project: Deal;
}

export function InfoSection({ project }: Props) {
  const items = useMemo(
    () => [
      {
        title: 'Network',
        description: project.network,
      },
      {
        title: 'Total supply',
        description: isNumber(project.totalSupply)
          ? `${Number(project.totalSupply).toLocaleString('en-US', { minimumFractionDigits: 0 })}`
          : project.totalSupply,
      },
      {
        title: 'FDV',
        description: isNumber(project.dilutedValuation)
          ? `${Number(project.dilutedValuation).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}`
          : project.dilutedValuation.toString(),
      },
      {
        title: 'Token Price',
        description: isNumber(project.tokenPrice)
          ? `${Number(project.tokenPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}`
          : project.tokenPrice.toString(),
      },
      {
        title: 'Platform Raise',
        description: isNumber(project.platformRaise)
          ? `${Number(project.platformRaise).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}`
          : project.platformRaise.toString(),
      },
      {
        title: 'Initial Market Cap',
        description: isNumber(project.marketCap)
          ? `${Number(project.marketCap).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}`
          : project.marketCap.toString(),
      },
      {
        title: 'Listing date',
        description: project.listingDate,
      },
      {
        title: 'Unlock Terms',
        description: project.unlockTerms,
      },
    ],
    [project],
  );

  return (
    <div className="py-2 lg:py-10">
      <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
        {items.map((el, index) => {
          const isLastEl = index === data.items.length - 1;
          return (
            <div
              key={index}
              className={cn(
                'rounded-2 border border-gray-300 px-4 py-3 shadow-featured-icons dark:border-gray-blue-500 dark:bg-downriver',
                {
                  'lg:col-span-2': isLastEl,
                },
              )}
            >
              <p className="text-sm text-gray-600 dark:text-gray-blue-100">{el.title}</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-blue-25">{el.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

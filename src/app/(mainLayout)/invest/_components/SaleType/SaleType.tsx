import cn from 'classnames';

import type { DealRound } from '@/app/_shared/types';

import { data } from './constants';

interface Props {
  saleType: DealRound;
  rootBg?: 'light' | 'dark';
}

const typeColors: Record<DealRound, string> = {
  seed: 'bg-[#6172f3]',
  public: 'bg-[#d444f1]',
  private: 'bg-[#6172f3]',
};

const saleTypeNames: Record<DealRound, string> = {
  seed: 'Seed Round',
  public: 'Public Round',
  private: 'Private Round',
};

export function SaleType({ saleType, rootBg }: Props) {
  return (
    <div
      className={cn('flex gap-[5px] rounded-1.5 border border-gray-300 py-1 pl-2 pr-1', {
        'bg-blue-zodiac text-white dark:border-gray-blue-300 dark:bg-downriver': rootBg === 'dark',
        'bg-gray-50 text-gray-600': rootBg === 'light',
      })}
    >
      <div className="flex items-center gap-[5px]">
        <div className={cn('size-1.5 rounded-full', typeColors[saleType])}></div>
        <p
          className={cn('text-md', {
            'text-white dark:text-gray-blue-100': rootBg === 'dark',
            'text-gray-600': rootBg === 'light',
          })}
        >
          {data.title}
        </p>
      </div>
      <div className={cn('rounded-0.75 px-1.5 text-md font-semibold text-white', typeColors[saleType])}>
        {saleTypeNames[saleType]}
      </div>
    </div>
  );
}

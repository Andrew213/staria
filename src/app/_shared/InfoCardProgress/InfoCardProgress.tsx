import cn from 'classnames';

import { toAmountInUSD } from '@/utils/amount';

import { data } from './constants';
interface Props {
  invested: number;
  total: number;
}

const limit = 60;

export function InfoCardProgress({ invested, total }: Props) {
  const progress = (invested / total) * 100;
  return (
    <div className="lg:pt-2">
      <div className="flex justify-between pb-2">
        <p className="text-lg font-medium text-gray-900 dark:text-white">{data.totalInvested}</p>
        <p className="text-lg font-medium text-gray-900 dark:text-white">{toAmountInUSD(invested)}</p>
      </div>

      <div className="relative h-2 grow rounded bg-gray-200">
        <div
          className={cn('h-2 max-w-full rounded', {
            'bg-success-500': progress < limit,
            'bg-warning-500': progress >= limit,
            '!bg-error-500': progress >= 100,
          })}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

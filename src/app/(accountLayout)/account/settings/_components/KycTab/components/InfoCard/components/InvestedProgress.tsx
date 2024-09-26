import cn from 'classnames';

import { infoCardData } from '@/app/(accountLayout)/account/settings/constants';
import { toAmountInUSD } from '@/utils/amount';

interface Props {
  invested: number;
  total: number;
}

const limit = 60;

export function InvestedProgress({ invested, total }: Props) {
  const progress = (invested / total) * 100;

  return (
    <div className="pt-2">
      <div className="flex justify-between pb-2">
        <p className="text-lg font-medium text-gray-900">{infoCardData.totalInvested}</p>
        <p className="text-lg font-medium text-gray-900">{toAmountInUSD(invested)}</p>
      </div>

      <div className="relative h-2 grow rounded-2 bg-gray-200">
        <div
          style={{ width: `${progress}%` }}
          className={cn('absolute left-0 top-0 h-2 rounded-2', {
            'bg-success-500': progress < limit,
            'bg-warning-500': progress >= limit && progress !== 100,
            'bg-error-500': progress === 100,
          })}
        ></div>
      </div>
    </div>
  );
}

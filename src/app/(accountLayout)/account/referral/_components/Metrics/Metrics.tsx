import cn from 'classnames';

import { InformationIcon } from '@/assets/icons';
import { QuestionMarkTooltip } from '@/lib/components';
import { useAppSelector } from '@/redux/hooks';

import { data } from './constants';

export function Metrics() {
  const user = useAppSelector((store) => store.user);
  return (
    <div>
      <h3 className="mb-5 text-display-xs font-semibold text-gray-900 lg:mb-8">{data.title}</h3>
      <div className="grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-3">
        {data.items.map(({ title, metric, count, tooltipText }, i) => {
          const isLastEl = data.items.length - 1 === i;
          const isFriendsCard = title.toLocaleUpperCase() === 'FRIENDS';
          return (
            <div
              key={i}
              className={cn('flex flex-col gap-6 rounded-3 border border-gray-200 p-6', {
                'lg:col-span-3': isLastEl,
              })}
            >
              <div className="flex items-center justify-between gap-4 lg:justify-normal">
                <p className="text-md font-semibold text-gray-900">{title}</p>
                <QuestionMarkTooltip
                  icon={
                    <div>
                      <InformationIcon />
                    </div>
                  }
                  id={`${i}`}
                  color="secondary"
                  position="bottom"
                  text={tooltipText}
                />
              </div>
              <div className="flex items-center">
                <span className="mr-0.5 text-display-md font-semibold">{isFriendsCard ? user.refferals : count}</span>
                <span className="text-xs font-normal">{metric.toUpperCase()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

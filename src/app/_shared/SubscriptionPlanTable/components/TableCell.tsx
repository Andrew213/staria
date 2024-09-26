import cn from 'classnames';

import { CheckboxIcon, CrossRoundedIcon } from '@/assets/icons';

export function TableCell({
  data,
  index,
  isLastRow,
  isFirstCell,
  isLastCell,
}: {
  data: string | boolean;
  index: number;
  isLastRow?: boolean;
  isFirstCell?: boolean;
  isLastCell?: boolean;
}) {
  return (
    <td>
      <div
        className={cn('flex h-full flex-col items-end border-gray-200 py-5 pr-8 xl:items-center xl:border-l xl:px-6', {
          'bg-gray-50 xl:border-y xl:border-gray-200': index % 2 === 0,
          'xl:border-r': isLastCell,
          'xl:border-b xl:border-gray-200': isLastRow,
          'rounded-bl-2': isLastRow && isFirstCell,
          'rounded-br-2': isLastRow && isLastCell,
        })}
      >
        {typeof data === 'string' ? data : data ? <CheckboxIcon /> : <CrossRoundedIcon />}
      </div>
    </td>
  );
}

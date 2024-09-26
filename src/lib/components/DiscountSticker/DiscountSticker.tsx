import cn from 'classnames';

import { data } from './constants';

interface Props {
  variant?: 'rounded' | 'pill';
  size?: 'md' | 'xs';
}

export function DiscountSticker({ variant = 'rounded', size = 'md' }: Props) {
  return (
    <div
      className={cn(
        'flex items-center justify-center bg-[linear-gradient(135deg,#B01EFF_0%,#E1467C_100%)] normal-case text-white',
        {
          'size-[82px] rounded-full text-xs max-lg:font-rubik lg:size-[102px] lg:text-md lg:font-bold':
            variant === 'rounded',
          'text-nowrap rounded-6 font-bold': variant === 'pill',
          'px-[11px] py-2 text-xs-2': variant === 'pill' && size === 'md',
          'px-2 py-1.5 text-xs-0 lg:text-xs-1': variant === 'pill' && size === 'xs',
        },
      )}
    >
      {data.title}
    </div>
  );
}

import cn from 'classnames';
import type React from 'react';

import type { Size as AvatarSize } from '../Avatar/Avatar';
import { Avatar } from '../Avatar/Avatar';

type Size = 'md' | 'xl';

interface Props {
  image: string;
  name: string;
  text: React.ReactNode;
  size: Size;
}

const avatarSizes: Record<Size, AvatarSize> = {
  xl: 'lg',
  md: 'md',
};

export function AvatarGroup({ name, image, text, size }: Props) {
  return (
    <div
      className={cn('flex', {
        'gap-3 lg:gap-4': size === 'xl',
        'gap-3': size === 'md',
      })}
    >
      <Avatar size={avatarSizes[size]} image={image} alt={name} />
      <div>
        <p
          className={cn('font-semibold text-gray-900 lg:font-rubik lg:font-normal', {
            'text-md lg:text-lg': size === 'xl',
            'text-sm': size === 'md',
          })}
        >
          {name}
        </p>
        <p
          className={cn('font-rubik text-gray-600', {
            'text-md': size === 'xl',
            'text-sm': size === 'md',
          })}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

import cn from 'classnames';
import Image from 'next/image';

import { AvatarIcon, VerifiedTick } from '@/assets/icons';

type Size = 'md' | 'sm';

interface Props {
  size: Size;
  image?: string | null;
  alt?: string;
  verified?: boolean;
  showVerificationIcon?: boolean;
}

export function AvatarProfilePhoto({ size, image, alt, verified, showVerificationIcon = true }: Props) {
  return (
    <div className="relative inline-block">
      <div className="rounded-full p-0.75 shadow-md">
        <div
          className={cn(
            'relative flex items-center justify-center overflow-hidden rounded-full border-[2.333px] border-[#e0e3e7] p-0.75 dark:border-gray-blue-100',
            {
              'bg-gray-100 dark:bg-downriver': !image,
              'size-15 lg:size-19': size === 'md',
              'size-14': size === 'sm',
            },
          )}
        >
          {!image && (
            <div
              className={cn({
                'size-6 lg:size-7': size === 'md',
                'size-6': size === 'sm',
              })}
            >
              <AvatarIcon className="text-gray-600 dark:text-gray-blue-100" />
            </div>
          )}
          {image && <Image className="object-cover" src={image} alt={alt ?? ''} fill />}
        </div>
      </div>
      {verified && showVerificationIcon && (
        <div className="absolute bottom-0 right-0 size-5 text-primary-300">
          <VerifiedTick />
        </div>
      )}
    </div>
  );
}

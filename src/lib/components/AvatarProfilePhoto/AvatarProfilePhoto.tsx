import cn from 'classnames';
import Image from 'next/image';

import { AvatarIcon, VerifiedTick } from '@/assets/icons';

export type Size = 'sm';

interface Props {
  size: Size;
  image?: string | null;
  alt?: string;
  verified?: boolean;
}

export function AvatarProfilePhoto(props: Props) {
  const { size, image, alt, verified } = props;

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          'relative flex items-center justify-center overflow-hidden rounded-full border-[3px] border-white shadow-md',
          {
            'bg-gray-100': !image,
            'size-15 lg:size-19': size === 'sm',
          },
        )}
      >
        {!image && (
          <div className="size-6 lg:size-7">
            <AvatarIcon />
          </div>
        )}
        {image && <Image src={image} alt={alt ?? ''} fill style={{ objectFit: 'cover' }} />}
      </div>
      {verified && (
        <div className="absolute bottom-0 right-0 size-5 text-primary-300">
          <VerifiedTick />
        </div>
      )}
    </div>
  );
}

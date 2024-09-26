import cn from 'classnames';
import Image from 'next/image';

import { AvatarIcon } from '@/assets/icons';

export type Size = 'md' | 'lg';

interface Props {
  size: Size;
  image?: string;
  alt?: string;
}

export function Avatar(props: Props) {
  const { size, image, alt } = props;

  return (
    <div
      className={cn('relative flex items-center justify-center overflow-hidden rounded-full', {
        'border border-gray-900/[.08] bg-gray-100': !image,
        'size-12 lg:size-14': size === 'lg',
        'size-10': size === 'md',
      })}
    >
      {!image && <AvatarIcon className="text-gray-600" />}
      {image && <Image className="object-cover" src={image} alt={alt ?? ''} fill />}
    </div>
  );
}

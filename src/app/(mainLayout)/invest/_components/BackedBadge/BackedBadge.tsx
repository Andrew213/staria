import cn from 'classnames';
import Image from 'next/image';

interface Props {
  title: string;
  items: { name: string; iconUrl: string; url: string }[];
  variant?: 'small' | 'medium';
}

export function BackedBadge({ title, items, variant = 'medium' }: Props) {
  return (
    <div
      className={cn('rounded-2 border border-gray-500 bg-blue-zodiac px-4 py-2 dark:border-gray-blue-500', {
        'lg:rounded-4 lg:px-6 lg:py-3': variant === 'medium',
      })}
    >
      <div className="flex flex-col gap-2">
        <p
          className={cn('text-center font-rubik text-xs text-gray-100', {
            'lg:text-sm': variant === 'medium',
          })}
        >
          {title}:
        </p>
        <div
          className={cn('flex gap-x-3', {
            'lg:gap-x-8': variant === 'medium',
          })}
        >
          {items.map((badge) => (
            <div key={badge.name}>
              <div className="relative mx-auto mb-1 size-6">
                <Image className="object-contain" src={badge.iconUrl} alt={`${badge.name}'s logo`} fill sizes="24px" />
              </div>
              <p className="text-xs font-semibold text-white">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

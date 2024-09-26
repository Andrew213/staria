import { twMerge } from 'tailwind-merge';

import type { PropsWithClassName } from '@/app/_shared/types';

interface Props extends PropsWithClassName {
  theme?: 'light-circle' | 'light-circle-outline' | 'modern';
  color?: 'primary' | 'gray' | 'error' | 'warning' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  Icon: React.FC<React.SVGProps<SVGElement>>;
  iconClassName?: string;
}

export default function FeaturedIcon({
  theme = 'light-circle',
  color = 'primary',
  size = 'md',
  Icon,
  className,
  iconClassName,
}: Props) {
  return (
    <div
      className={twMerge(
        'inline-block',

        theme === 'light-circle-outline' && 'rounded-full',
        theme === 'light-circle-outline' &&
          color === 'primary' &&
          'border-primary-50 bg-primary-100 dark:border-blue-light-200 dark:bg-blue-light-400',
        theme === 'light-circle-outline' &&
          color === 'error' &&
          'border-error-50 bg-error-100 dark:border-error-200 dark:bg-error-600',
        theme === 'light-circle-outline' &&
          color === 'success' &&
          'border-success-50 bg-success-100 dark:border-success-200 dark:bg-success-500',
        theme === 'light-circle-outline' && size === 'sm' && 'border-4 p-1.5',
        theme === 'light-circle-outline' && size === 'md' && 'border-6 p-1.75',
        theme === 'light-circle-outline' && size === 'lg' && 'border-8 p-2',
        theme === 'light-circle-outline' && size === 'xl' && 'border-10 p-2.25',

        theme === 'modern' &&
          color === 'primary' &&
          'border border-gray-200 bg-white shadow-xs dark:border-primary-200 dark:bg-primary-500',
        theme === 'modern' && size === 'sm' && 'rounded-1.5 p-1.75',
        theme === 'modern' && size === 'md' && 'rounded-2 p-2.25',
        theme === 'modern' && size === 'lg' && 'rounded-2.5 p-2.75',
        theme === 'modern' && size === 'xl' && 'rounded-3 p-3.25',

        className,
      )}
    >
      <Icon
        className={twMerge(
          size === 'sm' && 'size-4',
          size === 'md' && 'size-5',
          size === 'lg' && 'size-6',
          size === 'xl' && 'size-7',

          theme === 'light-circle-outline' && color === 'primary' && 'text-primary-600 dark:text-white',
          theme === 'light-circle-outline' && color === 'error' && 'text-error-600 dark:text-error-25',
          theme === 'light-circle-outline' && color === 'success' && 'text-success-600 dark:text-success-25',

          theme === 'modern' && color === 'primary' && 'text-gray-700 dark:text-white',

          iconClassName,
        )}
      />
    </div>
  );
}

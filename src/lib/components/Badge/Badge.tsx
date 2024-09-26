import cn from 'classnames';
import type React from 'react';

type Size = 'xs' | 'sm' | 'md' | 'lg';
type Dot = 'success' | 'error' | 'blue-gray';
type Variant = 'rounded' | 'square';
export type Color =
  | 'success'
  | 'error'
  | 'orange'
  | 'blue-light'
  | 'blue'
  | 'warning'
  | 'primary'
  | 'gray'
  | 'light-gray'
  | 'gray-transparent'
  | 'gray-blue';

interface Props {
  content: React.ReactNode;
  size: Size;
  color: Color;
  variant?: Variant;
  dot?: Dot;
  icon?: React.ReactNode;
}

export function Badge(props: Props) {
  const { content, size, color, variant = 'rounded', dot, icon } = props;

  return (
    <div
      className={cn(
        'flex items-center border',
        {
          'rounded-4': variant === 'rounded',
          'rounded-1.5': variant === 'square',
          'border-[#f9dBaf] bg-[#fef6ee] text-[#b93815]': color === 'orange',
          'border-warning-200 bg-warning-50 text-warning-700 dark:bg-warning-500 dark:text-warning-25':
            color === 'warning',
          'border-blue-light-200 bg-[#f0f9ff] text-[#026aa2]': color === 'blue',
          'border-blue-light-200 bg-[#f0f9ff] text-[#0086c9] dark:bg-blue-light-500 dark:text-blue-light-25':
            color === 'blue-light',
          'border-primary-200 bg-primary-50 text-primary-700': color === 'primary',
          'border-success-200 bg-success-50 text-success-700 dark:bg-success-500 dark:text-success-25':
            color === 'success',
          'border-error-200 bg-error-50 text-error-700 dark:bg-error-500 dark:text-error-25': color === 'error',
          'border-gray-blue-200 bg-gray-blue-50 text-gray-blue-700': color === 'gray-blue',
          'border-white bg-gray-800 text-white': color === 'gray',
          'border-gary-200 bg-gray-50 text-gray-700': color === 'light-gray',
          'border-gray-300 text-gray-700 dark:border-gray-blue-300 dark:bg-blue-zodiac dark:text-gray-blue-50':
            color === 'gray-transparent',
        },
        {
          'px-[10px] py-0.5 text-sm': size === 'xs',
          'px-1.5 py-0.5 text-xs': size === 'sm',
          'pl-1': size === 'sm' && !!icon,
          'gap-1.5 px-2.5 py-0.5 text-sm': size === 'md',
          'px-3 py-1 text-sm font-medium': size === 'lg',
        },
      )}
    >
      {dot && (
        <div
          className={cn('mr-1.5 size-1.5 rounded-full', {
            'bg-success-500': dot === 'success',
            'bg-gray-blue-500': dot === 'blue-gray',
            'bg-error-500': dot === 'error',
          })}
        />
      )}
      {icon && <div className="mr-1 size-3">{icon}</div>}
      {content}
    </div>
  );
}

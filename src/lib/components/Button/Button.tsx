import Link from 'next/link';
import type React from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

import NoSsr from '@/core/NoSsr/NoSsr';

type Size = 'xs' | 'sm' | 'md' | 'md-square' | 'lg' | 'xl' | '2xl';
// TODO replace dark color with UI-kit color, when kit will be ready
export type Color = 'primary' | 'secondary' | 'transparent' | 'secondary-gray' | 'dark';

type Props<T extends string> = {
  content?: React.ReactNode;
  size: Size;
  color: Color;
  href?: string;
  blank?: boolean;
  loading?: boolean;
  title?: string;
  icon?: React.ReactNode;
  onClick?: (ev: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
  animate?: boolean;
  fullWidth?: boolean;
} & AdditionalTagProps<T>;

type AdditionalTagProps<T> = T extends typeof defaultTag
  ? React.DetailedHTMLProps<Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'content'>, HTMLButtonElement>
  : { href: string };

const defaultTag = 'button';

function ButtonComponent<T extends string = typeof defaultTag>(props: Props<T>) {
  const { content, size, color, href, blank, title, icon, animate, fullWidth, className, loading, ...buttonProps } =
    props;

  const Component = href ? Link : defaultTag;

  return (
    <Component
      href={href!}
      target={blank ? '_blank' : undefined}
      rel={blank ? 'noreferrer' : undefined}
      title={title}
      className={twMerge(
        'inline-flex items-center justify-center rounded-2 border transition-all duration-200 ease-linear',
        loading && 'pointer-events-none',
        size === 'md' && 'gap-2 px-4 py-2.5 text-sm font-semibold',
        size === 'md-square' && 'gap-2 px-[9px] py-[9px] text-sm font-semibold',
        size === 'lg' && 'gap-2 px-4.5 py-2.5 text-md font-semibold',
        size === 'xl' && 'gap-2 px-5 py-3 text-md font-semibold *:first:h-5 *:first:w-5',
        size === '2xl' && 'gap-3 px-7 py-4 text-lg font-semibold *:first:h-6 *:first:w-6',
        color === 'primary' &&
          'border-gray-950 bg-gray-950 text-white shadow-btn-primary focus:shadow-btn-primary-focus disabled:border-gray-300 disabled:bg-gray-300 light:hover:border-primary-500 light:hover:bg-primary-500 light:focus:border-primary-600 light:focus:bg-primary-600 dark:border-primary-200 dark:bg-primary-500 dark:disabled:border-gray-blue-50 dark:disabled:bg-gray-blue-200 dark:disabled:text-gray-blue-400',
        color === 'secondary' &&
          'border-primary-200 bg-primary-500 text-white shadow-btn-secondary hover:border-primary-200 hover:bg-primary-600 focus:border-primary-200 focus:bg-primary-600 focus:shadow-btn-secondary-focus disabled:border-gray-200 disabled:bg-gray-200',
        color === 'transparent' &&
          'border-transparent bg-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-700 focus:bg-transparent focus:text-gray-700 disabled:text-gray-300 disabled:hover:bg-transparent dark:border dark:border-gray-blue-300',
        color === 'secondary-gray' &&
          'border-gray-300 bg-white text-gray-700 shadow-btn-primary focus:shadow-btn-secondary-gray-focus disabled:border-gray-300 disabled:bg-gray-300 light:hover:bg-gray-50 light:hover:text-gray-800 light:focus:bg-white light:disabled:text-white dark:bg-downriver dark:text-white dark:disabled:border-gray-blue-50 dark:disabled:bg-gray-blue-200 dark:disabled:text-gray-blue-400',
        animate && 'transition duration-300 ease-in-out hover:-translate-y-2 hover:scale-100 active:animate-ping',
        fullWidth && 'w-full',
        className,
      )}
      {...buttonProps}
    >
      {icon}
      {loading ? <Spiner size={size} /> : content}
    </Component>
  );
}

function Spiner({ size }: { size: Size }) {
  return (
    <div
      className={twJoin(
        'border-current inline-block animate-spin rounded-full border-4 border-solid border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
        (size === 'md' || size === 'md-square') && 'size-5',
        size === 'lg' && 'size-6',
        size === 'xl' && 'size-7',
        size === '2xl' && 'size-8',
      )}
      role="status"
    >
      <span className="!absolute !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}

export function Button<T extends string = typeof defaultTag>(props: Props<T>) {
  return (
    <NoSsr>
      <ButtonComponent {...(props as Props<'button'>)} />
    </NoSsr>
  );
}

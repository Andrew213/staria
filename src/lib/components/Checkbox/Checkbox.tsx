import cn from 'classnames';
import type React from 'react';

type Size = 'sm' | 'md';
type Variant = 'rounded' | 'square';

interface Props {
  inputProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  error?: string | null;
  className?: string | null;
  size?: Size;
  variant?: Variant;
}

export function Checkbox(props: Props) {
  const { inputProps, error, className, size = 'sm', variant = 'square' } = props;

  return (
    <label className="flex items-center justify-center py-2.5">
      <input
        type="checkbox"
        className={cn(
          className,
          error
            ? 'border-error-300 hover:border-error-300 hover:shadow-xs-focused-error focus:shadow-xs-focused-error'
            : 'hover:border-primary-300 focus:border-primary-300 focus:shadow-xs-focused-primary dark:hover:bg-downriver',
          'rounded border border-gray-800 before:absolute before:left-[50%] before:top-[50%] before:block before:translate-x-[-50%] before:translate-y-[-50%] checked:before:bg-cover checked:before:bg-center checked:before:bg-no-repeat checked:hover:border-primary-300 disabled:border-gray-300 disabled:bg-gray-100 dark:border-gray-blue-200 dark:bg-downriver dark:checked:border-primary-50 dark:checked:bg-primary-500 dark:checked:hover:border-primary-50 dark:checked:hover:bg-primary-500',

          {
            'size-4 before:size-2': size === 'sm',
            'size-5 before:size-2.5': size === 'md',
            'checked:before:bg-checkbox hover:bg-primary-50 dark:checked:before:bg-checkbox-white':
              variant !== 'rounded',
            'rounded-full before:text-white checked:bg-primary-600 checked:before:bg-checkbox-white':
              variant === 'rounded',
          },
        )}
        {...inputProps}
      />
    </label>
  );
}

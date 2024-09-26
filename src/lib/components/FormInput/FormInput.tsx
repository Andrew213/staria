import { useId, useState } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';

import { EyeIcon, EyeOffIcon, AlertIcon } from '@/assets/icons';

import { FieldError } from '../FieldError/FieldError';

interface Props {
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  label?: string;
  hintText?: string;
  error?: string;
  type?: 'email' | 'text' | 'password';
  containerClass?: string;
  prefix?: string;
  PrefixIcon?: React.FC<React.SVGProps<SVGElement>>;
}

const PREFIX_MAX_LENGTH_FOR_VERTICAL = 18;

export function FormInput({
  label,
  hintText,
  error,
  PrefixIcon,
  inputProps,
  type = 'text',
  containerClass,
  prefix,
}: Props) {
  const inputId = useId();
  const [isShowPassword, setIsShowPassword] = useState(false);
  let longPrefix = false;
  if (prefix) {
    longPrefix = prefix?.length > PREFIX_MAX_LENGTH_FOR_VERTICAL;
  }
  return (
    <div className={twMerge('flex flex-col gap-1.5', containerClass)}>
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-blue-50" htmlFor={inputId}>
          {label}
        </label>
      )}
      <div className={twJoin('flex items-center', longPrefix && 'max-lg:flex-wrap')}>
        {prefix && (
          <div
            className={twJoin(
              'rounded-l-2 border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-3 font-rubik text-md text-gray-600 dark:border-gray-blue-300 dark:bg-downriver dark:text-gray-blue-100',
              longPrefix && 'w-full max-lg:rounded-b-none max-lg:rounded-t-2 max-lg:border max-lg:border-b-0',
            )}
          >
            {prefix}
          </div>
        )}
        <div className="relative w-full">
          {PrefixIcon && <PrefixIcon className="absolute left-3 top-3 size-5" />}
          <input
            {...inputProps}
            className={twMerge(
              'w-full rounded-2 border px-3.5 py-2.5 font-rubik text-md text-gray-900 shadow-button-xs outline-none dark:bg-downriver dark:px-3 dark:py-2 dark:text-white',
              prefix && 'rounded-l-none',
              PrefixIcon && '!pl-11',
              longPrefix && 'max-lg:rounded-b-2 max-lg:rounded-t-none',
              error
                ? 'border-error-300 focus:border-error-300 focus:shadow-xs-focused-error'
                : `border-gray-300 focus:border-primary-300 focus:shadow-xs-focused-primary dark:border-gray-blue-300 dark:bg-downriver dark:text-white dark:placeholder-gray-blue-300`,
              inputProps?.className,
            )}
            id={inputId}
            type={type === 'password' && !isShowPassword ? 'password' : 'text'}
          />
          {type === 'password' && !error && (
            <button
              type="button"
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute right-3.5 top-1/2"
              style={{
                transform: 'translate(0, -50%)',
              }}
            >
              {isShowPassword ? <EyeIcon /> : <EyeOffIcon />}
            </button>
          )}
          {!!error && (
            <span className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-error-500">
              <AlertIcon />
            </span>
          )}
        </div>
      </div>

      {hintText && !error && <p className="font-rubik text-sm text-gray-600">{hintText}</p>}
      {error && <FieldError error={error} />}
    </div>
  );
}

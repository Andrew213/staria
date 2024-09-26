'use client';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { FieldError } from '../FieldError/FieldError';

interface Props {
  textareaProps?: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
  maxLength?: number;
  isDirty?: boolean;
  error?: string;
}

export function FormTextarea({ textareaProps, maxLength, isDirty, error }: Props) {
  const [length, setLength] = useState(maxLength ?? 0);
  useEffect(() => {
    if (!isDirty && maxLength) {
      setLength(maxLength);
    }
  }, [isDirty, maxLength]);
  const lengthCounter = (value: string) => {
    if (maxLength) {
      if (value.length <= maxLength) {
        setLength(maxLength - value.length);
      }
      if (!value) {
        setLength(maxLength);
      }
    }
  };
  return (
    <div>
      <textarea
        className={twMerge(
          'w-full rounded-2 border px-3.5 py-2.5 font-rubik text-md text-gray-900 shadow-button-xs outline-none dark:bg-downriver dark:px-3 dark:py-2 dark:text-white',
          error
            ? 'border-error-300 focus:border-error-300 focus:shadow-xs-focused-error'
            : `border-gray-300 focus:border-primary-300 focus:shadow-xs-focused-primary dark:border-gray-blue-300 dark:bg-downriver dark:text-white dark:placeholder-gray-blue-300`,
          textareaProps?.className,
        )}
        {...textareaProps}
        onChange={(e) => {
          textareaProps?.onChange?.(e);
          if (maxLength && length >= 0) {
            lengthCounter(e.target.value);
          }
        }}
        maxLength={maxLength}
      />

      {maxLength && maxLength === length && !error && (
        <p className="mt-1.5 font-rubik text-sm text-gray-blue-400">{`${maxLength} characters maximum`}</p>
      )}
      {maxLength && !error && length < maxLength && (
        <p className="mt-1.5 font-rubik text-sm text-gray-blue-100">{`${length} characters left`}</p>
      )}
      {error && <FieldError error={error} />}
    </div>
  );
}

import cn from 'classnames';
import type React from 'react';
import { useId } from 'react';

import { FieldError } from '../FieldError/FieldError';

interface Props {
  textareaProps: React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
  label?: string;
  hintText?: string;
  error?: string;
}

export function TextArea({ label, hintText, error, textareaProps }: Props) {
  const textareaId = useId();

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700" htmlFor={textareaId}>
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'h-[134px] w-full resize-none rounded-2 border px-3.5 py-2.5 font-rubik text-md text-gray-900 shadow-button-xs outline-none',
          {
            'border-error-300': !!error,
            'border-gray-300': !error,
            'focus:shadow-xs-focused-error': !!error,
            'focus:border-primary-300': !error,
            'focus:border-error-300': !!error,
            'focus:shadow-xs-focused-primary': !error,
          },
        )}
        id={textareaId}
        {...textareaProps}
      />
      {hintText && !error && <p className="font-rubik text-sm text-gray-600">{hintText}</p>}
      {error && <FieldError error={error} />}
    </div>
  );
}

import cn from 'classnames';
import Link from 'next/link';
import type React from 'react';

import { Checkbox } from '../../Checkbox/Checkbox';
import { FieldError } from '../../FieldError/FieldError';

type Color = 'gray' | 'colored';
type Type = 'primary' | 'secondary';
type Justify = 'start' | 'space-between';

interface Props {
  inputProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  error?: string;
  text: string;
  linkText: string;
  linkHref: string;
  color: Color;
  type: Type;
  itemsJustify?: Justify;
}

export function LinkWithCheckbox(props: Props) {
  const { inputProps, error, text, linkText, linkHref, type, color, itemsJustify } = props;

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={cn('flex items-center', {
          'gap-3': type === 'primary',
          'gap-2': type === 'secondary',
        })}
      >
        <Checkbox inputProps={inputProps} error={error} />
        <div
          className={cn('flex items-center justify-start gap-1', {
            'font-rubik text-md font-normal text-gray-600': color === 'gray',
            'text-sm font-medium text-gray-700 dark:text-gray-25': color === 'colored',
            'justify-between': itemsJustify === 'space-between',
          })}
        >
          <p>{text}</p>
          <Link
            href={linkHref}
            className={cn({
              underline: type === 'primary',
              'text-primary-500 dark:text-primary-300': color === 'colored',
            })}
          >
            {linkText}
          </Link>
        </div>
      </div>
      {error && <FieldError error={error} />}
    </div>
  );
}

import cn from 'classnames';
import Link from 'next/link';
import type React from 'react';
import { useState, useRef } from 'react';

import { useClickOutside } from '@/app/_shared/hooks';
import { ChevronDownIcon } from '@/assets/icons';

import { ListItem } from './ListItem';

type Props = {
  items: { label: string; value: string; href?: string }[];
  current?: string;
  onSelect?: (value: string) => void;
} & Pick<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'placeholder'>;

export function InputDropdown({ items, current, placeholder, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => {
    setOpen(false);
  });
  const currentItem = items.find(({ value }) => value === current);

  const handleSelect = (value: string) => {
    onSelect?.(value);
    setOpen(false);
  };

  return (
    <div className="relative z-10" ref={ref}>
      <div
        className={cn(
          `flex w-full cursor-pointer items-center justify-between gap-2 rounded-2 border border-gray-300 bg-white px-3.5 py-2.5 shadow-button-xs transition-colors hover:border-primary-300 has-[:focus]:shadow-xs-focused-primary`,
          { ['border-primary-300 shadow-xs-focused-primary']: open },
        )}
        onClick={() => {
          setOpen(true);
        }}
      >
        <input
          className="cursor-pointer text-md font-medium text-gray-900 outline-none placeholder:font-rubik placeholder:font-normal"
          placeholder={placeholder}
          value={currentItem ? currentItem.label : ''}
          type="text"
          readOnly
        />
        <ChevronDownIcon className="size-5 text-gray-500" />
      </div>
      {open && (
        <div className="absolute inset-x-0 top-full pt-1">
          <div className="flex flex-col rounded-2 border border-gray-200 bg-white py-1 shadow-lg">
            {items.map(({ label, value, href }) => (
              <div className="w-full px-1.5 py-0.5" key={value}>
                {href ? (
                  <Link className="w-full" href={href} onClick={() => handleSelect(value)} scroll={false} shallow>
                    <ListItem label={label} checked={!!currentItem && currentItem.value === value} />
                  </Link>
                ) : (
                  <button className="w-full" type="button" onClick={() => handleSelect(value)}>
                    <ListItem label={label} checked={!!currentItem && currentItem.value === value} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

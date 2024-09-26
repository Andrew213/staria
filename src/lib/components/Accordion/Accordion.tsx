import cn from 'classnames';
import { useRef } from 'react';

import type { PropsWithClassName } from '@/app/_shared/types';
import { MinusIcon, PlusIcon } from '@/assets/icons';

type Props = {
  title: React.ReactNode;
  content: React.ReactNode;
  expanded: boolean;
  onClick: () => void;
} & PropsWithClassName;

export function Accordion({ title, content, expanded, className, onClick }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        'cursor-pointer rounded-4 p-5 transition-[background-color] duration-200 ease-linear hover:bg-gray-50 lg:p-8',
        {
          'bg-gray-50': expanded,
        },
        className,
      )}
      ref={ref}
      onClick={onClick}
    >
      <div className="flex justify-between gap-2 pb-2 lg:justify-start lg:gap-6">
        <div className="size-6 shrink-0 pt-0.5 text-gray-400">{expanded ? <MinusIcon /> : <PlusIcon />}</div>
        <h3 className="-order-1 text-lg font-medium text-gray-900 lg:order-1">{title}</h3>
      </div>
      <div
        className={cn(
          'overflow-hidden pl-0 font-rubik text-md text-gray-600 transition-[opacity,_max-height] duration-500 lg:pl-12',
          expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0',
        )}
        onTransitionEnd={() => {
          if (expanded) {
            ref.current?.scrollIntoView();
          }
        }}
      >
        {content}
      </div>
    </div>
  );
}

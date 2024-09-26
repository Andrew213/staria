import cn from 'classnames';
import Link from 'next/link';

interface Props {
  items: { label: React.ReactNode; value: string; href?: string }[];
  current: string;
  size?: 'xs' | 'md';
  onSelect?: (value: string) => void;
}

export function Tabs({ items, current, onSelect, size = 'md' }: Props) {
  return (
    <div>
      <div className="scrollbar-hidden flex gap-4 overflow-auto px-4 lg:px-0 [@media(hover:hover)]:flex-wrap [@media(hover:hover)]:overflow-visible">
        {items.map(({ label, value, href }) =>
          href ? (
            <Link
              key={value}
              className={cn(
                `shrink-0 border-b-2 px-1 pb-2.5 text-md font-semibold transition-colors hover:border-primary-700 hover:text-primary-700`,
                value === current ? 'border-primary-700 text-primary-700' : 'border-transparent text-gray-500',
                {
                  'pb-2.5 text-md': size === 'md',
                  'pb-2 text-sm': size === 'xs',
                },
              )}
              href={href}
              scroll={false}
              shallow
            >
              {label}
            </Link>
          ) : (
            <button
              onClick={() => onSelect?.(value)}
              key={value}
              className={cn(
                `shrink-0 border-b-2 px-1 pb-2.5 text-md font-semibold transition-colors hover:border-primary-700 hover:text-primary-700`,
                value === current ? 'border-primary-700 text-primary-700' : 'border-transparent text-gray-500',
                {
                  'pb-2.5 text-md': size === 'md',
                  'pb-2 text-sm': size === 'xs',
                },
              )}
            >
              {label}
            </button>
          ),
        )}
      </div>
      <div className="mx-4 border-b border-gray-200 lg:mx-0" />
    </div>
  );
}

import cn from 'classnames';
import type React from 'react';

type Size = 'md';
type Color = 'primary';

interface Props {
  content: React.ReactNode;
  innerBadgeContent: React.ReactNode;
  size: Size;
  color: Color;
}

export function BadgeGroup(props: Props) {
  const { innerBadgeContent, content, size, color } = props;

  return (
    <div
      className={cn('flex items-center border', {
        'gap-2 rounded-4 py-1 pl-1 pr-2.5': size === 'md',
        'border-primary-200 bg-primary-50': color === 'primary',
      })}
    >
      <div
        className={cn('border', {
          'rounded-4 px-2 py-0.5 text-center text-xs font-medium': size === 'md',
          'border-primary-200 bg-white text-primary-700': color === 'primary',
        })}
      >
        {innerBadgeContent}
      </div>
      <div
        className={cn({
          'text-xs font-medium': size === 'md',
          'text-primary-700': color === 'primary',
        })}
      >
        {content}
      </div>
    </div>
  );
}

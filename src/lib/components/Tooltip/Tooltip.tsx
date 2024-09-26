import cn from 'classnames';
import type { PlacesType } from 'react-tooltip';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

type Color = 'primary' | 'secondary';

interface Props {
  id: string;
  text?: string;
  title?: string;
  position: PlacesType;
  color: Color;
  className?: string;
  children?: React.ReactNode;
}

export function Tooltip({ color, id, position, title, text, children }: Props) {
  return (
    <ReactTooltip
      className={cn(
        '!pointer-events-auto z-10 flex max-w-[232px] flex-col !rounded-2 !px-3 !py-2 !opacity-100',
        {
          '!bg-white !shadow-tooltip-primary': color === 'primary',
          '!bg-gray-900': color === 'secondary',
        },
        'bg-red',
      )}
      classNameArrow={cn('block')}
      id={id}
      place={position}
    >
      {title && (
        <p
          className={cn('mb-0.5 text-xs font-semibold', {
            'text-gray-700': color === 'primary',
            'text-white': color === 'secondary',
          })}
        >
          {title}
        </p>
      )}
      <p
        className={cn('!text-xs !font-medium', {
          'text-gray-500': color === 'primary',
          'text-white': color === 'secondary',
        })}
      >
        {text}
      </p>
      {children}
    </ReactTooltip>
  );
}

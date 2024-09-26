import 'react-tooltip/dist/react-tooltip.css';

import cn from 'classnames';
import type { PlacesType } from 'react-tooltip';
import { twJoin } from 'tailwind-merge';

import { QuestionMarkIcon } from '@/assets/icons';

import { Tooltip } from '../Tooltip/Tooltip';

type Color = 'primary' | 'secondary';

interface Props {
  id: string;
  text?: string;
  title?: string;
  position: PlacesType;
  color: Color;
  className?: string;
  icon?: React.ReactNode;
  small?: boolean;
  children?: React.ReactNode;
}

export function QuestionMarkTooltip(props: Props) {
  const { id, className, icon, small } = props;

  return (
    <div className={cn(className)}>
      <div className="cursor-pointer" data-tooltip-id={id}>
        {icon ?? (
          <QuestionMarkIcon className={twJoin('text-gray-500 dark:text-gray-blue-400', small ? 'size-4' : 'size-6')} />
        )}
      </div>

      <Tooltip {...props} />
    </div>
  );
}

'use client';

import cn from 'classnames';
import type { FC, SVGProps } from 'react';

import { MarkerIcon } from '@/assets/icons';
import { QuestionMarkTooltip } from '@/lib/components';

interface Props {
  country: string;
  city: string;
  icon: FC<SVGProps<SVGElement>>;
  markerPosition: {
    top: string;
    left: string;
  };
}

export function MarkerTooltip(props: Props) {
  const { icon: Icon, country, city, markerPosition } = props;
  const { top, left } = markerPosition;

  return (
    <QuestionMarkTooltip
      icon={<MarkerIcon />}
      id={`marker-tooltip-${country}`}
      position="top"
      color="primary"
      className={cn('absolute', top, left)}
    >
      <div className="flex flex-col items-center justify-center">
        <Icon className="mb-2" />
        <p className="mb-1 text-xs font-semibold text-gray-600">{country}</p>
        <p className="font-rubik text-xs font-normal text-gray-600">{city}</p>
      </div>
    </QuestionMarkTooltip>
  );
}

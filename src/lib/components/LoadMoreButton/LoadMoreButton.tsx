import cn from 'classnames';
import { useState } from 'react';

import { text } from './constants';
import { Button } from '../Button/Button';

interface Props {
  setIsLoadMore: (a: boolean) => void;
  className?: string;
}

export function LoadMoreButton({ setIsLoadMore, className }: Props) {
  const [isHidden, setIsHidden] = useState(false);
  return (
    <Button
      content={text}
      size="md"
      onClick={() => {
        setIsHidden(true);
        setIsLoadMore(true);
      }}
      color="secondary-gray"
      className={cn(`mt-8 max-w-[167px] self-center px-5 py-3 lg:mt-12 ${className}`, { hidden: isHidden })}
      animate
    />
  );
}

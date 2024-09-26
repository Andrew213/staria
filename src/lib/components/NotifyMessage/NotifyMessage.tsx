import cn from 'classnames';
import { useEffect } from 'react';

interface Props {
  text: string;
  isShow: boolean;
  trigger: (val: boolean) => void;
  className?: string;
}

export function NotifyMessage(props: Props) {
  const { text, trigger, isShow, className } = props;

  useEffect(() => {
    const timeout = setTimeout(() => {
      trigger(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [isShow, trigger]);

  return (
    <p className={cn('text-center font-rubik text-sm text-primary-800', { hidden: !isShow }, className)}>{text}</p>
  );
}

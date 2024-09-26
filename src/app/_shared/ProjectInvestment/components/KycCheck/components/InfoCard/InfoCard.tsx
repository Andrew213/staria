import cn from 'classnames';

import { InfoCardHeader } from '@/app/_shared/InfoCardHeader/InfoCardHeader';
import { Button } from '@/lib/components';

interface Props extends React.PropsWithChildren {
  title: string;
  showVerification?: boolean;
  buttonText?: string;
  showHeader?: boolean;
  buttonLoading?: boolean;
  titleWithoutBorder?: boolean;
  onClick?: () => void;
}

export function InfoCard({
  title,
  buttonLoading,
  showHeader = true,
  children,
  buttonText,
  titleWithoutBorder,
  onClick,
}: Props) {
  return (
    <div className="flex flex-col gap-6 rounded-full lg:gap-8">
      <h2
        className={cn('hidden text-center text-display-sm font-semibold text-gray-900 lg:inline dark:text-white', {
          'border-b border-gray-200 pb-4 dark:border-gray-blue-500': !titleWithoutBorder,
        })}
      >
        {title}
      </h2>
      <div>
        {showHeader && <InfoCardHeader className="mb-4" />}
        <div className="rounded-3 border border-gray-200 p-4 dark:border-gray-blue-500 dark:bg-blue-zodiac">
          {children}
        </div>
      </div>
      <Button
        className="w-full"
        type="button"
        color="primary"
        size="md"
        loading={buttonLoading}
        content={buttonText ?? 'Continue'}
        onClick={() => onClick?.()}
      />
    </div>
  );
}

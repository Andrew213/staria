import cn from 'classnames';
import Link from 'next/link';

import { Logo } from '@/assets/icons';
import { getCurrentYear } from '@/utils';

import { data } from './constants';

interface Props {
  children: React.ReactNode;
  backgroundImage: string;
  title?: string;
  subtitle?: string;
  isShowBottomText?: boolean;
  isHideBgOnMobile?: boolean;
  isRoundedBg?: boolean;
  marginBottomToCopyright?: string;
  isHideLogoOnMobile?: boolean;
}

const { copyright } = data;

export function AuthWrapper(props: Props) {
  const {
    children,
    backgroundImage,
    title,
    subtitle,
    isShowBottomText,
    marginBottomToCopyright,
    isHideBgOnMobile,
    isRoundedBg,
    isHideLogoOnMobile,
  } = props;

  return (
    <div className="flex size-full flex-col justify-center md:grid md:grid-cols-2">
      <div className="relative flex w-full flex-col items-center py-16 lg:items-start lg:p-8">
        <div
          className={cn('flex', {
            'hidden lg:flex': isHideLogoOnMobile,
          })}
        >
          <Link href="/">
            <Logo className="w-[141px] text-gray-800 lg:w-[207px] dark:text-white" />
          </Link>
        </div>
        <div
          className={cn(
            'm-auto mt-6 flex h-full w-full max-w-[500px] flex-col items-center gap-8 px-4 lg:mt-[77px] lg:max-w-[360px] lg:p-0',
            marginBottomToCopyright,
          )}
        >
          {title && subtitle && (
            <div className="flex w-full flex-col items-center gap-2 lg:items-start lg:gap-3">
              <h1 className="text-display-xs font-semibold text-gray-900 lg:text-display-sm dark:text-white">
                {title}
              </h1>
              <p className="font-rubik text-md font-normal text-gray-600 dark:text-gray-blue-100">{subtitle}</p>
            </div>
          )}
          {children}
        </div>
        {isShowBottomText && (
          <p className="hidden font-rubik text-sm text-gray-600 lg:inline dark:text-gray-blue-100">
            {copyright + ' ' + getCurrentYear()}
          </p>
        )}
      </div>
      <div
        className={cn(`justify-center ${backgroundImage} bg-cover bg-center bg-no-repeat md:h-auto`, {
          'mb-6 rounded-6 md:m-6': isRoundedBg,
          'hidden md:flex': isHideBgOnMobile,
          'mx-4 h-[361px]': !isHideBgOnMobile,
        })}
      />
    </div>
  );
}

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
  isHideLogoOnMobile?: boolean;
}

const { copyright } = data;

export function AuthWrapperSmall(props: Props) {
  const { children, backgroundImage, title, subtitle, isShowBottomText, isHideLogoOnMobile } = props;

  return (
    <div className="flex size-full flex-col items-center lg:grid lg:grid-cols-2 lg:items-stretch lg:justify-center">
      <div className="relative flex w-full flex-col items-center pb-4 pt-12 lg:items-start lg:p-8">
        <div
          className={cn('flex', {
            'hidden lg:flex': isHideLogoOnMobile,
          })}
        >
          <Link href="/">
            <Logo className="w-[141px] text-gray-800 lg:w-[207px]" />
          </Link>
        </div>
        <div
          className={cn(
            'flex w-full max-w-[500px] flex-col items-center gap-8 px-4 lg:m-auto lg:max-w-[360px] lg:p-0',
            {
              'pt-6': !isHideLogoOnMobile,
            },
          )}
        >
          {title && subtitle && (
            <div className={cn('flex w-full flex-col items-center gap-2 lg:gap-3')}>
              <h1 className="text-display-xs font-semibold text-gray-900 lg:text-display-sm">{title}</h1>
              <p className="text-center font-rubik text-md font-normal text-gray-600">{subtitle}</p>
            </div>
          )}
          {children}
        </div>
        {isShowBottomText && (
          <p className="hidden font-rubik text-sm text-gray-600 lg:inline">{copyright + ' ' + getCurrentYear()}</p>
        )}
      </div>
      <div
        className={cn(
          `mx-4 mb-12 mt-4 h-[calc(100%-16px)] max-h-[361px] w-[calc(100%-32px)] max-w-[500px] justify-center rounded-4 lg:my-6 lg:ml-0 lg:mr-6 lg:max-h-[calc(100%-48px)] lg:w-[calc(100%-24px)] lg:max-w-[calc(100%-24px)] ${backgroundImage} bg-cover bg-center bg-no-repeat lg:flex`,
        )}
      />
    </div>
  );
}

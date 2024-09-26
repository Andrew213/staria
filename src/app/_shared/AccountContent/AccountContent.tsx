import { twJoin } from 'tailwind-merge';

import { MenuSideBar, MobileMenu } from '@/app/_components';

import ShortFooter from '../ShortFooter/ShortFooter';

interface Props extends React.PropsWithChildren {
  type: 'account' | 'manager';
}

export function AccountContent({ children, type }: Props) {
  return (
    <>
      <MenuSideBar type={type} />
      <div className="flex min-h-screen flex-col xl:ml-70">
        <main
          className={twJoin(
            'flex shrink-0 grow basis-auto flex-col bg-gray-100 lg:items-center dark:bg-midnight',
            type === 'account' ? 'p-4 lg:p-6' : 'px-4 pb-12 pt-4 lg:px-8 lg:pb-[88px] lg:pt-6',
          )}
        >
          <MobileMenu type={type} />
          {children}
        </main>
        <div className="px-4 lg:px-8">
          <ShortFooter placedUnderLayout={type} />
        </div>
      </div>
    </>
  );
}

'use client';

import cn from 'classnames';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

import { ConnectWalletMenuButton } from '@/app/_shared';
import { Logo, LogoutIcon, UserSquare } from '@/assets/icons';
import { useNotification } from '@/features/notificationNavbar';
import { useAppSelector } from '@/redux/hooks';
import { selectIsUserManager, selectManagedCommunitySlug } from '@/redux/userSlice';

import { CloseButton } from '../Header/components/CloseButton/CloseButton';
import { getCommunityManagerTab, data as MenuData } from '../MenuSideBar/constants';
import { UserAvatar } from '../UserAvatar/UserAvatar';

interface Props {
  isOpen: boolean;
  setIsOpen: (a: boolean) => void;
}

export function MobileUserNav({ isOpen, setIsOpen }: Props) {
  const user = useAppSelector((store) => store.user);
  const isUserManager = useAppSelector(selectIsUserManager);
  const managedCommunityslug = useAppSelector(selectManagedCommunitySlug);

  const { notificationHeight } = useNotification();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        'fixed inset-0 left-[-2000px] z-50 flex w-full flex-col overflow-auto bg-white transition-all ease-linear lg:hidden',
        {
          '!left-0': isOpen,
        },
      )}
      style={{ top: notificationHeight }}
    >
      <div className="flex justify-center py-2.5 lg:py-2">
        <div className="flex w-full max-w-screen-xl items-center justify-between pl-4 pr-3 lg:px-8">
          <Link
            href="/"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <Logo className="w-[141px] text-gray-800 lg:w-[207px]" />
          </Link>
          <div className="lg:hidden">
            <CloseButton onClick={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
      <ul className="mb-10 flex grow flex-col gap-2 px-3.5">
        {(managedCommunityslug ?? isUserManager) && (
          <li className="border-b">
            <Link
              href={getCommunityManagerTab(managedCommunityslug).href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 rounded-1.5 hover:bg-gray-100"
            >
              <UserSquare className="size-4 text-primary-500" />
              <p className="text-sm font-medium text-gray-800">{getCommunityManagerTab().title}</p>
            </Link>
          </li>
        )}
        {MenuData.map(({ href, title, Icon, id }) => {
          return (
            <li key={id}>
              <Link
                href={href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 rounded-1.5 p-2.5 hover:bg-gray-100"
              >
                <Icon className="size-4 text-primary-500" />
                <p className="text-sm font-medium text-gray-800">{title}</p>
              </Link>
            </li>
          );
        })}
        <li>
          <ConnectWalletMenuButton />
        </li>

        <li>
          <button
            onClick={() => {
              void signOut();
            }}
            className="flex w-full items-center gap-2 rounded-1.5 p-2.5 hover:bg-gray-100"
          >
            <LogoutIcon className="size-4 text-primary-500" />
            <span className="block text-sm font-medium text-gray-800">Logout</span>
          </button>
        </li>
      </ul>
      <div className="flex w-full items-center gap-2 border-t border-gray-200 px-4 py-6">
        <UserAvatar className='relative after:absolute after:right-0 after:size-[11px] after:rounded-full after:bg-primary-300 after:content-[""]' />

        <p className="overflow-hidden truncate text-sm font-semibold text-gray-700">{user.email}</p>
      </div>
    </div>
  );
}

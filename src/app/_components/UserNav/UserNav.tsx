import classNames from 'classnames';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { InviteFiendsModal } from '@/app/(accountLayout)/account/referral/_components';
import { ConnectWalletMenuButton } from '@/app/_shared';
import { Diamond01Icon, LogoutIcon, UserCheck01Icon, UserPlus, UserSquare, UserX01Icon } from '@/assets/icons';
import NoSsr from '@/core/NoSsr/NoSsr';
import { Badge, Button } from '@/lib/components';
import { useAppSelector } from '@/redux/hooks';
import { selectActiveSubscription, selectIsUserManager, selectManagedCommunitySlug } from '@/redux/userSlice';
import { planNames } from '@/utils/planNames';

import { data } from './constants';
//import type { menuItem } from '../MenuSideBar/constants';
import { getCommunityManagerTab, data as MenuData } from '../MenuSideBar/constants';
import { MobileUserNav } from '../MobileUserNav/MobileUserNav';
import { UserAvatar } from '../UserAvatar/UserAvatar';

export function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isInviteFriendsModalOpen, setIsInviteFriendsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const lg = useMediaQuery({ query: '(max-width: 1024px)' });
  const user = useAppSelector((store) => store.user);
  const activeSubscription = useAppSelector(selectActiveSubscription);
  const isUserManager = useAppSelector(selectIsUserManager);
  const managedCommunityslug = useAppSelector(selectManagedCommunitySlug);

  const showNotVerifiedBadge = user.verification.currentLevel === 0 ? true : false;
  const showVerifiedBadge = user.verification.currentLevel > 0 ? true : false;

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (
        buttonRef.current &&
        dropDownRef.current &&
        !buttonRef.current.contains(e.target as HTMLElement) &&
        !dropDownRef.current.contains(e.target as HTMLElement)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <NoSsr>
      <div className="relative flex items-center gap-4">
        {isInviteFriendsModalOpen && (
          <InviteFiendsModal
            onClose={() => {
              setIsInviteFriendsModalOpen(false);
            }}
          />
        )}
        <Button
          color="secondary-gray"
          content={
            <>
              <span className="hidden lg:inline">{data.inviteText}</span>
              <span className="inline lg:hidden">{data.inviteTextSm}</span>
            </>
          }
          onClick={() => setIsInviteFriendsModalOpen(true)}
          icon={
            <div className="size-4">
              <UserPlus />
            </div>
          }
          className="!p-2 lg:!px-4 lg:!py-2.5"
          size="md"
        />
        <button
          ref={buttonRef}
          onClick={() => {
            setIsOpen((prev) => !prev);

            if (lg) {
              setIsMobileOpen(true);
            }
          }}
        >
          <UserAvatar />
        </button>
        {lg && <MobileUserNav isOpen={isMobileOpen} setIsOpen={setIsMobileOpen} />}

        {isOpen && (
          <>
            <div
              ref={dropDownRef}
              className="absolute bottom-0 hidden max-w-60 translate-y-full rounded-2 border border-gray-200 bg-white lg:block"
            >
              <div className="flex items-center gap-2 border-b border-gray-200 p-3">
                <UserAvatar className='relative after:absolute after:right-0 after:size-[11px] after:rounded-full after:bg-primary-300 after:content-[""]' />
                <div className="truncate">
                  <p className="overflow-hidden truncate text-sm font-semibold text-gray-700">{user.email}</p>
                  <div className="mt-2 flex flex-col items-start gap-1">
                    {showNotVerifiedBadge && (
                      <Badge
                        icon={<UserX01Icon className="size-3" />}
                        variant="square"
                        size="sm"
                        color="error"
                        content="Not Verified"
                      />
                    )}
                    {showVerifiedBadge && (
                      <Badge
                        icon={<UserCheck01Icon className="size-3" />}
                        variant="square"
                        size="sm"
                        color="success"
                        content="Verified"
                      />
                    )}
                    <Badge
                      icon={<Diamond01Icon className="size-3" />}
                      variant="square"
                      size="sm"
                      color="blue-light"
                      content={`${planNames[activeSubscription ?? 'basic']} Plan`}
                    />
                  </div>
                </div>
              </div>
              <ul className="flex flex-col gap-2 p-2">
                {(managedCommunityslug ?? isUserManager) && (
                  <li className="border-b">
                    <Link
                      href={getCommunityManagerTab(managedCommunityslug).href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 rounded-1.5 p-2.5 hover:bg-gray-100"
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
                        className={classNames('flex items-center gap-2 rounded-1.5 p-2.5 hover:bg-gray-100')}
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
            </div>
          </>
        )}
      </div>
    </NoSsr>
  );
}

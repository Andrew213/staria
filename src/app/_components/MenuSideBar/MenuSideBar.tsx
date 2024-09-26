'use client';

import cn from 'classnames';
import { usePathname } from 'next/navigation';

import { accountMenuItems, getManagerAccountMenuItems } from '@/app/_shared/constants';
import { useNotification } from '@/features/notificationNavbar';
import { useAppSelector } from '@/redux/hooks';
import { selectManagedCommunitySlug } from '@/redux/userSlice';
import { routes } from '@/routes';

import { LogoutBtn } from './LogoutBtn/LogoutBtn';
import { MenuLink } from '../MenuLink/MenuLink';

interface Props {
  type: 'account' | 'manager';
}

export function MenuSideBar({ type }: Props) {
  const { isUserClosed } = useNotification();
  const path = usePathname();
  const managedCommunitSlug = useAppSelector(selectManagedCommunitySlug);

  let items = accountMenuItems;
  if (type === 'manager') {
    items = managedCommunitSlug ? getManagerAccountMenuItems(managedCommunitSlug) : getManagerAccountMenuItems();
  }

  const isNewCommunity = type === 'manager' && path === routes.community.new.getRoutePath();
  return (
    <div className="fixed inset-y-0 z-30 hidden w-70 flex-col justify-between bg-white px-4 pb-10 xl:flex dark:border-r dark:border-gray-blue-800 dark:bg-midnight">
      <nav
        className={cn(`flex flex-col gap-1 pt-40 transition-all ease-linear`, {
          '!pt-20': isUserClosed,
        })}
      >
        {items.map(({ title, Icon, id, href, children, hide }) => {
          return !children ? (
            <MenuLink
              title={title}
              isActive={path === href}
              href={href}
              Icon={<Icon className="size-5" />}
              key={id}
              hide={hide}
            />
          ) : (
            <>
              <MenuLink
                isClickable={false}
                title={title}
                isActive={false}
                href=""
                Icon={<Icon className="size-5" />}
                hide={hide}
              />

              <div className="flex flex-col gap-2 pl-4">
                {children.map(
                  ({ title: childTitle, Icon: ChildIcon, id: childId, href: childHref, hide: childHide }) => {
                    return (
                      <MenuLink
                        title={childTitle}
                        isActive={path === childHref || (isNewCommunity && id === 2)}
                        href={childHref}
                        Icon={<ChildIcon className="size-5" />}
                        key={childId}
                        hide={childHide}
                      />
                    );
                  },
                )}
              </div>
            </>
          );
        })}
      </nav>
      <LogoutBtn />
    </div>
  );
}

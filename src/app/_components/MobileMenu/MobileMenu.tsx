'use client';
import cn from 'classnames';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { twJoin } from 'tailwind-merge';

import type { SidebarMenuItems } from '@/app/_shared/constants';
import { accountMenuItems, getManagerAccountMenuItems } from '@/app/_shared/constants';
import { useAppSelector } from '@/redux/hooks';
import { selectIsUserManager, selectManagedCommunitySlug } from '@/redux/userSlice';
import { routes } from '@/routes';

import { MenuLink } from '../MenuLink/MenuLink';

interface Props {
  type: 'account' | 'manager';
}

export function MobileMenu({ type }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const isUserManager = useAppSelector(selectIsUserManager);
  const managedCommunityslug = useAppSelector(selectManagedCommunitySlug);

  let rawItems = accountMenuItems;
  if (type === 'manager') {
    if (managedCommunityslug ?? isUserManager) {
      rawItems = managedCommunityslug ? getManagerAccountMenuItems(managedCommunityslug) : getManagerAccountMenuItems();
    }
  }

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

  const path = usePathname();

  const items = rawItems.some((item) => item.children)
    ? rawItems.reduce((prev, cur) => [...prev, ...cur.children!], [] as SidebarMenuItems)
    : rawItems;

  const isNewCommunity = type === 'manager' && path === routes.community.new.getRedirectPath();

  let activeItem = items.find((el) => path.startsWith(el.href)) ?? items[0];
  if (isNewCommunity) {
    activeItem = items[1];
  }

  const { Icon, title, id: activeId } = activeItem;

  return (
    <div className={twJoin('relative mr-auto w-full xl:hidden', type === 'account' ? 'mb-4' : 'mb-8')}>
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="flex w-full items-center gap-2 rounded-2 border border-gray-300 bg-white px-3.5 py-2.5 align-middle shadow-button-xs transition-all duration-500 ease-out dark:border-gray-blue-300 dark:bg-downriver"
      >
        <Icon className="size-5 text-gray-600 dark:text-white" />
        <p className="text-md text-gray-900 dark:text-white">{title}</p>
        <div
          className={cn(
            'ease ml-auto inline-block size-3 -rotate-45 border-b-2 border-r-2 border-gray-600 transition-all duration-200 dark:border-white',
            { '!rotate-45': isOpen },
          )}
        />
      </button>
      <div
        ref={dropDownRef}
        className={cn(
          'ease absolute -bottom-1 z-10 h-0 w-full min-w-[290px] translate-y-full overflow-hidden transition-all duration-200',

          {
            'h-[340px]': isOpen,
          },
        )}
      >
        <div className="flex w-full flex-col gap-1 rounded-2 border border-gray-100 bg-gray-50 p-1.5 dark:border-gray-blue-500 dark:bg-downriver">
          {items.map(({ Icon, id, title, href, hide }) => {
            return (
              <MenuLink
                title={title}
                hide={hide}
                isActive={id === activeId || (isNewCommunity && id === 2)}
                href={href}
                setIsOpen={setIsOpen}
                Icon={<Icon className="size-5" />}
                key={id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

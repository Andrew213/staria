'use client';
import { signOut } from 'next-auth/react';

import { LogoutIcon } from '@/assets/icons';
import { useAppSelector } from '@/redux/hooks';

import { UserAvatar } from '../../UserAvatar/UserAvatar';

export function LogoutBtn() {
  const user = useAppSelector((store) => store.user);

  return (
    <button
      className="relative bottom-0 mt-6 flex w-full max-w-[248px] items-center gap-3 self-end justify-self-end truncate border-t border-t-gray-300 pt-6 text-sm dark:border-t-gray-blue-500"
      onClick={() => {
        void signOut();
      }}
    >
      <UserAvatar />
      <p className="max-w-[150px] truncate text-gray-600 dark:text-gray-25">{user.email}</p>
      <LogoutIcon className="absolute right-0 size-4.5 text-gray-800 dark:text-gray-25" />
    </button>
  );
}

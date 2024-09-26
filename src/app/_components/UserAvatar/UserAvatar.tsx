'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { UserDefault } from '@/assets/icons';
import { useAppSelector } from '@/redux/hooks';

interface Props {
  className?: string;
}

export function UserAvatar({ className }: Props) {
  const user = useAppSelector((state) => state.user);

  if (user.avatarUrl) {
    return (
      <Image
        className={twMerge(
          'rounded-full border border-gray-900 border-opacity-10 bg-gray-100 p-2 dark:border-gray-blue-500 dark:bg-blue-zodiac',
          className,
        )}
        src={user.avatarUrl}
        alt="userAvatar"
        fill
        priority
      />
    );
  } else {
    return (
      <span
        className={twMerge(
          'block rounded-full border border-gray-900 border-opacity-10 bg-gray-100 p-2 dark:border-gray-blue-500 dark:bg-blue-zodiac',
          className,
        )}
      >
        <UserDefault className="text-gray-600 dark:text-gray-blue-50" />
      </span>
    );
  }
}

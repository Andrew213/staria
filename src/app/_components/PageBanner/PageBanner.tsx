'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { NotificationNavbar } from '@/features/notificationNavbar';
import { capitalizeFirstLetter } from '@/utils/string';

import { data } from './constants';

export function PageBanner() {
  const { communityName } = useParams<{ communityName?: string }>();

  return (
    <NotificationNavbar
      content={
        <div className="flex flex-col lg:block">
          <span className="mt-px dark:hidden">{data.text} </span>
          {communityName && (
            <span className="mt-px hidden dark:inline">
              You are on {capitalizeFirstLetter(communityName)} Community Deals{' '}
            </span>
          )}
          <Link className="dark:hidden" target={`${data.newTab ? '_blank' : '_self'}`} href={data.href}>
            {data.linkText}
          </Link>
        </div>
      }
    />
  );
}

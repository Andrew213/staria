'use client';

import { useState } from 'react';

import type { Notification } from '@/api/types';
import { Badge, Tabs } from '@/lib/components';
import { useAppSelector } from '@/redux/hooks';
import { selectActiveSubscription } from '@/redux/userSlice';
import { isDefined } from '@/utils';

import { KycTab } from './_components';
import { NotificationsTab } from './_components/NotificationsTab/NotificationsTab';
import { PasswortTab } from './_components/PasswordTab/PasswordTab';
import { data } from './constants';

interface Props {
  allNotifications: Notification[] | undefined;
  unseenNotifications: Notification[] | undefined;
}

export default function Settings({ allNotifications, unseenNotifications }: Props) {
  const activeSubscription = useAppSelector(selectActiveSubscription);
  const tabsItems = [
    {
      label: 'KYC',
      value: 'kyc',
    },
    {
      label: 'Password',
      value: 'password',
    },
    {
      label: (
        <div className="flex items-center gap-2">
          Notifications{' '}
          {isDefined(unseenNotifications) && unseenNotifications.length > 0 && (
            <div className="[mix-blend-mode:multiply]">
              <Badge size="sm" color="light-gray" content={unseenNotifications.length} />
            </div>
          )}
        </div>
      ),
      value: 'notifications',
    },
  ];
  const [{ value: initialTab }] = tabsItems;
  const [currentTab, setCurrentTab] = useState(initialTab);

  return (
    <div className="w-full overflow-visible pb-8 lg:px-2 lg:py-2">
      <div className="flex flex-col gap-4.5 lg:flex-row-reverse lg:justify-between">
        <div className="flex items-center justify-between lg:gap-3">
          {activeSubscription && (
            <div className="rounded-2 bg-white px-4 py-2.5 shadow-xs">
              <div className="text-sm font-semibold text-gray-700">
                {data.statusBadgeText} <span className="text-gray-800">{activeSubscription.toUpperCase()}</span>
              </div>
            </div>
          )}
          {/* TODO: uncomment and add modal */}
          {/* <Button size="md" color="secondary" content={data.upgradeButton} /> */}
        </div>
        <div className="py-1.5">
          <h1 className="text-display-xs font-semibold text-gray-900 lg:text-display-sm">{data.title}</h1>
        </div>
      </div>
      <div className="-mx-4 mb-6 mt-5 grow overflow-hidden lg:mx-0 lg:mt-7 lg:grow">
        <Tabs size="xs" items={tabsItems} current={currentTab} onSelect={setCurrentTab} />
      </div>
      {currentTab === 'kyc' && <KycTab />}
      {currentTab === 'password' && <PasswortTab />}
      {currentTab === 'notifications' && (
        <NotificationsTab allNotifications={allNotifications} unseenNotifications={unseenNotifications} />
      )}
    </div>
  );
}

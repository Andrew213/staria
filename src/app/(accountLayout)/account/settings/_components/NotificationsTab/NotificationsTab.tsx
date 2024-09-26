'use client';

import { useEffect } from 'react';

import { notificationsApi } from '@/api/NotificationsApi';
import type { Notification } from '@/api/types';
import { Message } from '@/lib/components/Message/Message';
import { isDefined } from '@/utils/validators';

import { notificationsCodes, notificationsData } from './constants';
import AlexandreAvatar from './mocked-avatar.png';

interface Props {
  allNotifications: Notification[] | undefined;
  unseenNotifications: Notification[] | undefined;
}

export function NotificationsTab({ allNotifications, unseenNotifications }: Props) {
  useEffect(() => {
    if (isDefined(unseenNotifications) && unseenNotifications.length > 0) {
      void notificationsApi.readNotifications(unseenNotifications);
    }
  }, [unseenNotifications]);

  return (
    <div>
      <h2 className="mb-1 text-lg font-semibold text-gray-900">{notificationsData.title}</h2>
      <p className="mb-6 font-rubik text-sm text-gray-600">{notificationsData.description}</p>
      <div className="overflow-hidden rounded-4 border border-gray-200 [&>div:last-child]:border-0">
        {allNotifications
          ?.toSorted((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
          .map(({ messageCode, isSeen, createdAt, id }) => (
            <Message
              key={id}
              /* TODO unmock user data */
              name="Alexandre Staria"
              id="Stariaswisspad"
              image={AlexandreAvatar.src}
              text={notificationsCodes[messageCode]}
              seen={isSeen}
              date={createdAt}
            />
          ))}
      </div>
    </div>
  );
}

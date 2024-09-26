import type { Metadata } from 'next';

import { notificationsApi } from '@/api/NotificationsApi';

import Settings from './Settings';

export const metadata: Metadata = {
  robots: { index: false },
};

export default async function Page() {
  const allNotifications = await notificationsApi.fetchAllNotifications();
  const unseenNotifications = await notificationsApi.fetchUnseenNotifications();

  return <Settings allNotifications={allNotifications} unseenNotifications={unseenNotifications} />;
}

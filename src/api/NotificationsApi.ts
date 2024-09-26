import { getSession } from 'next-auth/react';

import { auth } from '@/auth';

import type { Notification } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export class NotificationsApi {
  async fetchAllNotifications() {
    try {
      const session = await auth();

      if (!session) {
        return;
      }

      const response = await fetch(`${API_URL}/notification/me`, {
        headers: { Authorization: `Bearer ${session.sessionToken}` },
      });

      return (await response.json()) as Notification[];
    } catch (error) {
      console.error(error);
    }
  }

  async fetchUnseenNotifications() {
    try {
      const session = await auth();

      if (!session) {
        return;
      }

      const response = await fetch(`${API_URL}/notification/unseen`, {
        headers: { Authorization: `Bearer ${session.sessionToken}` },
      });

      return (await response.json()) as Notification[];
    } catch (error) {
      console.error(error);
    }
  }

  async readNotifications(notifications: Notification[]) {
    try {
      const session = await getSession();

      if (!session) {
        return;
      }

      await fetch(`${API_URL}/notification/seen`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.sessionToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: notifications.map(({ id }) => id) }),
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export const notificationsApi = new NotificationsApi();

import { useContext } from 'react';

import { NotificationContext } from './NotificationContext';

export interface NotificationType {
  isUserClosed: boolean | null | undefined | 'initializing';
  setIsUserClosed: (value: boolean) => void;
  notificationHeight: number;
  notificationRef: React.RefObject<HTMLDivElement>;
}

export const useNotification = (): NotificationType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a ProvideNotificationContext');
  }
  return context;
};

'use client';

import { useLocalStorageState } from 'ahooks';
import type { ReactNode } from 'react';
import { createContext, useEffect, useLayoutEffect, useRef, useState } from 'react';

import type { NotificationType } from './hooks';

export const NotificationContext = createContext<NotificationType | undefined>(undefined);

export function ProvideNotificationContext({ children, namespace }: { children: ReactNode; namespace: string }) {
  const [isUserClosed, setIsUserClosed] = useState<boolean | null | undefined | 'initializing'>('initializing');

  const [storageValue, setStorageValue] = useLocalStorageState<boolean | null | undefined>(`${namespace}:isUserClosed`);

  useEffect(() => {
    if (!storageValue) {
      setStorageValue(false);
      setIsUserClosed(false);
      return;
    }
    setIsUserClosed(storageValue);
  }, [storageValue]);

  useEffect(() => {
    if (isUserClosed !== 'initializing') {
      setStorageValue(isUserClosed);
    }
  }, [isUserClosed]);

  const [notificationHeight, setNotificationHeight] = useState(0);
  const notificationRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      if (notificationRef.current) {
        setNotificationHeight(isUserClosed ? 0 : notificationRef.current.offsetHeight);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [isUserClosed]);

  return (
    <NotificationContext.Provider value={{ isUserClosed, setIsUserClosed, notificationHeight, notificationRef }}>
      {children}
    </NotificationContext.Provider>
  );
}

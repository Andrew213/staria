'use client';
import { twJoin } from 'tailwind-merge';

import { CrossIcon } from '@/assets/icons';

import { useNotification } from '../hooks';

interface Props {
  content: React.ReactNode;
}

export function NotificationNavbar({ content }: Props) {
  const { isUserClosed, setIsUserClosed } = useNotification();

  const hideNavbar = isUserClosed === true || isUserClosed === 'initializing';

  const handleCloseIconClick = () => {
    setIsUserClosed(true);
  };

  const { notificationHeight, notificationRef } = useNotification();

  return (
    <>
      <div
        className="relative transition-all duration-300"
        style={{
          height: !hideNavbar ? notificationHeight : 0,
        }}
      >
        <div
          ref={notificationRef}
          className={twJoin(
            'absolute left-0 top-0 z-50 w-full shrink-0 transition-transform duration-300',
            !hideNavbar ? 'translate-y-0' : '-translate-y-full',
          )}
        >
          <div className="relative border-b border-primary-300 bg-primary-25 py-2.5 pl-4 pr-2 text-md font-semibold text-primary-700 lg:px-2 lg:py-1.5 lg:text-center dark:bg-primary-500 dark:text-white [&_a]:font-rubik [&_a]:font-normal [&_a]:text-primary-600 [&_a]:underline dark:[&_a]:text-primary-200">
            <div className="flex items-center justify-between">
              <div className="lg:size-10" />
              <div className="grow justify-self-center py-1.5 lg:p-0">{content}</div>
              <div
                onClick={handleCloseIconClick}
                className="size-10 shrink-0 cursor-pointer self-start p-3.5 text-primary-500 dark:text-white"
              >
                <CrossIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

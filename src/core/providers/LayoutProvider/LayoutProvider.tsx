'use client';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { plansData } from '@/app/(accountLayout)/account/membership/constants';
import { Header, ManagerModal } from '@/app/_components';
import { Modal } from '@/app/_shared';
import { ProvideNotificationContext } from '@/features/notificationNavbar/NotificationContext';
import { useAppSelector } from '@/redux/hooks';
import { selectIsUserManager } from '@/redux/userSlice';
import { routes, unProtectedRoutes } from '@/routes';

import { MembershipProvider } from '../MembershipProvider';

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();
  const isAuthorized = !unProtectedRoutes.find((el) => el === path);
  const isUserManager = useAppSelector(selectIsUserManager);
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false);

  const session = useSession();

  useEffect(() => {
    const isManager = localStorage.getItem('showManagerNotification');
    if (!isManager && isUserManager && session.status === 'authenticated') {
      setIsManagerModalOpen(true);
      localStorage.setItem('showManagerNotification', 'false');
    }
  }, [session]);

  const isCompanyPage = path.startsWith(routes.community.getRoutePath());

  return (
    <MembershipProvider plansData={plansData}>
      <ProvideNotificationContext namespace={isCompanyPage ? 'companyNotificationNavbar' : 'notificationNavbar'}>
        {isAuthorized && <Header />}

        {children}

        {isManagerModalOpen && (
          <Modal
            closeButtonIsShown={false}
            onClose={() => {
              setIsManagerModalOpen(false);
            }}
          >
            <ManagerModal setCloseModal={setIsManagerModalOpen} />
          </Modal>
        )}
      </ProvideNotificationContext>
    </MembershipProvider>
  );
};

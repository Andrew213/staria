import type { Metadata } from 'next';

import { UserProvider } from '@/core/providers';

import Referral from './Referral';

export const metadata: Metadata = {
  robots: { index: false },
};

export default function Page() {
  return (
    <UserProvider>
      <Referral />
    </UserProvider>
  );
}

import type { Metadata } from 'next';

import Memberships from './Membership';

export const metadata: Metadata = {
  robots: { index: false },
};

export default function Page() {
  return <Memberships />;
}

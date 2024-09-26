import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { routes } from '@/routes';

export const metadata: Metadata = {
  robots: { index: false },
};

export default function Page() {
  redirect(routes.account.referral.getRedirectPath());
}

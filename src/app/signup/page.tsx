import type { Metadata } from 'next';
import { Suspense } from 'react';

import { SignUpWrapper } from '@/features/auth';
import { Loading } from '@/lib/components';
import { routes } from '@/routes';

export const metadata: Metadata = {
  title: 'Sign Up for Staria',
  description:
    'Enjoy access to exclusive investment rounds in crypto & web3 ➤ Registration is quick and secure—get started now!',
  openGraph: {
    title: 'Sign Up for Staria',
    description:
      'Enjoy access to exclusive investment rounds in crypto & web3 ➤ Registration is quick and secure—get started now!',
    siteName: 'Staria Swisspad',
    images: [
      {
        url: 'https://cdn.staria.network/assets/metadata_social.jpg',
      },
    ],
    locale: 'en_US',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${routes.signup.getRedirectPath()}`,
  },
};

export default function SignUp() {
  return (
    <Suspense fallback={<Loading />}>
      <SignUpWrapper />
    </Suspense>
  );
}

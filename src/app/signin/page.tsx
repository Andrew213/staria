import { Suspense } from 'react';

import { SignInWrapper } from '@/features/auth';
import { Loading } from '@/lib/components';
import { routes } from '@/routes';

export const metadata = {
  title: 'Log In to Staria',
  description:
    'Access your Staria account to manage your investments, view transaction history, and update your settings. Stay connected to the latest offerings in crypto & web3',
  openGraph: {
    title: 'Log In to Staria',
    description:
      'Access your Staria account to manage your investments, view transaction history, and update your settings. Stay connected to the latest offerings in crypto & web3',
    siteName: 'Staria Swisspad',
    images: [
      {
        url: 'https://cdn.staria.network/assets/metadata_social.jpg',
      },
    ],
    locale: 'en_US',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${routes.signin.getRedirectPath()}`,
  },
};

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <SignInWrapper />
    </Suspense>
  );
}

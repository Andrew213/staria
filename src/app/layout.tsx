import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import { twJoin } from 'tailwind-merge';
import 'react-toastify/dist/ReactToastify.css';

import { StoreProvider, AuthProvider, Web3Provider, UserProvider } from '@/core/providers';

import '../polyfills';

import { ruberoid, rubik } from './_fonts';

import './globals.css';

export const metadata: Metadata = {
  title: 'Staria: The Web3 Swisspad for Compliant Token Sales',
  description:
    'Discover our token-free, fair access Swisspad › Participate in exclusive offerings in crypto ✓ IDOs ✓ private & public rounds ✓ Swiss AML compliant',
  openGraph: {
    title: 'Staria: The Web3 Swisspad for Compliant Token Sales',
    description:
      'Discover our token-free, fair access launchpad › Participate in exclusive offerings in crypto ✓ IDOs ✓ private & public rounds ✓ Swiss AML compliant',
    url: 'https://staria.network',
    siteName: 'Staria Swisspad',
    images: [
      {
        url: 'https://cdn.staria.network/assets/metadata_social.jpg',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staria: The Web3 Swisspad for Compliant Token Sales',
    description:
      'Discover our token-free, fair access Swisspad › Participate in exclusive offerings in crypto ✓ IDOs ✓ private & public rounds ✓ Swiss AML compliant',
    creator: '@StariaSwisspad',
    images: ['https://cdn.staria.network/assets/metadata_social.jpg'],
  },
  icons: {
    icon: {
      url: '/favicon.ico',
      type: 'image/x-icon',
      sizes: '256x256',
    },
    other: {
      url: '/safari-pinned-tab.svg',
      rel: 'mask-icon',
      color: '#5bbad5',
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#fff',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html className={twJoin(ruberoid.variable, rubik.variable, 'h-full scroll-smooth')} lang="en">
      <body className="flex h-full flex-col bg-white font-ruberoid dark:bg-midnight">
        <AuthProvider>
          <Web3Provider>
            <StoreProvider>
              <UserProvider>
                <ToastContainer hideProgressBar autoClose={2000} closeButton={false} />
                {children}
              </UserProvider>
            </StoreProvider>
          </Web3Provider>
        </AuthProvider>

        {process.env.NEXT_PUBLIC_NODE_ENV === 'production' && (
          <>
            <GoogleTagManager gtmId="G-V50S9YK6J7" />
            <GoogleAnalytics gaId="G-V50S9YK6J7" />
            <Script id="hotjar">
              {`(function (h, o, t, j, a, r) {
                  h.hj =
                    h.hj ||
                    function () {
                      (h.hj.q = h.hj.q || []).push(arguments);
                    };
                  h._hjSettings = { hjid: 5028978, hjsv: 6 };
                  a = o.getElementsByTagName('head')[0];
                  r = o.createElement('script');
                  r.async = 1;
                  r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
                  a.appendChild(r);
                })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

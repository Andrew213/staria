import type { Metadata } from 'next';

import { CtaCardSection } from '@/app/_shared';
import { routes } from '@/routes';

import { ContactUsSection, MapSection } from './_components';

export const metadata: Metadata = {
  title: 'Reach Out to Staria',
  description: 'Apply to launch your startup, ask for support, or explore business development opportunities with us.',
  openGraph: {
    title: 'Reach Out to Staria',
    description:
      'Apply to launch your startup, ask for support, or explore business development opportunities with us.',
    images: [
      {
        url: 'https://cdn.staria.network/assets/metadata_social.jpg',
      },
    ],
    locale: 'en_US',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${routes.contact.getRedirectPath()}`,
  },
};

export default function Contact() {
  return (
    <div>
      <MapSection />
      <ContactUsSection />
      <CtaCardSection />
    </div>
  );
}

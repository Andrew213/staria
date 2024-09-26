import type { Metadata } from 'next';

import { routes } from '@/routes';

import { MetricsSection, PhilosophyContentSection, TeamSection, Values } from './_components';

export const metadata: Metadata = {
  title: 'About Staria',
  description:
    'Our platform connects you with over 100 leading venture capitals and market innovators ✓ transparent & fair ✓ Swiss AML compliant',
  openGraph: {
    title: 'About Staria',
    description:
      'Our platform connects you with over 100 leading venture capitals and market innovators ✓ transparent & fair ✓ Swiss AML compliant',
    images: [
      {
        url: 'https://cdn.staria.network/assets/metadata_social.jpg',
      },
    ],
    locale: 'en_US',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${routes.about.getRedirectPath()}`,
  },
};

export default function About() {
  return (
    <div>
      <MetricsSection />
      <PhilosophyContentSection />
      <Values />
      <TeamSection />
    </div>
  );
}

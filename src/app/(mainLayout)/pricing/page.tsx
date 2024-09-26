import type { Metadata } from 'next';

import { faqApi } from '@/api/FaqApi';
import {
  CtaSection,
  LogosSection,
  HeaderSection,
  EarlyBirdCard,
  SubscriptionPlanTable,
  data as pricesData,
  subscriptionTableRows,
} from '@/app/_shared';
import { routes } from '@/routes';

import { FaqSection } from './_components';
import { data } from './constants';

const { subheading, heading, supportingText } = data;

export const metadata: Metadata = {
  title: 'Staria Pricing Tiers: Transparent & Rewarding',
  description:
    'Choose the subscription plan for your investment needs › Basic, Genesis, Genesis+  ✓ profit sharing  ✓ guaranteed allocations ',
  openGraph: {
    title: 'Staria Pricing Tiers: Transparent & Rewarding',
    description:
      'Choose the subscription plan for your investment needs › Basic, Genesis, Genesis+  ✓ profit sharing  ✓ guaranteed allocations ',
    siteName: 'Staria Swisspad',
    images: [
      {
        url: 'https://cdn.staria.network/assets/metadata_social.jpg',
      },
    ],
    locale: 'en_US',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${routes.pricing.getRedirectPath()}`,
  },
};

export default async function Pricing() {
  const populateFaqs = await faqApi.getPopulateFaqsByPage(routes.pricing.getElementKey());

  return (
    <div className="flex flex-col items-center">
      <HeaderSection subheading={subheading} heading={heading} supportingText={supportingText} />
      <SubscriptionPlanTable planData={pricesData} tableRows={subscriptionTableRows} />
      <div className="w-full max-w-screen-sm lg:max-w-screen-xl lg:pt-14">
        <EarlyBirdCard />
      </div>
      <LogosSection />
      <FaqSection populateFaqs={populateFaqs} />
      <CtaSection />
    </div>
  );
}

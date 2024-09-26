import type { Metadata } from 'next';

import { faqApi } from '@/api/FaqApi';
import { FaqSectionWrapper } from '@/app/_shared';
import { PopulateFaqs } from '@/features/faq';
import { routes } from '@/routes';

import { Hero, HowItWorks, TopCard, SubscriptionPlan } from './_components';

export const metadata: Metadata = {
  title: 'Earn More with Referral Rewards on Staria',
  description:
    'Join our vibrant network and turn your connections into rewards with our multi-tiered Referral Rewards. ',
  openGraph: {
    title: 'Earn More with Referral Rewards on Staria',
    description:
      'Join our vibrant network and turn your connections into rewards with our multi-tiered Referral Rewards. ',
    images: [
      {
        url: 'https://cdn.staria.network/assets/metadata_social.jpg',
      },
    ],
    locale: 'en_US',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${routes.earn.getRedirectPath()}`,
  },
};

export default async function Referral() {
  // TODO ask the endpoint
  const populateFaqs = await faqApi.getPopulateFaqsByPage('home');

  return (
    <div className="flex flex-col items-center">
      <Hero />
      <div className="mt-[-150px] max-w-[600px] px-4 pb-4 lg:mt-[-200px] lg:w-full lg:max-w-screen-xl lg:px-8 lg:pb-8">
        <TopCard />
      </div>
      <div className="max-w-[600px] p-4 lg:w-full lg:max-w-screen-xl lg:px-8 lg:py-10">
        <HowItWorks />
      </div>

      <SubscriptionPlan />

      <FaqSectionWrapper>
        <PopulateFaqs populateFaqs={populateFaqs} />
      </FaqSectionWrapper>
    </div>
  );
}

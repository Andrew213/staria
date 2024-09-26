import type { Metadata } from 'next';
import Link from 'next/link';

import { faqApi } from '@/api/FaqApi';
import { CtaCardSection, KolCard } from '@/app/_shared';
import { DiscoverFaqs, FaqCategories } from '@/features/faq';
import { routes } from '@/routes';

import { IntroSection, GetInTouchSection } from './_components';
import { data } from './constants';

const { heading, supportingText, link } = data;

export const metadata: Metadata = {
  title: 'Staria FAQs: Your Questions Answered on our Launchpad',
  description:
    'Discover everything from our due diligence processes to investment benefits, ensuring you make informed decisions with confidence.',
  openGraph: {
    title: 'Staria FAQs: Your Questions Answered on our Launchpad',
    description:
      'Discover everything from our due diligence processes to investment benefits, ensuring you make informed decisions with confidence.',
    siteName: 'Staria Swisspad',
    images: [
      {
        url: 'https://cdn.staria.network/assets/metadata_social.jpg',
      },
    ],
    locale: 'en_US',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${routes.faq.getRedirectPath()}`,
  },
};

export default async function Faq() {
  const faqs = await faqApi.getAllFaq();
  const heroFaqs = await faqApi.getHeroFaqs();
  const populateFaqs = await faqApi.getPopulateFaqsByPage('faq');

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/faq.jpeg)] bg-cover bg-center bg-no-repeat px-8 py-18 text-left sm:bg-custom-140 lg:text-center">
        <h2 className="mb-6 text-left text-display-md font-semibold tracking-display-md text-white xl:text-center xl:text-display-lg xl:tracking-display-lg">
          {heading}
        </h2>
        <p className="mb-10 max-w-screen-md text-left font-rubik text-xl font-normal text-gray-200 lg:text-center">
          {supportingText}
        </p>
        <Link href={link.href} className="rounded-2 bg-black px-5 py-3 text-md font-semibold text-white">
          {link.text}
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <IntroSection faqs={heroFaqs} />
        <div className="flex w-full max-w-screen-xl flex-col gap-12 px-4 py-16 lg:gap-16 lg:px-8 lg:py-24">
          <DiscoverFaqs faqs={populateFaqs} />
          <GetInTouchSection />
        </div>
        <div className="w-full max-w-screen-sm px-4 lg:max-w-screen-xl lg:px-8">
          <KolCard />
          <FaqCategories faqs={faqs} />
        </div>
      </div>
      <CtaCardSection />
    </>
  );
}

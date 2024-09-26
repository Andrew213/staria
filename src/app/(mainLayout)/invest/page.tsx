import type { Metadata } from 'next';

import dealsApi from '@/api/DealsApi';
import { routes } from '@/routes';
import { isDefined } from '@/utils';

import { MadeIn, Plans, ProductCard, ProjectsHero, StepsSliderWrapper, UpcomingOpportunities } from '../../_shared';

export const metadata: Metadata = {
  title: 'Access the Best Token Presales in Web3',
  description:
    'Join Staria & discover investment opportunities in top-tier Web3 projects › Secure your spot in token presales & unlock access to exclusive launch deals.',
  openGraph: {
    title: 'Access the Best Token Presales in Web3',
    description:
      'Join Staria & discover investment opportunities in top-tier Web3 projects › Secure your spot in token presales & unlock access to exclusive launch deals.',
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/${routes.invest.getRoutePath()}`,
    siteName: 'Staria Swisspad',
    images: [
      {
        url: 'https://cdn.staria.network/assets/metadata_social.jpg',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default async function Page() {
  const { data: deals } = await dealsApi.fetchDeals();
  const featuredProjectData = deals?.filter((x) => x.isFeatured)?.[0];

  return (
    <div className="flex flex-col items-center overflow-hidden">
      <ProjectsHero />
      <div className="w-full max-w-screen-sm px-4 lg:max-w-screen-xl lg:px-8">
        {featuredProjectData && (
          <div className="mb-8 mt-[-300px] lg:mt-[-380px]">
            <ProductCard project={featuredProjectData} />
          </div>
        )}
        {isDefined(deals) && deals.length > 1 && (
          <UpcomingOpportunities className="pb-10 pt-20 lg:gap-12 lg:py-24" title="Upcoming Deals" />
        )}
      </div>
      <div className="w-full max-w-screen-sm lg:max-w-screen-xl">
        <StepsSliderWrapper />
        <MadeIn />
        <Plans />
      </div>
    </div>
  );
}

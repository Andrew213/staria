import type { Metadata } from 'next';

import { faqApi } from '@/api/FaqApi';
import { postsApi } from '@/api/PostsApi';
import { CtaSection, LogosSection, Plans, MadeIn, UpcomingOpportunities } from '@/app/_shared';

import { Commitment, Features, IntroSection, FaqSection, TeamTrackRecords, PostsSlider } from '../_components';

export const metadata: Metadata = {
  title: 'Staria: The Web3 Swisspad for Compliant Token Presales',
};

export default async function Home() {
  const faqs = await faqApi.getPopulateFaqsByPage('home');
  const posts = await postsApi.getPostsShortInfo(
    {
      sort: 'recent',
      include: 'tags',
      tagSlug: 'Homepage',
    },
    true,
  );

  return (
    <>
      <div className="flex flex-col items-center">
        <IntroSection />
        <LogosSection />
      </div>
      <Commitment />
      <UpcomingOpportunities
        className="mx-auto max-w-screen-xl px-4 pt-16 lg:px-8 lg:pt-24"
        titleClassName="max-w-[833px]"
        subtitleClassName="max-w-[833px]"
      />
      <div className="flex flex-col items-center overflow-hidden">
        <PostsSlider posts={posts} />
      </div>
      <Features />
      <div className="flex flex-col items-center pt-8">
        <MadeIn />
        <Plans />
      </div>
      <TeamTrackRecords />
      <div className="flex flex-col items-center">
        <CtaSection />
        <FaqSection faqs={faqs} />
      </div>
    </>
  );
}

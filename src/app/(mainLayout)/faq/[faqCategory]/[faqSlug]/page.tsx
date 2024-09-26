import { notFound } from 'next/navigation';

import { faqApi } from '@/api/FaqApi';
import { KolCard } from '@/app/_shared';
import { FaqDetail } from '@/features/faq';
import { routes } from '@/routes';
import { toKebabCase } from '@/utils';

import { DiscoverSection } from './_components';

export default async function Page({ params }: RouteParams) {
  const populateFaqs = await faqApi.getFaqsByCategory(params.faqCategory);
  const faqDetail = await faqApi.getFaqBySlug(params.faqSlug);

  if (!faqDetail) {
    notFound();
  }

  const filteredPopulateFaqs = populateFaqs.filter((faq) => faq.id !== faqDetail.id).sort((a, b) => a.order - b.order);

  return (
    <>
      <FaqDetail faqDetail={faqDetail} />
      {!!filteredPopulateFaqs.length && <DiscoverSection faqs={filteredPopulateFaqs} />}
      <KolCard />
    </>
  );
}

interface RouteParams {
  params: { faqCategory: string; faqSlug: string };
}

export async function generateMetadata({ params }: RouteParams) {
  const faqDetail = await faqApi.getFaqBySlug(params.faqSlug);

  if (faqDetail) {
    const { title, subtitle: description } = faqDetail;
    return {
      title: `Staria FAQs: ${title}`,
      description,
      openGraph: {
        title: `Staria FAQs: ${title}`,
        description,
        siteName: 'Staria Swisspad',
        images: [
          {
            url: 'https://cdn.staria.network/assets/metadata_social.jpg',
          },
        ],
        locale: 'en_US',
        type: 'website',
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}${routes.faq.getRedirectPath()}/${params.faqCategory}/${params.faqSlug}`,
      },
    };
  }
}

export async function generateStaticParams() {
  return (await faqApi.getAllFaq()).map(({ faqSlug, category }) => ({
    faqCategory: category ? toKebabCase(category) : '',
    faqSlug: faqSlug ?? '',
  }));
}

export const dynamicParams = false;

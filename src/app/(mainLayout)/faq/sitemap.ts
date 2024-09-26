import type { MetadataRoute } from 'next';

import { faqApi } from '@/api/FaqApi';
import { routes } from '@/routes';
import { generateSiteMap } from '@/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const faqs = await faqApi.getAllFaq();
  const faq = generateSiteMap(routes.faq.getRedirectPath(), 0.8);

  const faqsSitemap = faqs.map(({ category, faqSlug }) => {
    const categoryWithoutSpace = category?.replace(/\s+/g, '-').toLocaleLowerCase();
    return generateSiteMap(`${routes.faq.getRedirectPath()}/${categoryWithoutSpace}/${faqSlug}`, 0.64);
  });

  return [faq, ...faqsSitemap];
}

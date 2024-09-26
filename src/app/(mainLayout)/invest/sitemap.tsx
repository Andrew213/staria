import type { MetadataRoute } from 'next';

import dealsApi from '@/api/DealsApi';
import { routes } from '@/routes';
import { generateSiteMap } from '@/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: deals } = await dealsApi.fetchDeals();
  const launchpad = generateSiteMap(routes.invest.getRedirectPath(), 0.8);

  const projectsMap =
    deals?.map(({ slug, type }) => {
      return generateSiteMap(`${routes.research.getRedirectPath()}/${slug}/${type}`, 0.7);
    }) ?? [];

  return [launchpad, ...projectsMap];
}

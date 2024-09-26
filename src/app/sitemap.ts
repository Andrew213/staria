import type { MetadataRoute } from 'next';

import { routes } from '@/routes';
import { generateSiteMap } from '@/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const main = generateSiteMap(`/`, 1);
  const about = generateSiteMap(routes.about.getRedirectPath(), 0.8);

  const pricing = generateSiteMap(routes.pricing.getRedirectPath(), 0.8);
  const contacts = generateSiteMap(routes.contact.getRedirectPath(), 0.8);
  const earn = generateSiteMap(routes.earn.getRedirectPath(), 0.8);

  return [main, about, pricing, contacts, earn];
}

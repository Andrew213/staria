import type { MetadataRoute } from 'next';

export const generateSiteMap = (path: string, priority: number): MetadataRoute.Sitemap[0] => {
  const url = process.env.NEXT_PUBLIC_FRONTEND_URL;
  return {
    url: `${url}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: priority,
  };
};

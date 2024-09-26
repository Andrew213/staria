import type { MetadataRoute } from 'next';

import { postsApi } from '@/api/PostsApi';
import { routes } from '@/routes';
import { generateSiteMap } from '@/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await postsApi.getPosts();
  const resource = generateSiteMap(routes.resources.getRedirectPath(), 0.8);

  const postsSiteMap = posts.map(({ slug }) => {
    return generateSiteMap(`${routes.resources.getRedirectPath()}/${slug}`, 0.64);
  });

  return [resource, ...postsSiteMap];
}

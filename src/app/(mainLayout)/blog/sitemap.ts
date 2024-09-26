import type { MetadataRoute } from 'next';

import { postsApi } from '@/api/PostsApi';
import { routes } from '@/routes';
import { generateSiteMap } from '@/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await postsApi.getPosts(true);
  const blog = generateSiteMap(routes.blog.getRedirectPath(), 0.8);

  const postsSiteMap = posts.map(({ slug }) => {
    return generateSiteMap(`${routes.blog.getRedirectPath()}/${slug}`, 0.64);
  });

  return [blog, ...postsSiteMap];
}

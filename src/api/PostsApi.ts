import type { GhostError, Params } from '@tryghost/content-api';

import type { Post, PostShortInfoWithTags, PostsShortInfo } from '@/types';

import { convertRawFeaturedPost, convertRawPost, convertRawPostsShortInfo } from './converters/posts';
import type { PostsShortInfoWithTagsRaw, PostRaw, PostsShortInfoWithMetaRaw, PostsParams } from './types';

const GHOST_BLOG_URL = process.env.NEXT_PUBLIC_GHOST_BLOG_URL;
const GHOST_RESOURCES_URL = process.env.NEXT_PUBLIC_GHOST_RESOURCES_URL;
const GHOST_KEY = process.env.NEXT_PUBLIC_GHOST_KEY;

class PostsApi {
  public async getPosts(isBlog?: boolean) {
    try {
      const response = await fetch(
        `${isBlog ? GHOST_BLOG_URL : GHOST_RESOURCES_URL}/ghost/api/content/posts/?key=${GHOST_KEY}&include=tags,authors`,
      );

      const data = (await response.json()) as GhostError | { posts: PostRaw[] };

      if ('errors' in data) {
        throw new Error(data.errors.map((error) => JSON.stringify(error)).join('; '));
      }

      return data.posts.map((x) => convertRawPost(x, x.slug));
    } catch (err) {
      throw new Error(err as string);
    }
  }

  public async getPost(slug: string, isBlog?: boolean): Promise<Post> {
    try {
      const response = await fetch(
        `${isBlog ? GHOST_BLOG_URL : GHOST_RESOURCES_URL}/ghost/api/content/posts/slug/${slug}/?key=${GHOST_KEY}&slug=${slug}&include=tags,authors`,
      );

      const data = (await response.json()) as GhostError | { posts: PostRaw[] };

      if ('errors' in data) {
        throw new Error(data.errors.map((error) => JSON.stringify(error)).join('; '));
      }

      return convertRawPost(data.posts[0], slug);
    } catch (err) {
      throw new Error(err as string);
    }
  }

  public async getFeaturedPostShortInfo(isBlog?: boolean): Promise<PostShortInfoWithTags | null> {
    try {
      const response = await fetch(
        `${isBlog ? GHOST_BLOG_URL : GHOST_RESOURCES_URL}/ghost/api/content/posts/?key=${GHOST_KEY}&fields=id,slug,title,excerpt,published_at,feature_image,feature_image_alt&include=tags&filter=featured%3Atrue`,
      );

      const data = (await response.json()) as GhostError | { posts: PostsShortInfoWithTagsRaw };

      if ('errors' in data) {
        console.error(data.errors.map((error) => JSON.stringify(error)).join('; '));
        return null;
      }

      if (!data.posts || !data.posts[0]) {
        console.error('No featured post');
        return null;
      }

      return convertRawFeaturedPost(data.posts[0]);
    } catch (err) {
      throw new Error(err as string);
    }
  }

  public async getPostsShortInfo(options: PostsParams = {}, isBlog?: boolean): Promise<PostsShortInfo> {
    const fields = 'id,slug,title,excerpt,published_at,feature_image,feature_image_alt';

    const { page, limit, tagSlug, sort, include } = options;

    const params: Params = {
      include,
      fields,
      page,
      limit,
      filter: tagSlug ? `tag:${options.tagSlug}` : undefined,
      order: sort ? (sort === 'a-z' ? 'slug ASC' : `published_at ${sort === 'oldest' ? 'ASC' : 'DESC'}`) : undefined,
    };

    Object.keys(params).forEach(
      (key) => params[key as keyof Params] === undefined && delete params[key as keyof Params],
    );

    const str = Object.entries(params).reduce((prev, [key, val]) => prev.concat(`&${key}=${val}`), '');

    try {
      const response = await fetch(
        `${isBlog ? GHOST_BLOG_URL : GHOST_RESOURCES_URL}/ghost/api/content/posts/?key=${GHOST_KEY}${str}`,
      );

      const data = (await response.json()) as GhostError | PostsShortInfoWithMetaRaw;

      if ('errors' in data) {
        throw new Error(data.errors.map((error) => JSON.stringify(error)).join('; '));
      }

      const {
        meta: {
          pagination: { page, pages },
        },
      } = data;

      if (page > pages) {
        throw new Error('Wrong page');
      }

      return convertRawPostsShortInfo(data.posts);
    } catch (err) {
      throw new Error(err as string);
    }
  }
}

export const postsApi = new PostsApi();

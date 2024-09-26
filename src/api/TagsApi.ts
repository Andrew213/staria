import type { GhostError } from '@tryghost/content-api';

import type { Tags } from '@/types';

import type { Tags as RawTags } from './types';

const GHOST_KEY = process.env.NEXT_PUBLIC_GHOST_KEY;
const GHOST_BLOG_URL = process.env.NEXT_PUBLIC_GHOST_BLOG_URL;
const GHOST_RESOURCES_URL = process.env.NEXT_PUBLIC_GHOST_RESOURCES_URL;

export class TagsApi {
  public async getTags(isBlog?: boolean): Promise<Tags> {
    try {
      const response = await fetch(
        `${isBlog ? GHOST_BLOG_URL : GHOST_RESOURCES_URL}/ghost/api/content/tags/?key=${GHOST_KEY}`,
      );

      const data = (await response.json()) as GhostError | { tags: RawTags };

      if ('errors' in data) {
        throw new Error(data.errors.map((error) => JSON.stringify(error)).join('; '));
      }

      const tags = data.tags.map(({ id, name, slug }) => ({
        id,
        slug,
        name: name ?? '',
      }));

      return tags;
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    }
  }
}

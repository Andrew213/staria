import type { PostOrPage } from '@tryghost/content-api';

import type { Post, PostsShortInfo } from '@/types';

import type { PostsShortInfoWithTagsRaw } from '../types';

export const convertRawPost = (post: PostOrPage, slug: string): Post => {
  const {
    reading_time,
    id,
    title,
    html,
    excerpt,
    published_at,
    feature_image,
    feature_image_alt,
    tags,
    primary_author,
    primary_tag,
    meta_title,
    meta_description,
    og_image,
  } = post;

  return {
    id,
    slug,
    html: html ?? '',
    title: title ?? '',
    excerpt: excerpt ?? '',
    published: published_at ? new Date(published_at).valueOf() : null,
    image: feature_image ?? '',
    imageAlt: feature_image_alt ?? '',
    readingTime: reading_time ?? 0,
    tags: tags ? tags.map(({ id, slug, name }) => ({ id, slug, name: name ?? '' })) : [],
    primaryTag: primary_tag
      ? {
          id: primary_tag.id,
          slug: primary_tag.slug,
          name: primary_tag.name ?? '',
        }
      : null,
    author: {
      id: primary_author?.id ?? '',
      slug: primary_author?.slug ?? '',
      url: primary_author?.url ?? '',
      name: primary_author?.name ?? '',
      profileImage: primary_author?.profile_image ?? '',
    },
    metaTitle: meta_title ?? '',
    metaDescription: meta_description ?? '',
    ogImage: og_image ?? '',
  };
};

export const convertRawPostsShortInfo = (posts: PostsShortInfoWithTagsRaw): PostsShortInfo => {
  return posts.map(({ id, title, slug, excerpt, published_at, feature_image, feature_image_alt, tags }) => ({
    id,
    slug,
    title: title ?? '',
    excerpt: (excerpt ?? '').substring(0, 121) + '...',
    published: published_at ? new Date(published_at).valueOf() : null,
    image: feature_image ?? '',
    imageAlt: feature_image_alt ?? '',
    tags: tags ? tags.map(({ id, slug, name }) => ({ id, slug, name: name ?? '' })) : [],
  }));
};

export const convertRawFeaturedPost = (post: PostsShortInfoWithTagsRaw[number]) => {
  const { id, title, slug, excerpt, published_at, feature_image, feature_image_alt, tags } = post;

  const featuredPostShortInfo = {
    id,
    slug,
    title: title ?? '',
    excerpt: excerpt ?? '',
    published: published_at ? new Date(published_at).valueOf() : null,
    image: feature_image ?? '',
    imageAlt: feature_image_alt ?? '',
    tags: tags ? tags.map(({ id, slug, name }) => ({ id, slug, name: name ?? '' })) : [],
  };

  return featuredPostShortInfo;
};

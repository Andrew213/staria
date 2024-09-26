'use client';

import cn from 'classnames';

import type { PostsShortInfo } from '@/types';

import { BlogPostCard } from './BlogPostCard';
import { blogPostsData } from '../constants';

interface Props {
  posts: PostsShortInfo;
  placement?: 'dense' | 'sparse';
  isBlog?: boolean;
}

export function BlogPostsGrid({ posts, placement = 'sparse', isBlog }: Props) {
  return (
    <div
      className={cn('grid gap-12 gap-x-8 pb-12 lg:grid-cols-2 lg:gap-y-16 lg:pb-16', {
        ['sm:grid-cols-2 lg:grid-cols-3']: placement === 'dense',
      })}
    >
      {posts.map(({ id, image, imageAlt, title, excerpt, slug }) => (
        <BlogPostCard
          key={id}
          image={image}
          imageAlt={imageAlt}
          title={title}
          isBlog={isBlog}
          description={excerpt}
          slug={slug}
          linkTitle={blogPostsData.linkText}
        />
      ))}
    </div>
  );
}

'use client';

import { Suspense } from 'react';

import NoSsr from '@/core/NoSsr/NoSsr';
import { PostContent } from '@/lib/components';
import type { Post, PostsShortInfo } from '@/types';

import { data } from './constants';
import { BlogPostIntro, BlogPostLatest, BlogPostSocials } from '../../components';

interface Props {
  post: Post;
  latestPosts: PostsShortInfo;
}

export function BlogPost({ latestPosts, post }: Props) {
  return (
    <>
      <BlogPostIntro post={post} />
      <div className="max-w-screen-xl px-4 lg:px-24">
        <Suspense>
          <PostContent
            postHtml={post.html}
            menu={{ title: data.menuTitle }}
            socialsSlot={<BlogPostSocials postTitle={post.title} />}
          />
        </Suspense>
      </div>

      <NoSsr>
        <BlogPostLatest posts={latestPosts} />
      </NoSsr>
    </>
  );
}

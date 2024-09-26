'use client';

import NoSsr from '@/core/NoSsr/NoSsr';
import { BlogPostsSection, FeaturedArticle } from '@/features/blogPosts';
import type { PostShortInfoWithTags, PostsShortInfo, Tags } from '@/types';

interface Props {
  posts: PostsShortInfo;
  totalPages: number;
  tags: Tags;
  featuredPost: PostShortInfoWithTags | null;
  isBlog?: boolean;
}

export function BlogSection({ posts, tags, featuredPost, totalPages, isBlog }: Props) {
  return (
    <div className="pb-24 xl:pb-16">
      <div className="m-auto flex max-w-screen-xl flex-col gap-12 xl:gap-16">
        {featuredPost && (
          <div className="px-4 lg:px-8">
            <FeaturedArticle isBlog={isBlog} post={featuredPost} />
          </div>
        )}
        <NoSsr>
          <BlogPostsSection isBlog={isBlog} posts={posts} tags={tags} totalPages={totalPages} />
        </NoSsr>
      </div>
    </div>
  );
}

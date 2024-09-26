'use client';

import NoSsr from '@/core/NoSsr/NoSsr';
import { useBreakpoint } from '@/lib/hooks';
import { routes } from '@/routes';
import type { PostShortInfoWithTags } from '@/types';

import { BlogPostCard, FeaturedCard } from '../../components';
import { blogPostsData, featuredArticleData } from '../../constants';

interface Props {
  post: PostShortInfoWithTags;
  isBlog?: boolean;
}

export function FeaturedArticle({ post, isBlog }: Props) {
  const { isAboveMd } = useBreakpoint('md');

  return (
    <NoSsr>
      {isAboveMd ? (
        <FeaturedCard
          href={
            isBlog
              ? routes.blog.blogSlug.getRedirectPath({ blogSlug: post.slug })
              : routes.resources.resourceSlug.getRedirectPath({ resourceSlug: post.slug })
          }
          heading={post.title}
          supportingText={post.excerpt}
          publish={{
            heading: featuredArticleData.publishHeading,
            date: post.published
              ? new Date(post.published).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })
              : '',
          }}
          categories={{
            heading: featuredArticleData.categoriesHeading,
            list: post.tags.map(({ name }) => name),
          }}
          image={post.image}
          imageAlt={post.imageAlt}
        />
      ) : (
        <BlogPostCard
          isBlog={isBlog}
          image={post.image}
          imageAlt={post.imageAlt}
          title={post.title}
          description={post.excerpt}
          slug={post.slug}
          linkTitle={blogPostsData.linkText}
        />
      )}
    </NoSsr>
  );
}

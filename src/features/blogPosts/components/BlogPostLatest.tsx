import { Button } from '@/lib/components';
import { useBreakpoint } from '@/lib/hooks';
import { routes } from '@/routes';
import type { PostsShortInfo } from '@/types';

import { BlogPostCard } from './BlogPostCard';
import { latestPostsData } from '../constants';

interface Props {
  posts: PostsShortInfo;
}

export function BlogPostLatest({ posts }: Props) {
  const { isBelowMd } = useBreakpoint('md');

  return (
    <div className="flex w-full max-w-screen-xl flex-col gap-12 px-4 py-16 lg:gap-16 lg:px-8 lg:py-24 xl:flex-row">
      <div className="flex grow flex-col items-start md:gap-10">
        <div className="flex flex-col gap-4 md:gap-5">
          <div className="flex flex-col gap-3">
            <p className="text-md font-semibold text-primary-700">{latestPostsData.topTitle}</p>
            <h3 className="text-display-md tracking-tight text-gray-900">{latestPostsData.title}</h3>
          </div>
          <p className="font-rubik text-lg text-gray-600">{latestPostsData.description}</p>
        </div>
        {!isBelowMd && (
          <Button
            href={routes.blog.getRedirectPath()}
            size="xl"
            color="secondary-gray"
            content={latestPostsData.buttonText}
            animate
          />
        )}
      </div>
      <div className="grid grow gap-12 md:grid-cols-2 lg:gap-8 xl:max-w-[704px]">
        {posts.map(({ id, image, imageAlt, title, excerpt, slug }) => (
          <BlogPostCard
            key={id}
            image={image}
            imageAlt={imageAlt}
            title={title}
            description={excerpt}
            slug={slug}
            linkTitle={latestPostsData.linkText}
            isBlog
          />
        ))}
      </div>
      {isBelowMd && (
        <Button
          href={routes.blog.getRedirectPath()}
          size="xl"
          color="secondary-gray"
          content={latestPostsData.buttonText}
          animate
        />
      )}
    </div>
  );
}

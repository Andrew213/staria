'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { InputDropdown, Pagination, Tabs } from '@/lib/components';
import type { PostsShortInfo, Tags } from '@/types';

import { sorts, paramNames } from './constants';
import { BlogPostsGrid } from '../../components';

interface Props {
  posts: PostsShortInfo;
  totalPages: number;
  tags: Tags;
  isBlog?: boolean;
}

export function BlogPostsSection({ posts, tags, totalPages, isBlog }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get(paramNames.page)) || 1;
  const currentCategory = searchParams.get(paramNames.category);
  const currentSort = searchParams.get(paramNames.sort);

  const tabsItems = [
    { label: 'View All', value: 'all', href: pathname },
    ...tags.map(({ name, slug }) => ({
      label: name,
      value: slug,
      href: `${pathname}?${paramNames.category}=${slug}`,
    })),
  ];

  const sortItems = sorts.map(({ label, value }) => ({
    label,
    value,
    href: `${pathname}?${currentCategory ? `${paramNames.category}=${currentCategory}&` : ''}${paramNames.sort}=${value}`,
  }));

  return (
    <div className="flex flex-col gap-12 xl:gap-16">
      <div className="flex flex-col items-start gap-8 px-0 lg:flex-row lg:items-end lg:px-8">
        <div className="w-full overflow-hidden lg:grow">
          <Tabs items={tabsItems} current={currentCategory ?? 'all'} />
        </div>
        <div className="w-full max-w-screen-sm px-4 lg:max-w-screen-xs lg:px-0">
          <InputDropdown items={sortItems} current={currentSort ?? 'recent'} placeholder="Select filter" />
        </div>
      </div>

      <div className="px-4 lg:px-8">
        <BlogPostsGrid posts={posts} isBlog={isBlog} placement="dense" />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            current={currentPage}
            uriParams={{
              pathname,
              paramName: paramNames.page,
              searchParams: currentCategory ? `${paramNames.category}=${currentCategory}` : '',
            }}
          />
        )}
      </div>
    </div>
  );
}

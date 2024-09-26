import { notFound } from 'next/navigation';

import { faqApi } from '@/api/FaqApi';
import { postsApi } from '@/api/PostsApi';
import { TagsApi } from '@/api/TagsApi';
import { CtaCardSection } from '@/app/_shared';
import { MAX_ITEMS } from '@/features/blogPosts/containers/BlogPostsSection/constants';
import { sortingFunctions } from '@/features/blogPosts/utils';
import { routes } from '@/routes';
import type { PostsShortInfo } from '@/types';

import { BlogSection, FaqSection, HeaderSection } from '../blog/_components';

interface SearchParams {
  page?: string;
  category?: string;
  sort?: string;
}

interface GenerateMetadataParams {
  searchParams: SearchParams;
}

export async function generateMetadata({ searchParams }: GenerateMetadataParams) {
  const page = parseInt(searchParams.page ?? '1');
  const category = searchParams.category ?? 'all';

  const posts1 = await postsApi.getPostsShortInfo({
    sort: 'recent',
    include: 'tags',
  });

  const posts = [...posts1, ...posts1];

  const filteredByTagPosts =
    category !== 'all' ? posts.filter((x) => x.tags.some((t) => t.name.toLowerCase() === category)) : posts;

  const totalPages = Math.ceil(filteredByTagPosts.length / MAX_ITEMS);
  const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}${routes.blog.getRoutePath()}`;

  return {
    title: `Staria Launchpad Blog - Page ${page}`,
    description: `Explore more Articles on page ${page}.`,
    alternates: {
      canonical: `/resources?category=${category}&page=${page}`,
      prev: page > 1 ? `/resources?category=${category}&page=${page - 1}` : null,
      next: page < totalPages ? `/resources?category=${category}&page=${page + 1}` : null,
    },
    openGraph: {
      url,
      images: [
        {
          url: 'https://cdn.staria.network/assets/metadata_social.jpg',
        },
      ],
      title: `Staria Launchpad Resources - Page ${page}`,
      description: `Explore more Articles on page ${page}.`,
      locale: 'en_US',
      type: 'website',
    },
  };
}

const tagsApi = new TagsApi();

export default async function Resources({ searchParams }: { searchParams: SearchParams }) {
  const page = searchParams.page ?? 1;
  const category = searchParams.category ?? 'all';
  const sort = searchParams.sort;

  const sortingFunction = sort
    ? sortingFunctions[sort as keyof typeof sortingFunctions]
    : (posts: PostsShortInfo) => posts;

  const posts = await postsApi.getPostsShortInfo({
    sort: 'recent',
    include: 'tags',
  });

  const filteredByTagPosts =
    category !== 'all' ? posts.filter((x) => x.tags.some((t) => t.name.toLowerCase() === category)) : posts;

  const sortedPosts = sort ? sortingFunction(filteredByTagPosts) : filteredByTagPosts;

  const startIndex = (Number(page || 1) - 1) * MAX_ITEMS;
  const endIndex = startIndex + MAX_ITEMS;
  const currentPagePosts = sortedPosts.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedPosts.length / MAX_ITEMS);

  if (currentPagePosts.length === 0) {
    notFound();
  }

  const tags = await tagsApi.getTags();
  const featuredPost = await postsApi.getFeaturedPostShortInfo();
  const populateFaqs = await faqApi.getPopulateFaqsByPage('home');

  return (
    <div>
      <HeaderSection />
      <BlogSection posts={currentPagePosts} totalPages={totalPages} tags={tags} featuredPost={featuredPost} />
      <FaqSection populateFaqs={populateFaqs} />
      <CtaCardSection />
    </div>
  );
}

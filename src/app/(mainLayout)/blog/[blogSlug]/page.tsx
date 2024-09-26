import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import { postsApi } from '@/api/PostsApi';
import { CtaSection } from '@/app/_shared';
import { BlogPost } from '@/features/blogPosts';
import { routes } from '@/routes';

interface RouteParams {
  params: { blogSlug: string };
}

export async function generateMetadata({ params }: RouteParams, parent: ResolvingMetadata): Promise<Metadata> {
  const slug = params.blogSlug;
  const url = `${process.env.NEXT_PUBLIC_FRONTEND_URL}${routes.blog.getRedirectPath()}/${params.blogSlug}`;

  try {
    const post = await postsApi.getPost(slug, true);

    const previousImages = (await parent).openGraph?.images ?? [];

    return {
      title: post.metaTitle || post.title || '',
      description: post.metaDescription || post.excerpt || '',
      openGraph: {
        type: 'website',
        url,
        title: post.metaTitle || '',
        description: post.metaDescription || '',
        images: [post.ogImage || '', ...previousImages],
      },
    };
  } catch (error) {
    console.error('Error fetching post metadata:', error);
    return {
      title: 'Error',
      description: 'Unable to fetch post metadata',
    };
  }
}

export default async function Page({ params }: RouteParams) {
  try {
    const latestPosts = await postsApi.getPostsShortInfo({ page: 1, limit: 2 }, true);
    const post = await postsApi.getPost(params.blogSlug, true);

    if (!post) {
      console.error('Post not found:', params.blogSlug);

      notFound();
    }

    return (
      <div className="flex flex-col items-center">
        <BlogPost post={post} latestPosts={latestPosts} />
        <CtaSection />
      </div>
    );
  } catch (error) {
    console.error('Error fetching posts:', error);

    return (
      <div className="flex flex-col items-center">
        <div className="max-w-screen-xl px-4 py-14 lg:px-8 lg:py-16">
          <p>Something went wrong</p>
        </div>
      </div>
    );
  }
}

export async function generateStaticParams() {
  try {
    return (await postsApi.getPosts(true)).map(({ slug }) => ({ blogSlug: slug }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export const dynamicParams = false;

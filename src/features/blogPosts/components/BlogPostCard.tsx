import cn from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { routes } from '@/routes';

import { ReadLink } from './ReadLink';

interface Props {
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  slug: string;
  linkTitle: string;
  smallPicture?: boolean;
  isBlog?: boolean;
}

export function BlogPostCard({ image, smallPicture, imageAlt, title, description, slug, linkTitle, isBlog }: Props) {
  const router = useRouter();

  const handleCardClick = useCallback(
    (link: string) => {
      router.push(link);
    },
    [router],
  );

  return (
    <div
      onClick={() =>
        handleCardClick(
          isBlog
            ? routes.blog.blogSlug.getRedirectPath({ blogSlug: slug })
            : routes.resources.resourceSlug.getRedirectPath({ resourceSlug: slug }),
        )
      }
      className="flex cursor-pointer flex-col overflow-hidden rounded-4 border border-gray-200 shadow-card transition duration-300 hover:scale-105"
    >
      <div
        className={cn('relative h-60 overflow-hidden lg:h-70', {
          'lg:h-70': !smallPicture,
          'lg:h-[246px]': smallPicture,
        })}
      >
        {image && <Image className="object-cover" src={image} alt={imageAlt} fill />}
      </div>

      <div className="flex grow flex-col gap-6 p-5 pb-6 lg:p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-gray-900 lg:text-display-xs">{title}</h3>
          <p className="font-rubik text-md text-gray-600">{description}</p>
        </div>
        <div className="mt-auto">
          <ReadLink href={routes.blog.blogSlug.getRedirectPath({ blogSlug: slug })} title={linkTitle} />
        </div>
      </div>
    </div>
  );
}
